import React from 'react'
import { useAuthentication } from '../components/AuthenticationContext';

const Secret = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthentication();

  return (
    <div>Secret</div>
  )
}

export default Secret