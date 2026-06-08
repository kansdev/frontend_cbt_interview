import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const pewawancara = localStorage.getItem('pewawancara');
    if (!pewawancara) {
        return <Navigate to="/" replace state={{
            error: "Silakan login terlebih dahulu sebagai pewawancara."
        }} />;
    }

    return children;
};

export default ProtectedRoute;