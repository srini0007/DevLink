import React from 'react'

import { useSelector } from 'react-redux';


function PrivateRoute({component:Component}) {
    const {auth} = useSelector(state=>state.auth);
    if(auth){
        return (
            <Component />
        )
    }
  
}

export default PrivateRoute;
