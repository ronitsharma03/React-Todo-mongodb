import { BottomWarning } from "../components/Bottomwarning"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState } from "react"
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"

export const Signin = () => {
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signinData = async () => {
        try{
            toast.loading("Logging in..", {
                id: "signin"
            });
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/v1/user/signin`, 
                {
                    username,
                    password
                }
            )
            localStorage.setItem("token", response.data.token);
            const loggedUserName = response.data.firstname;
            localStorage.setItem("name", ((loggedUserName).charAt(0).toUpperCase() + (loggedUserName).slice(1)));
            toast.success("Logged in..", {
                id: "signin"
            });
            navigate("/dashboard");
        }catch(e){
            console.log(`Error logging in ${e}`);
            toast.error(e.response?.data?.message || "An error occurred while logging in", {
                id: "signin"
            });
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="w-full h-screen flex flex-col items-center justify-center bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="bg-blue-100 px-28 pt-20 pb-20 rounded-xl flex flex-col items-center w-[35%]">
                    <Heading headingText={"Sign in"} />
                    <Input type={"email"} placeText={"yours@example.com"} labelText={"Email"} onchange={e => {
                        setusername(e.target.value)
                    }} />
                    <Input type={"password"} placeText={"1234565"} labelText={"Password"} onchange={e => {
                        setPassword(e.target.value)
                    }} />
                    <Button text={"Sign in"} onclick={signinData} />
                    <BottomWarning warningText={"Don't have an account ?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
            <Toaster position="top-center"
                reverseOrder={false} />
        </section>
    )
}