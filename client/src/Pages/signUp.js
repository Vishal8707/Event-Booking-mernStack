import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Signup() {

  const [title, setTitle] = useState("")
  const [userName, setUserName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const checkToken = localStorage.getItem("token")

  useEffect(() => {
    if (checkToken) {
      navigate('/home', { replace: true });
    }
  }, [checkToken, navigate]);

  const handleTitlechange = (e) => {
    setTitle(e.target.value)
  }
  const handleUsernamechange = (e) => {
    setUserName(e.target.value)
  }

  const handleEmailIdchange = (e) => {
    setEmailId(e.target.value)
  }
  const handlePasswordchange = (e) => {
    setPassword(e.target.value)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !userName || !emailId || !password) {
      setErrorMessage('Please fill out all the details.');
      return;
    }

    let userData = {
      title, userName, emailId, password
    }
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        console.log('Signup successful');
        // Reset the form
        setTitle('');
        setUserName('');
        setEmailId('');
        setPassword('');
        setErrorMessage('');
      } else {
        const errorResponse = await response.json(); // Parse the error response body as JSON
        console.error('Signup failed:', errorResponse.error);
      }
      navigate('/')

    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className='registerOuter'>
      <div className='register'>
        <h2>SignUp</h2>
        <form >
          <input type='title' placeholder='Mr, Mrs, Miss' onChange={handleTitlechange} /> <br />
          <input type='userName' placeholder='User Name' onChange={handleUsernamechange} /> <br />
          <input type='emailId' placeholder='Email Address' onChange={handleEmailIdchange} /> <br />
          <input type='password' placeholder='Password' onChange={handlePasswordchange} />
          <p>{errorMessage}</p>
        </form>
        <button onClick={handleSubmit} >SignUp</button>
      </div>
    </div>
  )
}
