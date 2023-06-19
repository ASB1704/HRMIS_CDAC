// import React from 'react';

// const StateContext = React.createContext();

// export default StateContext;

import axios from "axios";
// import WebSocket from "websocket";
import { useContext, useEffect } from "react";
import React, { useState } from 'react'

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [curUser, setCurUser] = useState({})
    const [user, setuser] = useState({})
    const getusers = async () => {
        const { data } = await axios.get("http://localhost:5000/getUsers")
        setuser(data);
        console.log(data);

    }
    const [isSubmitted, setisSubmitted] = useState(false);
    const contextValue = {
        isSubmitted,
        setisSubmitted,
    };
    const [alluser, setalluser] = useState([]);
    const [requserId, setReqUserId] = useState();
    useEffect(() => {
        getusers();
    }, [])
    return <AppContext.Provider value={{

        user, setuser, requserId, setReqUserId, alluser, setalluser, isSubmitted, setisSubmitted, curUser, setCurUser, contextValue
    }}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }





