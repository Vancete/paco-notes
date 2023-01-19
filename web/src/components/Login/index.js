import React from 'react'
import "./styles.scss"

const Login = () => {
  return (
    <div className="login">
        <div className='image'></div>
        <div className='form-container'>
            <form className='form'>
                <div className='links'>
                    <label className='selected'>Login</label>
                    <label>Sign up</label>
                </div>
                <input type="text" id="user" placeholder='Email Adress'></input>
                <input type="password" id="password" placeholder='Password'></input>
                <button type="submit">Login</button>
        </form>
        </div>
    </div>
  )
}

export default Login