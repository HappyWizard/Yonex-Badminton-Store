import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import EnterNewPasswordPage from './pages/EnterNewPasswordPage';
import Navbar from './components/Navbar';
import { Box, useColorModeValue } from '@chakra-ui/react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const tokenExpiration = window.localStorage.getItem('tokenExpiration');
  
    if (token && tokenExpiration) {
      const now = Date.now();
  
      if (now >= tokenExpiration) {
        // Token has expired, log the user out
        logoutUser();
      } else {
        // Set a timeout to log the user out when the token expires
        const timeout = tokenExpiration - now;
        setTimeout(() => {
          logoutUser();
        }, timeout);
      }
      
      setIsAuthenticated(true); // User is authenticated if token exists and not expired
    } else {
      setIsAuthenticated(false); // No valid token, not authenticated
    }
  }, []);
  
  const logoutUser = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("tokenExpiration");
    setIsAuthenticated(false);
    window.location.href = "/login"; // Redirect to login page
  };
  

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "#142233")}>
      {isAuthenticated && <Navbar />} {/* Show Navbar only when authenticated */}
      
      <Routes>
        {/* Redirect unauthenticated users to the login page */}
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        
        {/* Allow only authenticated users to access the Create page */}
        <Route path="/create" element={isAuthenticated ? <CreatePage /> : <Navigate to="/login" />} />
        
        {/* Redirect logged-in users from login/signup pages to the homepage */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUpPage />} />
        <Route path="/resetpassword" element={isAuthenticated ? <ResetPasswordPage /> : <ResetPasswordPage />} />
        <Route path="/newpassword" element={isAuthenticated ? <EnterNewPasswordPage /> : <EnterNewPasswordPage />} />

      </Routes>
    </Box>
  );
}

export default App;
















































// import { Box, useColorModeValue } from '@chakra-ui/react'  
// import HomePage from './pages/HomePage'
// import CreatePage from './pages/CreatePage'
// import LoginPage from './pages/LoginPage'
// import SignUpPage from './pages/SignUpPage'
// import Navbar from './components/Navbar'
// import { Route, Routes } from 'react-router-dom'

// function App() {

//   return (
//     <Box minH={"100vh"} bg={useColorModeValue("gray.100","#142233")}>
//       {<Navbar />}
//       <Routes>
//         <Route path="/" element={<HomePage/>}></Route>
//         <Route path="/create" element={<CreatePage/>}></Route>
//         <Route path="/login" element={<LoginPage/>}></Route>
//         <Route path="/signup" element={<SignUpPage/>}></Route>
//       </Routes>
//     </Box>
//   )
// }

// export default App
