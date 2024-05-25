import { BottomWarning } from "../components/Bottomwarning"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { Subheading } from "../components/Subheading"
import { Button } from "../components/Button"

export const Signup = () => {
    return (
        <div className="">
            <div>
                <div>
                    <Heading headingText={"Welcome"}/>
                    <Subheading subHeadingText={"Create an account"}/>
                    <Input type={"text"} />
                    <Input type={"text"} />
                    <Input type={"email"} />
                    <Input type={"password"} />
                    <Button text={"Sign up"}/>
                    <BottomWarning />
                </div>
            </div>
        </div>
    )
}