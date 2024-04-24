import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setToken } from '../../slices/userAuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.css';
import { useRegisterMutation } from '../../slices/usersApiSlice';

import { useSendotpMutation } from '../../slices/usersApiSlice';



function Register() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [ sendotp ] = useSendotpMutation();

//   useEffect(() => {
//     if (userInfo) {
//       navigate('/');
//     }
//   }, [navigate, userInfo]);


  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log("useRegisterMutation=> ", useRegisterMutation);
    if(password !== confirmPassword)
    {
        console.log("Password not matching");
        toast.error('Passwords do not match');
    }else{
        console.log("before registration");
        const signupData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType: "Member"
        }
        try{
        // const res = await register({ firstName, lastName, email, password, confirmPassword }).unwrap();
        // console.log("response=> ", res);
        // dispatch(setCredentials({ ...res }));
        // toast.success('User registered Successfully');
        // navigate('/');

        dispatch(setCredentials(signupData));
        
        console.log("signupdata=> ", signupData.email);
        const email = signupData.email;
        // Send OTP to user for verification
        const resp = await sendotp({ email });
        console.log("res=> ", resp);
        if(resp.data.success){
            toast.success('OTP sent successfully');
            navigate('/verify-email');
            console.log("res=> ", resp.data.otp);
        }else{
            console.log("otp=> ", resp);
            toast.error('OTP failed to send');
            return
        }
        

        // dispatch(sendotp(signupData.email, navigate));

        }catch(error){
            toast.error(error);
        }
    }

  }
  return (
    <div className='register-wrapper'>
    <div className='register-cont'>
            <h3 className='register-heading'>Register</h3>
            <form
             onSubmit={handleSubmit}
              class="">
                <div class="mb-3">
                    <label class="form-label" for="firstName">First Name</label>
                    <input 
                        placeholder="example" 
                        type="text" 
                        name="firstName" 
                        id="firstName" 
                        class="form-control" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label" for="lastName">Last Name</label>
                    <input 
                        placeholder="example" 
                        type="text" 
                        name="lastName" 
                        id="lastName" 
                        class="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                     />
                </div>

                <div class="mb-3">
                    <label class="form-label" for="exampleForm.ControlInput1">Email address</label>
                    <input 
                        placeholder="name@example.com" 
                        type="email" 
                        name="email"
                        id="exampleForm.ControlInput1" 
                        class="form-control" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label" for="password">Password</label>
                    <input 
                        placeholder="password" 
                        type="password" 
                        name="password" 
                        id="password" 
                        class="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                </div>

                <div class="mb-3">
                    <label class="form-label" for="confirmpassword">Confirm Password</label>
                    <input 
                        placeholder="password" 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmpassword" 
                        class="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                </div>

                <button className='register-btn' type="submit">Register</button>
                {/* {
                    isLoading? 
                    (
                        <div className="spinner"></div>
                    ):
                    (
                        <button className='register-btn' type="submit">Register</button>
                    )
                }
                 */}
                <br/>
                <hr />
                <div>
                     Already an existing member?
                     <br/>
                     <Link to="/login" className="sign-up-cta">Login</Link>
                </div>

                {/* <div class="mb-3">
                    <label class="form-label" for="exampleForm.ControlTextarea1">Example textarea</label>
                    <textarea rows="3" id="exampleForm.ControlTextarea1" class="form-control"></textarea>
                </div> */}
            </form>
    </div>
    </div>
  )
}

export default Register