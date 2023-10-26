import styles from '../styles/login.module.css'
import {useState} from 'react'

import {ToastContainer , toast}  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import {login} from '../api/index'

import { useAuth } from '../hooks';



const Login =()=>{
   const [email , setEmail] = useState('');
   const [password , setPassword] = useState('');
   const [loggingIn , setLogginin] = useState(false);
   const auth = useAuth();
   console.log(auth);

    const handleSubmit =  async(e)=>{
        e.preventDefault();

        setLogginin(true);

        if(!email || !password){
            return toast.error('Please enter both email and password');
        }

        const response = await auth.login(email , password);

        if(response.success){
             toast.success('Successfully LOgged In')
        }else{
            toast.error('error in Logged in')
        }

        setLogginin(false);
    }

    return (
        <>

        <div className={styles.loginBox}>
            <form className={styles.loginFrom} onSubmit={handleSubmit}>
                <span className={styles.loginSignupHeader} > Log In</span>

                <div className={styles.field}>
                    <input type='email' placeholder="Email"  value={email} onChange={(e)=> setEmail(e.target.value)}  /> 
                </div>

                <div className={styles.field}>
                    <input type='password' placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}  />
                </div>

                <div className={styles.field} >
                    <button disabled={loggingIn} >
                        {loggingIn ? 'Loggin in...' : 'Log In'}
                    </button>
                </div>

            </form>
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
        
    </>
    )
}

export default Login;