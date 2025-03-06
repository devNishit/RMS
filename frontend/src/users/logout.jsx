import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("Authorization");
        navigate("/login"); // Redirect after logout
    }, [navigate]);

    return null; // No need to render anything
};

export default LogoutButton;
