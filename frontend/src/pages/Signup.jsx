import { BottomWarning } from "../components/Bottomwarning"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { Subheading } from "../components/Subheading"
import { Button } from "../components/Button"
import { useState } from "react"
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const Signup = () => {

    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");


    const signupData = async () => {
        try {
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
            toast.loading("Signing up..", {
                duaration: 1000
            });
        } catch (e) {
            console.log(`Error ${e}`);
            toast.error("Check Inputs!", {
                duration: 2000
            });
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="w-full h-screen flex flex-col items-center justify-center bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="bg-blue-100 px-28 pt-20 pb-20 rounded-xl flex flex-col items-center w-[35%]">
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