import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Customers from './pages/Customers';

const Routes: React.FC = () => {
    return (
        <RouterRoutes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Customers" element={<Customers />} />
        </RouterRoutes>
    );
}

export default Routes;
