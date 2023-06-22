import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const checkToken = localStorage.getItem("token")
  useEffect(() => {
    if (checkToken) {
      navigate('/home', { replace: true });
    }
  }, [checkToken, navigate]);

  const handleEmailchange = (e) => {
    setEmailId(e.target.value)
  }
  const handlePasswordchange = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your API endpoint to handle login with email and password
    const data = {
      emailId,
      password
    };
    console.log(data)
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Login successful
        console.log('Login successful');
        // Reset the form
        setEmailId('');
        setPassword('');
      } else {
        // Login failed
        console.error('Login failed');
      }
      navigate('/home')
    } catch (error) {
      console.error('Error:', error);
    }
  };

 
  return (
    <div className='styleouter'>
      <div className='LoginData'>
        <h2 className='LoginText'>Login</h2>
        <form>
          <input type='EmailId' placeholder='Email' onChange={handleEmailchange} /><br />
          <input type='Password' placeholder='Password' onChange={handlePasswordchange} />
        </form>
        <button onClick={handleSubmit}>Login</button>
        <h5>New to ticket Booking application?</h5>
        <Link to = "/signup"> Create Account</Link>
      </div>
    </div>
  )
}
