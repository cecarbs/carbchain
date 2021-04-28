import React, { createContext, useState, useMemo } from 'react'

export const MyContext = createContext(null)

export const MyContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [coins, setCoins] = useState([]);

    const providerValue = useMemo(() => ({
        user, setUser,
        coins, setCoins
    }), [user, setUser, coins, setCoins])

    return (
        <MyContext.Provider value={providerValue}>
            {children}
        </MyContext.Provider>
    );
};

