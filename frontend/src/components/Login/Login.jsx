import React, { useState, useEffect } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../../slices/userAuthSlice';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ login, { isLoading } ] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/user');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await login({ email, password }).unwrap();
      console.log("res in login.jsx=> ", res);
      dispatch(setCredentials({...res}) );
      console.log("res dispatch check ");
      navigate('/user');
    }catch(err){
      toast.error(err.error);
    }

  }

  return (
    <div className='login-wrapper'>
         <div className='login-cont'>
            <h3 className='login-heading'>Login</h3>
                <form class=""
                 onSubmit={handleSubmit} 
                 >
                        <div class="mb-3">
                            <label class="form-label" for="exampleForm.ControlInput1">Email address</label>
                            <input 
                            placeholder="name@example.com" 
                            type="email" 
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="exampleForm.ControlInput1" 
                            class="form-control" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="password">Password</label>
                            <input 
                            placeholder="password" 
                            type="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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