import { useEffect , useState} from "react";
import {getPosts} from '../api/index'
import {Home} from '../pages'
import {Loader} from './index'
import {Navbar}  from './index';
import {Login} from '../pages';

import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'

const About = ()=>{
  return <h1> About</h1>
}

const Page404 = ()=>{
  return <h1>404</h1>
}

function App() {
  const [posts , setPosts] = useState([]);
  const [loading , setLoading] = useState(true);
  useEffect(()=>{
     const fetchPosts = async()=>{
      const response = await getPosts();
      // console.log('response' , response);
      if(response.success){
        setPosts(response.data.posts);
      }
      setLoading(false);
     };
    fetchPosts();

  },[]);

  if(loading){
    return <Loader/>;
  }
  return (
    <div className="App">
       {/* <h3>Hello world</h3> */}
       <Navbar></Navbar>
       <Router>
          <Routes>
            <Route exact path="/" element={<Home posts={posts} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login/>} />
            <Route element={<Page404/> } />  
          </Routes>
       </Router>
    </div>
  );
}

export default App;
