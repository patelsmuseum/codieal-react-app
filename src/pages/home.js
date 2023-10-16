import styles from '../styles/home.module.css'
import PropTypes from 'prop-types'

const Home = ({posts}) =>{
    {console.log(posts)}
    return(
        <div className={styles.postWrapper}>
                <p>Helo from home </p>
                {console.log(posts[0].content)}
                <p>{posts[1].content}</p>
        </div>
    )
}

Home.propTypes ={
    posts : PropTypes.array.isRequired
}

export default Home;