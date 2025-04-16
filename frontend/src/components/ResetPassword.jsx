import React, { useState } from 'react';
import styles from './ResetPassword.module.css'; // Assuming the CSS file is inside components folder
import { useToast } from '@chakra-ui/react'
import { RiLockPasswordLine } from "react-icons/ri";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const toast = useToast(); // Chakra UI's toast hook
  
    const handleSubmit = (e) => {
      e.preventDefault();

      console.log("Hey there");
      
    fetch("https://yonex-badminton-store.onrender.com/api/users/forgotPassword", {
        method: "POST",
        crossDomain: true,
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*"
        },
        body:JSON.stringify({
          email:email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userResetPassword")
          if (data.status=="ok"){

            toast({
              title: "Success",
              description: "Link Successfully Sent", 
              status: "success",
              duration: 5000,
              isClosable: true,
            })
  
            // window.location.href="./" // transfer me to the home page
  
          }else if (data.error === "User Not Found") {
            toast({
              title: "Error",
              description: "User Not Found",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
  
          } else if (data.error === "User Does not Exist") {
            toast({
              title: "Error",
              description: "User Does not Exist",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
  
          }else if (data.status === "Password Updated") {
            toast({
              title: "Success",
              description: "Password Updated",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
  
          } else if (data.error === "Password Not Updated") {
            toast({
              title: "Error",
              description: "Password Not Updated",
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
    }
    return (
        <div className={styles['outer-body']}>
            <div className={styles.wrapper}>
            <div className={`${styles['form-box']} ${styles.login}`}>
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                <div className={styles.lockIconDiv}><RiLockPasswordLine size={100} color='#20314d'/></div>
                
                <div className={styles['login-register']}>
                    <p>Enter your email and we'll send a link to reset your password</p>
                    
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
    
                <button type="submit" className={styles.btn}>Submit</button>
    
                <div className={styles['login-register']}>
                    <p>Go back to <a href="login" className={styles['register-link']}>Login</a> or <a href="signup" className={styles['register-link']}>Sign Up</a></p>
                </div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default ResetPassword


