import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

interface User {
    id: string;
    name: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        if (loggedUser) {
            try {
                setUser(JSON.parse(loggedUser) as User);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                setUser(null);
            }
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={ { user, login, logout } }>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
