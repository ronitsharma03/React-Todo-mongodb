import { BottomWarning } from "../components/Bottomwarning"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { Subheading } from "../components/Subheading"
import { Button } from "../components/Button"

export const Signup = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="w-full h-screen flex flex-col items-center justify-center bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="bg-blue-100 px-32 pt-10 pb-20 rounded-xl flex flex-col items-center w-[35%]">
                    <Heading headingText={"Welcome"} />
                    <Subheading subHeadingText={"Create an account"} />
                    <Input type={"email"} placeText={"yours@example.com"} labelText={"Email"}/>
                    <Input type={"password"} placeText={"1234565"} labelText={"Password"}/>
                    <Input type={"text"} placeText={"firstname"} labelText={"Firstname"}/>
                    <Input type={"text"} placeText={"lastname"}  labelText={"Lastname"}/>
                    <Button text={"Sign up"} />
                    <BottomWarning warningText={"Already have an account ?"} buttonText={"Sign in"} to={"/signin"}/>
                </div>
            </div>
        </section>
    )
}