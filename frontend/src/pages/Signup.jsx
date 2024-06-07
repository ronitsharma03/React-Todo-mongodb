import { BottomWarning } from "../components/Bottomwarning"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { Subheading } from "../components/Subheading"
import { Button } from "../components/Button"
import { useState } from "react"
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");

    const navigate = useNavigate();


    const signupData = async () => {
        try {
            toast.loading("Signing up..", {
                id: "signup"
            });
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/v1/user/signup`,
                {
                    username,
                    password,
                    firstname,
                    lastname
                }
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", ((firstname).charAt(0).toUpperCase() + (firstname).slice(1)));
            toast.success("Signing up..", {
                id: "signup"
            });
            navigate("/signin")
        } catch (e) {
            console.log(`Error ${e}`);
            toast.error("Check Inputs!", {
                id: "signup"
            });
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-slate-800">
            <div className="w-full h-screen flex flex-col items-center justify-center bg-white rounded-lg shadow  dark:bg-slate-950 max-sm:px-5">
                <div className="bg-blue-100 dark:bg-slate-950 pt-20 max-md:pt-10 max-md:pb-10 pb-20 rounded-xl flex flex-col items-center max-sm:px-5 max-sm:min-w-[90%] sm:min-w-96 sm:px-5 lg:w-[30%] dark:border dark:border-slate-700">
                    <Heading headingText={"Welcome"} />
                    <Subheading subHeadingText={"Create an account"} />
                    <Input type={"email"} placeText={"yours@example.com"} labelText={"Email"} onchange={e => {
                        setusername(e.target.value)
                    }} />
                    <Input type={"password"} placeText={"1234565"} labelText={"Password"} onchange={e => {
                        setPassword(e.target.value)
                    }} />
                    <Input type={"text"} placeText={"firstname"} labelText={"Firstname"} onchange={e => {
                        setfirstname(e.target.value)
                    }} />
                    <Input type={"text"} placeText={"lastname"} labelText={"Lastname"} onchange={e => {
                        setlastname(e.target.value)
                    }} />
                    <Button text={"Sign up"} onclick={signupData} />
                    <BottomWarning warningText={"Already have an account ?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
            <Toaster position="top-center"
                reverseOrder={false} />
        </section>
    )
}