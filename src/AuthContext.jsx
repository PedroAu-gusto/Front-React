import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch('https://node-acad.onrender.com/check-auth', {
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (error) {
                setUser(null);
            }
        }

        checkAuth();
    }, []);

    function login(userData) {
        setUser(userData);
    }

    function logout() {
        fetch('https://node-acad.onrender.com/logout', {
            method: 'POST',
            credentials: 'include',
        }).then(() => setUser(null));
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
