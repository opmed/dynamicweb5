import React from 'react';

function Login() {
	return (
	  <div>
		  <form className="SignupForm" onSubmit={}>
		   <label htmlFor="loginEmail">Email</label>
		    <input type="text" name="loginEmail" />
		   <label htmlFor="loginPassword">Password</label>
		    <input type="text" name="loginPassword" />
		  </form>
	  </div>
	);
}

export default Login;
