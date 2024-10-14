import { createContext, FC, SetStateAction, Dispatch, PropsWithChildren, useState, useEffect, useContext } from 'react';
import { IUser } from "@/types/user.interface";
import * as Splash from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { TokenClass } from 'typescript';

export type TypeUserState = IUser | null;

interface IContext {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (user: TypeUserState) => Promise<any>;
    onLogin?: (login: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

export const API_URL = 'http://localhost:5173';
export const AuthContext = createContext<IContext>({} as IContext);
const TOKEN_KEY = 'my-jwt';

const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: false,
    });

  

    console.log(authState.authenticated);

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `${token}`;

                setAuthState({
                    token: token,
                    authenticated: true
                });
            }
        };
        loadToken();
    }, []);

    const register = async (user : TypeUserState) => {
        try {
            const result =  await axios.post(`http://10.0.2.2:8080/user/signup`, { ...user });
            const token = result.headers.authorization;
            console.log("Result:", result.headers.authorization);

                setAuthState({
                    token: token,
                    authenticated: true
                });

                axios.defaults.headers.common['Authorization'] = `${token}`;

                await SecureStore.setItemAsync(TOKEN_KEY, token);
        } catch (e) {
            console.error("Login error:", e);
            return { error: true, msg: (e as any).response?.data?.msg || "An error occurred" };
        }
    };

    const login = async (login: string, password: string) => {
        try {
            const result = await axios.post(`http://10.0.2.2:8080/auth/authorize`, { login, password });
            const token = result.headers.authorization;
            console.log("Result:", result.headers);

                setAuthState({
                    token: token,
                    authenticated: true
                });

                axios.defaults.headers.common['Authorization'] = `${token}`;

                await SecureStore.setItemAsync(TOKEN_KEY, token);
            
        } catch (e) {
            console.error("Login error:", e);
            return { error: true, msg: (e as any).response?.data?.msg || "An error occurred" };
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: '',
            authenticated: false
        });

        
    };
    console.log(authState)

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
