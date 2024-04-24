// RegistrationPage.js

import React from 'react';

function RegistrationPage() {
  return (
    <div className="container">
      <h1>Create an Account</h1>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
