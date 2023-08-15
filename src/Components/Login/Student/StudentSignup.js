import React , {useRef} from 'react';
import Card from '../../UI/Card';
import classes from './StudentSignup.module.css'

const StudentSignUp = (props) => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const studentFormSignUpHandler =(event) => {
        event.preventDefault();
        const userDetail =({
            userName : nameInputRef.current.value,
            userEmail : emailInputRef.current.value,
            userPassword : passwordInputRef.current.value,
            
        });
        nameInputRef.current.value=''
        emailInputRef.current.value=''
        passwordInputRef.current.value=''

        // console.log(userDetail);

        /// Store the user Detail 
        props.signInHandler();
    }
    return (
        <section className={classes.form}>
            <Card >
                <div className={classes['signup-form']}>
                    <h2>Sign Up</h2>
                    <form onSubmit={studentFormSignUpHandler}>
                        <input type="text" name="fullname" placeholder="Full Name" ref={nameInputRef} required></input>
                        <input type="email" name="email" placeholder="Email" ref={emailInputRef} required></input>
                        <input type="password" name="password" placeholder="Create-Password" ref={passwordInputRef} required></input>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className={classes.para}>
                    <p>Already have an account? <button className={classes.buttonSubmit} type='button' onClick={props.signInHandler}>Sign In</button></p>
                </div>
            </Card>
        </section>
    );
};

export default StudentSignUp;