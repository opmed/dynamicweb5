import React from 'react';
import {useEffect, useState} from "react";
import {Route, BrowserRouter as Router, Redirect} from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";


//Pages
import CreateUser from "./Containers/CreateUser";
import LoginPage from "./Containers/LoginPage";
import UserProfile from "./Containers/UserProfilePage";

//Styles
import './App.css';



function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [userInformation, setUserInformation] = useState();
  
  var firebaseConfig = {
    apiKey: "AIzaSyBanzSPS12M34Oq43DAx-LZGL59cMGm2ZI",
    authDomain: "ex-5-22768.firebaseapp.com",
    databaseURL: "https://ex-5-22768.firebaseio.com",
    projectId: "ex-5-22768",
    storageBucket: "ex-5-22768.appspot.com",
    messagingSenderId: "16980013973",
    appId: "1:16980013973:web:81afb24349fcfb01f3bc9c"
  };

  //Ensure app is initialized and ready to use
  useEffect(() => {
    //Ensure app is initialized more than once
    //Is firebase ready to be initialized?
    if(!firebase.apps.length){
      //Initialize firbase
      firebase.initializeApp(firebaseConfig);
    }

    //Setting auth to be persistent in SESSION storage, not cookies
    //You can also use cookies with firebase but we're using session
    //because it's easier to work with
    firebase
       .auth()
       .setPersistence(firebase.auth.Auth.Persistence.SESSION)
       .catch(function (e) {
           console.log("AUTH ERROR", e);
       });

  }, [firebaswConfig]);


  //check to see if user is loggedin
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        setUserInformation(user);
        setLoggedIn(true);
      } else {
        setUserInformation();
        setLoggedIn(false);
      }
      setLoading(false);
    })
  }, [])


  //Login
  function LoginFunction() {
    e.preventDefault();

    //Default values for testing
    let email= e.currentTarget.loginEmail.value;
    let password= e.currentTarget.loginPassword.value;

    firebase
       .auth()
       .signInWithEmailAndPassword(email, password)
       .then(function(response) {
        console.log('LOGIN RESPONSE', response);
        serLoggedIn(true);
      });
      .catch(function (error) {
        console.log("LOGOUT ERROR", error);
      });
  }


  //Logout
  function LoginOUTFunction() {
    firebase 
      .auth()
      .signOut()
      .then(function() {
        setLoggedIn(false);
      });
      
  }


  //Create an account
  function CreateAccountFunction() {

    e.preventDefault();
    console.log("form payload", e);

    //Default values for testing
    let email= e.currentTarget.createEmail.value;
    let password= e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        console.log('VALID ACCOUNT CREATE', response);
        setLoggedIn(true);
      });
      .catch(function(e) {
        console.log("AUTH ERROR", e);
      });
  }



  return (
    <div className="App">
     <Header LogedoutFunction={LogoutFunction} isLoggedIn={loggedIn />
       <Router>
             <Route exact path="/">
               {!loading && !loggedin ? (<Redirect to="/Login" />) : <UserProfile userInformation={usrInformation} />}
             </Route>

             <Route exact path="/login">  
                 {!loading && !loggedin ? (<Login LoginFunction={LoginFunction} />) : (<Redirect tp="/" />)}    
             </Route>

             <Route exact path="/create-account">
                 {!loading && !loggedin ? (<CreateAccount CreateAccountFunction={CreateAccountFunction} /> ) : <Redirect t0="/" />)}
             </Route>
       </Router>
    </div>
  );
}

export default App;
