import Header from "./component/Home page/Header";
import Landing from "./component/Home page/Landing";
import Login from "./component/authentication/Login";
import SignUp from "./component/authentication/SignUp";
import {Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from "./component/routing/PrivateRoute";
import CreateProfile from "./component/profile inputs/CreateProfile";
import EditProfile from "./component/profile inputs/EditProfile";
import AddExpereience from "./component/profile inputs/AddExperience";

// Redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from "./reducer/authSlice";
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import Posts from "./component/posts/Posts";
import Post from "./component/posts/comment/Post";
import AddEducation from "./component/profile inputs/AddEducation";



function App() {
  // const dispatch= useDispatch();

    useEffect(()=>{
      store.dispatch(loadUser());
    },[]);
  return (
    <>
    <Provider store={store} >

    <Header />
    <div className="container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        <Route path="/dashboard/createProfile" element={<PrivateRoute component={CreateProfile} />} />
        <Route path="/dashboard/editProfile" element={<PrivateRoute component={EditProfile} />} />
        <Route path="/dashboard/experience" element={<PrivateRoute component={AddExpereience} />} />
        <Route path="/dashboard/education" element={<PrivateRoute component={AddEducation} />} />
        <Route path="/post" element={<PrivateRoute component={Posts} />} />
        <Route path="/post/:id" element={<PrivateRoute component={Post} />} />
        
      </Routes>
    </div>
    
     
    </Provider>
    {/* {(()=>{
       
      
    })()} */}
    </>
  );
}

export default App;
