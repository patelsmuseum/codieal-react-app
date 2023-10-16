import styles from '../styles/login.module.css'
const Login =()=>{
    return (
        <form className={styles.loginFrom}>
            <span className={styles.loginSignupHeader} > Log In</span>

            <div className={styles.field}>
                <input type='email' placeholder="Email" required /> 
            </div>

            <div className={styles.field}>
                <input type='password' placeholder="Password" required />
            </div>

            <div className={styles.field}>
                <button>
                    Log IN
                </button>
            </div>

        </form>

    )
}

export default Login;