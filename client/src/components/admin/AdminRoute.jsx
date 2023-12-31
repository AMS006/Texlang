import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user, loading } = useSelector((state) => state.user);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }
    if (user.role === 'admin')
        return <Outlet />

    return <Navigate />;
}

export default AdminRoute
