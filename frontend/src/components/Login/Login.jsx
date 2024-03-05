import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='login-wrapper'>
         <div className='login-cont'>
            <h3 className='login-heading'>Login</h3>
                <form class=""
                //  onSubmit={handleSubmit} 
                 >
                        <div class="mb-3">
                            <label class="form-label" for="exampleForm.ControlInput1">Email address</label>
                            <input 
                            placeholder="name@example.com" 
                            type="email" 
                            name="email"
                            // value={formData.email}
                            // onChange={handleChange}
                            id="exampleForm.ControlInput1" 
                            class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="password">Password</label>
                            <input 
                            placeholder="password" 
                            type="password" 
                            name="password" 
                            // value={formData.password}
                            // onChange={handleChange}
                            id="password" 
                            class="form-control" />
                        </div>

                        <button className='login-btn' type="submit">Login</button>
                        <br/>
                        <hr />
                        <div>
                             Not a member?
                             <br/>
                             <Link to="/register" className="sign-up-cta">Create a new account</Link>
                        </div>

                        
                    </form>
         </div>
    </div>
  )
}

export default Login