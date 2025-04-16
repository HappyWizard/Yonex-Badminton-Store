import React, { useState } from 'react';
import styles from './SignUp.module.css'; // You can use the same or a similar CSS as Login.css
import { useToast } from '@chakra-ui/react'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast(); // Chakra UI's toast hook

  const handleSignUp = (e) => {
    e.preventDefault();
    // Logic for sign-up (API call)
    console.log({ username, email, password });

    fetch("https://yonex-badminton-store.onrender.com/api/users/signup", {
      method: "POST",
      crossDomain: true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body:JSON.stringify({
        userName:username,
        email:email,
        password:password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userSignUp")
        if (data.status=="ok"){
          // alert("signup successful")
          toast({
            title: "Success",
            description: "Sign Up Successful", 
            status: "success",
            duration: 5000,
            isClosable: true,
          })

        }else if (data.error === "User Already Exists") {
          toast({
            title: "Error",
            description: "User Already Exists",
            status: "error",
            duration: 5000,
            isClosable: true,
          });

        }else {
          toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
  };

  return (
    <div className={styles['outer-body']}>
      <div className={styles.wrapper}>
        <div className={`${styles['form-box']} ${styles.register}`}>
          <h2>Registration</h2>
          <form onSubmit={handleSignUp}>

            <div className={styles['input-box']}>
              <span className={styles.icon}>
                <ion-icon name="person"></ion-icon>
              </span>
              <input 
                type="text" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <label>Username</label>
            </div>

            <div className={styles['input-box']}>
              <span className={styles.icon}>
                <ion-icon name="mail"></ion-icon>
              </span>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={`${styles[email.length > 0 ? 'hasValue' : '']} `}
              />
              <label>Email</label>
            </div>

            <div className={styles['input-box']}>
              <span className={styles.icon}>
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <label>Password</label>
            </div>

            <div className={styles['remember-forgot']}>
              <label>
                <input type="checkbox" />&nbsp; Remember me
              </label>
              <a href="resetpassword">Forgot Password?</a>
            </div>

            <button type="submit" className={styles.btn}>Sign Up</button>

            <div className={styles['login-register']}>
              <p>Already have an account? <a href="login" className={styles['register-link']}>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
