import React, { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';
import './VerifyEmail.css';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useRegisterMutation } from '../../slices/usersApiSlice';
import { useSendotpMutation } from '../../slices/usersApiSlice';


function VerifyEmail() {

    const [otp, setOtp] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const [ sendotp ] = useSendotpMutation();
    const [formData, setFormData] = useState();

    useEffect(() => {
        if (userInfo) {
              setFormData(userInfo);
            }
    }, []);
        

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            console.log("formData=> ",formData);
            const { firstName, lastName, email, password, confirmPassword, accountType } = formData;
            const res = await register({ firstName, lastName, email, password, confirmPassword, otp, accountType }).unwrap();
            console.log("response after register=> ", res);
            if (!res.data.success) {
                console.log("error in authapi");
                toast.error(res.data.message)
            }
            // dispatch setToken here res.user.token
            toast.success('User registered Successfully');
            navigate('/');
        }catch(error){
            toast.error(error);
        }
        
    }

  return (
    <div className='register-wrapper'>
    <div className='register-cont'>
            <h3>Verify Email</h3>
            <p>A verification code has been sent to you. Enter the code below</p>
            <br/>
            <form
             onSubmit={handleSubmit}
              class="">
                
                <OTPInput
                     value={otp}
                     onChange={setOtp}
                     numInputs={6}
                    //  renderSeparator= {<span>- </span>}
                     renderInput={(props) => <input {...props} />}
                    //  placeholder='6'
                     inputStyle={{
                        width: '3rem', // Set the width to 3rem
                        height: '3rem',
                        marginRight: '1rem',
                        fontSize: '1.5rem',
                        color: 'black'
                        }}
            
                     />

                <br/>
                <button className='register-btn' type="submit">Verify Email</button>
               
                <br/>
                <hr />
               
            </form>

            <div className='otpFooter'>
                <div>
                 <Link to="/login" className="sign-up-cta">Back to Login</Link>
                </div>

                <button className='resendButton'
                >
                    Resend it
                </button>

            </div>
    </div>

    </div>
  )
}

export default VerifyEmail