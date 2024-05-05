import React, { useState } from 'react';
import "../styles/signInForm.css";
import { useStore } from "../data/store";

function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useStore();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      setErrorMessage("");
    } else {
      setErrorMessage("Fel användarnamn eller lösenord.");
    }
  };

  return (
    <div>
      <form className='form-container' onSubmit={handleSubmit}>
        <div className='input-container'>
          <label>Email</label>
          <input
            type="text"
            placeholder='email@email.com'
            value={username}
            onChange={handleUsernameChange} />
        </div>

        <div className='input-container'>
          <label>Lösenord</label>
          <input
            type="password"
            placeholder="Skriv ditt lösenord här"
            value={password}
            onChange={handlePasswordChange} />
        </div>

        {errorMessage && <p>{errorMessage}</p>}

        <button type='submit'>Logga in</button>
      </form>
    </div>
  );
}

export default SignInForm;
