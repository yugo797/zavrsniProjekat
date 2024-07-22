import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();
 
const UserProvider = (props) => {
    //const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('accesstoken'));

    useEffect(() => {
        const fetchUser = async (id) => {
            const url = `/users/${id}`;
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }   
            try{
                const response = await fetch(url, requestOptions);
                if (response.ok) {
                    localStorage.setItem('accesstoken', token);
                    console.log('User fetched');
                }
                else {
                    console.log('User not fetched');
                    setToken(null);
                }
            } catch (error) {
                console.log('Error fetching user', error);
                setToken(null);
            }
        };

    fetchUser();

    }, [token]);
    
    return (
        <UserContext.Provider value={{token, setToken }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;