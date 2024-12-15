import {createContext, useContext, useEffect, useState, ReactNode} from "react";
import {deleteFromSecureStore, getFromSecureStore, saveToSecureStore} from "@/components/authentication/secureStore";

type AuthContextProps = {
    userToken: string | null;
    login: (token : string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

type Props = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
    userToken: null,
    login: async () => {
        console.warn('Login called outside of AuthProvider');
    },
    logout: async () => {
        console.warn('Logout called outside of AuthProvider');
    },
    loading: false,
});

export const AuthProvider = ({ children } : Props) => {
    const [userToken, setUserToken] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            const token = await getFromSecureStore('userToken');
            if (token) {
                setUserToken(token);
            }
            setLoading(false);
        };

        loadToken();
    }, [])

    const login = async (token : string) => {
        setUserToken(token);
        await saveToSecureStore('userToken', token);
    }

    const logout = async () => {
        setUserToken("");
        await deleteFromSecureStore('userToken');
    }

    return (
        <AuthContext.Provider value={{ userToken, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

