import React from 'react';

function Header(LogoutFunction, isLoggedIn) {
	return (
		<header className="Header">
		  <nav className="Header_nav">
		    {isLoggedIn && <a href="/">Profile</a>}
		    {!isLoggedIn &&  <a href="/create-account">Create Account</a>}
		    {!isLoggedIn && <a href="/login">login</a>}
		    {isLoggedIn && <a onClick={() => LogedoutFunction()}>Log Out</a>}
		  </nav>
		</header>
	)
}
 export default Header;