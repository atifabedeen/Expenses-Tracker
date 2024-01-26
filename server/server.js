import express from "express"
import bodyParser from "body-parser";
import axios from "axios"
import cors from "cors"
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";

const app = express()
const port = 5000
const saltRounds = 10;
env.config();

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
db.connect();

app.get("/all", async(req,res) => {
  let info = req.query
  if(!info.isAllowed) {
    res.json([])
  } 
  const result = await db.query("SELECT * FROM expenses WHERE user_id = $1 ORDER BY id DESC LIMIT 5", [info.userid])
  //console.log(result.rows)
  res.json(result.rows)

})

app.get("/", (req,res) =>{
  res.send("peeeeee")
})

app.post("/create", async(req, res) => {
    let expense = req.body
    await db.query("INSERT INTO expenses (user_id, amount, date, category, description) VALUES($1, $2, $3, $4, $5)", [expense.user, expense.amount, expense.date, expense.category, expense.description])
    console.log(expense)
})
app.get("/create", async(req,res) => {
    res.send("<h1>pee</h1>")
})

app.post("/signup", async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
  
      if (checkResult.rows.length > 0) {
        //req.redirect("/login");
        console.log("user already exists")
        return res.json({ success: false })
      } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
          } else {
            const result = await db.query(
              "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
              [email, hash]
            );
            const user = result.rows[0];
            req.login(user, (err) => {
              console.log("success");
              return res.status(200).json({ success: true, id: user.id });

            });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
})

app.get("/signup", async(req,res) => {
    res.send("<h1>poo</h1>")
})



app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.json({ error: "Authentication failed" });
    }
    
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      // Here, you can send additional user information if needed
      return res.status(200).json({ success: true, id: user.id });
    });
  })(req, res, next);
});

app.get("/login", async(req,res) => {
    res.send("<h1>potty</h1>")
})

passport.use(
    "local",
    new Strategy({usernameField: "email", passwordField: "password"}, async function verify(username, password, cb) {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
          username,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                return cb(null, user);
              } else {
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    })
  );

passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

app.listen(port, ()=>{
    console.log("Server started on port 5000")
})