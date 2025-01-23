import React from 'react'
import { Navigate } from 'react-router'

type ProtectedRouteProps = {
    isAuthenticated: boolean
    children: React.ReactNode
}

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return <>{children}</>
}

export default ProtectedRoute