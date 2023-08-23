import React, { useRef ,useState } from 'react';
import Card from '../../UI/Card'
import classes from './MemberSignin.module.css'
import ForgotPassword from '../forgotPassword';
import axios from "axios";

const MemberSignIn = (props) => {
    const [forgotPass, setforgotPassword] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    // const codeInputRef = useRef();
    const message = 'member';
    const memberFormSignInHandler = async (event) => {
        event.preventDefault();
        const userDetail = ({
            userEmail: emailInputRef.current.value,
            userPassword: passwordInputRef.current.value,
            // authenticationCode: codeInputRef.current.value,
        });

        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
        // codeInputRef.current.value = ''


        const body = {
            emailid: userDetail.userEmail,
            password: userDetail.userPassword,
          };
      
          const response = await axios.post(
            "http://localhost:4000/mentor/login",
            body
          );
          console.log(response);
          if (response.data.status === "success") {
            const name = response.data.name;
            props.onLogin(name ,userDetail.userEmail, userDetail.userPassword );
            props.memberSignInFormSubmit();
          }
      




        // props.onLogin(userDetail.userEmail, userDetail.userPassword);
        // console.log(userDetail);
        //Authenticate and Then continue
        
    }

    const forgotPasswordHandler = () => {
        setforgotPassword(true);
        console.log(forgotPass)
    }

    return (
        <section className={classes.form}>
            <Card >
                {forgotPass && <ForgotPassword from={message} memsignUpHandler={props.signUpHandler}/>}
                {!forgotPass &&
                    <div>
                        <div className={classes['signin-form']}>
                            <h2>Sign In</h2>
                            <br></br>
                            <br></br>
                            <br></br>
                            <form onSubmit={memberFormSignInHandler}>
                                <input type="email" name="email" placeholder="Email" ref={emailInputRef} required></input>
                                <input type="password" name="password" placeholder="Enter-Password" ref={passwordInputRef} pattern=".{8,}"
                                    title="Password must be at least 8 characters long" required></input>
                                {/* <input type="password" name="code" placeholder="Authentic-Member-Code" ref={codeInputRef} required></input> */}
                                <button type="submit">Sign In</button>
                            </form>
                            <br />
                            <span onClick={forgotPasswordHandler}>Forgot password</span>
                        </div>
                        <div className={classes.para}>
                            <p>Don't have an account? <button className={classes.buttonSubmit} type='button' onClick={props.signUpHandler}>Sign Up</button></p>
                        </div>
                    </div>}
            </Card>
        </section>
    );
};

export default MemberSignIn;