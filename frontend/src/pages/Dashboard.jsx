import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Todo } from "../components/Todo";
import axios from "axios";
import { Create } from "./Create";

export const Dashboard = () => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        const response = axios.get(`${import.meta.env.VITE_BACKEND_URL}api/v1/user/todos/mytodos`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });

    }, []);

    return (
        <section className="h-screen bg-slate-900 overflow-hidden">
            <div>
                <Appbar user={localStorage.getItem("name")} />
            </div>
            <div className="relative">
                <div className="absolute translate-x-[60%] translate-y-[70%]">
                    <div className="text-blue-500/5 text-[15rem] select-none">
                        FOCUS.
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex items-center justify-center p-5">
                    <Create />
                </div>
                <Todo />
            </div>
        </section>
    )
}