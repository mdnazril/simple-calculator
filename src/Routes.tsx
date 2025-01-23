import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthContext } from './context/AuthProvider'

type Props = {}

const AppRoutes = (props: Props) => {

    const authContext = useContext(AuthContext);

    const isAuthenticated = authContext?.user ? true : false;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/protected"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            Protected Route
                        </ProtectedRoute>
                    }
                />

                <Route element="404" path="*" />

            </Routes>
        </Router>
    )
}

export default AppRoutes