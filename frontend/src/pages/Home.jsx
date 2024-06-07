import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


export const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchHomePage = async () => {
            // await new Promise(resolve => setTimeout(resolve, 3000));
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/signin");
            }
            else {
                axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }).then((response) => {
                    if (response.data) {
                        navigate("/dashboard")
                    }
                })
                navigate("/dashboard");
            }
        }
        fetchHomePage();
    }, []);
}