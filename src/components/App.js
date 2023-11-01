import { useEffect , useState} from "react";
import {getPosts} from '../api/index'
import {Home, Signup , Settings} from '../pages'
import {Loader} from './index'
import {Navbar}  from './index';
import {Login} from '../pages';

import {BrowserRouter as Router , Route , Routes , Outlet , Navigate , useLocation} from 'react-router-dom'
import { useAuth } from "../hooks";


const About = ()=>{
  return <h1> About</h1>
}

const PrivateRoute = ({ children, redirectTo }) => {
  const auth = useAuth(),
  location = useLocation();
  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/Login" state={{ from: location }} />;
  }
  return <Outlet />;
};


const Page404 = ()=>{
  return <h1>404</h1>
}

function App() {
  // const [posts , setPosts] = useState([]);
  // const [loading , setLoading] = useState(true);
  // useEffect(()=>{
  //    const fetchPosts = async()=>{
  //     const response = await getPosts();
  //     // console.log('response' , response);
  //     if(response.success){
  //       setPosts(response.data.posts);
  //     }
  //     setLoading(false);
  //    };
  //   fetchPosts();

  // },[]);

  const auth = useAuth();


  if(auth.loading){
    return <Loader/>;
  }
  return (
    <div className="App">
       {/* <h3>Hello world</h3> */}
       
       <Router>
          <Navbar></Navbar>
          <Routes>
            <Route exact path="/" element={<Home  />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Signup />} />

            {/* Private Routes */}

            <Route element={<PrivateRoute/>}>
                <Route path="/settings" element={<Settings/>} />
            </Route>
            

            {/* Global routes */}
            <Route path="*" element={<Page404/> } />  


          </Routes>
       </Router>
    </div>
  );
}

export default App;
