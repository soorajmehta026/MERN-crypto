
import './App.css'; 
import Signup from './pages/Signup';
import Login from './pages/Login'
import { BrowserRouter, Route , Routes} from "react-router-dom";
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';
import Header from './components/Header';
import { CryptoState } from './CryptoContext';
import { useEffect } from 'react';
import Watchlist from './pages/Watchlist';

function App() {

const {setusername,setuseremail,setlogged}=CryptoState();

  useEffect(() => {
    // Check for stored login status in localStorage on component mount
    const loggedInStatus = localStorage.getItem('loggedIn');
    
    if (loggedInStatus === 'true') {
      // If the user was logged in, retrieve their name from localStorage
      const firstName = localStorage.getItem('userFirstName');
      const email=localStorage.getItem('email');
      setusername(firstName);
      setuseremail(email);
      setlogged(1);
      
    }
  }, []);

  return (
    <>
   
   
    <BrowserRouter>
    <div style={{
      position: 'fixed',
         
      width: '100%',
      zindex: 999,    }}>
    <Header />
    </div>
    <div className='main'>
     
    <Routes>
   
    <Route path="/crypto-hunter" Component={Homepage} exact/>
    <Route path="/coins/:id" Component={Coinpage} />
    <Route path="/login" Component={Login} />
    <Route path="/signup" Component={Signup} />
    <Route path="/watchlist" Component={Watchlist} />
   
 
    </Routes>
    </div>
    </BrowserRouter>
  
    </>
  );
}

export default App;
