import './App.css';
import Form from './components/common/Form'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { useState } from 'react';
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import Home from './components/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

let navigate = useNavigate();

const handleAction = (id) => {
    const authentication = getAuth();
    //login functionality based on id of 1. After login, user is routed to home page.
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          console.log(error.code)
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
        })
    }
    //register functionality based on id of 2. After registration, user is routed to home page. 
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        })
    }
  }


  return (
      <div className="App">
        <>
        <ToastContainer />
          <Routes>
            <Route 
            path='/login' 
            element={
              <Form 
              title="Login"
              setEmail={setEmail}
              setPassword={setPassword} 
              handleAction= {() => handleAction(1)}
              />}
            />
            <Route 
            path='/register' 
            element={
              <Form 
              title="Register"
              setEmail={setEmail}
              setPassword={setPassword} 
              handleAction= {() => handleAction(2)}
              />}
            />
            <Route
            path='/home'
            element={
              <Home />}
          />
          </Routes>
        </>
      </div>
 
  );
}

export default App;