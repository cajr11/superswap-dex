import React from "react"

type AuthContextProviderProps = {
    children: React.ReactNode;
}

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogIn: () => {},
    onLogOut: () => {}
})


export const AuthContextProvider = ({ children }: AuthContextProviderProps):JSX.Element => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const onLogIn = () => {
        setIsLoggedIn(true);
    }

    const onLogOut = () => {
        setIsLoggedIn(false);
    }

    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogIn: onLogIn, onLogOut: onLogOut }}>{children}</AuthContext.Provider>
}

export default AuthContext;