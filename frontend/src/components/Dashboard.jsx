import { Appbar } from "./Appbar"

export const Dashboard = () => {
    return (
        <main>
            <Appbar user={localStorage.getItem("name")}/>
        </main>
    )
}