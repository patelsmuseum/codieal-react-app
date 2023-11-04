import { useContext, useEffect, useState } from "react"

import {AuthContext} from '../providers/AuthProvider';
import {PostsContext } from "../providers/PostProvider";


import {LOCALSTORAGE_TOKEN_KEY} from '../utils/constant'

import {getItemInLocalStorage, removeItemLocalStorage, setItemLocalStorage} from '../utils/index'

import {register, login as userLogin , editProfile , getPosts} from '../api';

import {jwtDecode} from 'jwt-decode';

export const useAuth = ()=>{
    return useContext(AuthContext);
}

export const useProvideAuth = ()=>{
    const [user , setUser] = useState(null);
    const [loading , SetLoading] = useState(true);
    
    useEffect(()=>{
        const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);

        if(userToken){
            const user = jwtDecode(userToken);

            setUser(user);
        }

        SetLoading(false);
    } , []);

    const updateUser = async (userId, name, password, confirmPassword) => {
        const response = await editProfile(userId, name, password, confirmPassword);
        if (response.success) {
          setUser(response.data.user);
          // first delete the old token
          removeItemLocalStorage(LOCALSTORAGE_TOKEN_KEY);
          // set the updated token to update data in localStorage as well
          setItemLocalStorage(
            LOCALSTORAGE_TOKEN_KEY,
            response.data.token ? response.data.token : null
          );
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            message: response.message,
          };
        }
      };
    

    const login = async (email , password) => {
        const response = await userLogin(email , password);

        if(response.success){
            setUser(response.data.user);
            setItemLocalStorage(LOCALSTORAGE_TOKEN_KEY , response.data.token ? response.data.token : null);

            return {
                success: true,
            }
        }else{
            return {
                success: false,
                message: response.message
            }
        }
    };

    const logout = ()=>{
        setUser(null);
        removeItemLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    }

    const signup =async (name , email , password , confirmPassword)=>{
        const response = await register(name , email , password , confirmPassword);

        if(response.success){
            return{
                success : true
            };
        }else{
            return {
                success : false,
                message : response.message,
            };
        }
    }

    return {
        user,
        loading,
        logout,
        login,
        signup,
        updateUser
    }
}

export const usePosts = () => {
    return useContext(PostsContext);
};
  
export const useProvidePosts = () => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // this will fetch the data from the API call
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response' ,response);
  
      if (response.success) {
        setPosts(response.data.posts);
      }
  
      setLoading(false);
    };
    // set the data
    useEffect(() => {
      fetchPosts();
    }, []);
  
    const addPostToState = (post) => {
      const newPost = [post, ...posts];
      setPosts(newPost);
    };
  
    const addComment = (comment, postId) => {
      const newPosts = posts.map((post) => {
        if (post._id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      });
  
      setPosts(newPosts);
    };
  
    return {
      data: posts,
      loading,
      addPostToState,
      addComment,
    };
};