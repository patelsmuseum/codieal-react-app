import { useEffect, useState } from 'react'
import styles from '../styles/home.module.css'
import PropTypes from 'prop-types'
import { getPosts } from '../api';
import { Loader } from '../components';

const Home = () =>{

    const [posts , setPosts] = useState([]);
    const [loading , setLoading] = useState([]);

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const response = await getPosts();

            if(response.success){
                setPosts(response.data.posts);
            }

            setLoading(false);
        };

        fetchPosts();
    } , []);

    if(loading){
        return <Loader/>;
    }


    {console.log(posts)}
    return(
        <div className={styles.postWrapper}>
                <p>Helo from home </p>
                {console.log(posts[0].content)}
                <p>{posts[1].content}</p>
        </div>
    )
}

// Home.propTypes ={
//     posts : PropTypes.array.isRequired
// }

export default Home;