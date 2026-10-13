import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);

    const login = (userData) =>{
        setUser(userData);
        localStorage.setItem("UserInfo", JSON.stringify(userData))
    };

    const logout =()=>{
        setUser(null)
        localStorage.removeItem("UserInfo");
    }
    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
