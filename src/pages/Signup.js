import styles from '../styles/login.module.css';

import { useState } from "react"
import { useAuth } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { toast  , ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Signup = ()=>{
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [signingUp , setSigninUp] = useState('');

    const auth = useAuth();
    const navigate = useNavigate();   // used to navigate urls

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        setSigninUp(true);

        let error = false;

        if(!name || !email || !password || ! confirmPassword){
            toast.error('Please fill all the fields');
            error = true;
        }

        if(password !== confirmPassword){
            toast.error('Make sure password and confirm password matches');
            error(true);
        }

        if(error){
            return setSigninUp(false);
        }

        const response = await auth.signup(name , email , password , confirmPassword);

        if(response.success){
            navigate('/login');
            setSigninUp(false);

            return toast.success('user regisetered syccesfull , please login');

        }else{
            toast.error(response.message);
        }

        setSigninUp(false);
    };

    if(auth.user){
        return <Navigate to="/"></Navigate>
    }

    return (
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
          <span className={styles.loginSignupHeader}> Signup</span>
          <div className={styles.field}>
            <input
              placeholder="Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.field}>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.field}>
            <input
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <input
              placeholder="Confirm Password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <button disabled={signingUp}>
              {signingUp ? 'Signing up...' : 'Signup'}
            </button>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </form>
      );

}

export default Signup;