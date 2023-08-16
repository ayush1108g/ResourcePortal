import React, { Fragment, useState, useEffect } from 'react';
import AuthContext from '../../Store/auth-Context';
import Header from '../Layout/Header';
import Login from '../Login/Login';
import Navbar from '../Layout/Navbar';
import SecondPage from '../Layout/SecondPage';

const Main = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [memSignInstate, setMemSignInState] = useState(false);
  const [stuSignInState, setStuSignInState] = useState(false);
  const [continueState, setContinueState] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
      setStuSignInState(true);
    }
  }, []
  );

  const memberSignInFormSubmit = () => {
    setMemSignInState(true);
    setIsLoggedIn(true);
  }
  const studentSignInFormSubmit = () => {
    setStuSignInState(true);
    setIsLoggedIn(true);
  }
  const continueHandler = () => {
    setContinueState(true);
  }
  const backHandler = () => {
    setContinueState(false);
  }
  const loginHandler = (email, password) => {
    console.log(email, password);
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setStuSignInState(false);
    setMemSignInState(false);
    setContinueState(false);
    setIsLoggedIn(false);
  };




  return (
    <Fragment>
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
      }}>

        <Navbar onLogout={logoutHandler} />
        {(!stuSignInState && !memSignInstate) && <Login onLogin={loginHandler} memberSignInFormSubmit={memberSignInFormSubmit} studentSignInFormSubmit={studentSignInFormSubmit} />}
        {!continueState && (stuSignInState || memSignInstate) && <Header continueHandler={continueHandler} />}
        {continueState && <SecondPage memSignInstate={memSignInstate} backHandler={backHandler} />}
      </AuthContext.Provider>
    </Fragment>
  );
};

export default Main;