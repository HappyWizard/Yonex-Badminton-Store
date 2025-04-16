import React from 'react'

const EnterNewPassword = () => {


    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for login (could add API calls here)
        console.log({ email, password });
    
        fetch("https://yonex-badminton-store.onrender.com/api/users/login", {
          method: "POST",
          crossDomain: true,
          headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*"
          },
          body:JSON.stringify({
            email:email,
            password:password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userLogin")
            if (data.status=="ok"){
              // alert("login successful")
    
              const token = data.data;
              const decodedToken = jwtDecode(token); // Decode the token to get expiration time
              const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
      
              // Store the token and expiration time in localStorage
              window.localStorage.setItem("token", token);
              window.localStorage.setItem("tokenExpiration", expirationTime);
    
              toast({
                title: "Success",
                description: "Login Successful", 
                status: "success",
                duration: 5000,
                isClosable: true,
              })
    
              window.location.href="./" // transfer me to the home page
    
            }else if (data.error === "User Not Found") {
              toast({
                title: "Error",
                description: "User Not Found",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
    
            } else if (data.error === "Password Incorrect") {
              toast({
                title: "Error",
                description: "Password Incorrect",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
    
            } else {
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
            <h2>Enter New Password</h2>
            <form onSubmit={handleSubmit}>

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

            <button type="submit" className={styles.btn}>Login</button>

            <div className={styles['login-register']}>
                <p>Don't have an account? <a href="signup" className={styles['register-link']}>Sign Up</a></p>
            </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default EnterNewPassword