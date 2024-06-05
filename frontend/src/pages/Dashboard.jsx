import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Todo } from "../components/Todo";
import axios from "axios";
import { Create } from "./Create";

export const Dashboard = () => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}api/v1/user/todos/mytodos`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            // console.log(response.data.todos[0]);
            setTodo(response.data.todos);
        });

    }, []);

    return (
        <section className="h-screen dark:bg-slate-950 overflow-hidden">
            <div>
                <Appbar user={localStorage.getItem("name")} />
            </div>

            <div className="flex flex-col gap-10">
                <div className="flex items-center justify-center p-5">
                    <Create />
                </div>
                <div className="px-5 h-screen grid sm:grid-cols-6 gap-7 grid-cols-2 grid-rows-4 max-sm:grid-rows-3">
                    {
                        todo.map((item, index) => {
                            return <Todo key={index} title={item.title} description={item.description} Date={item.Date} marked={item.marked}/>
                        })
                    }
                </div>
            </div>
        </section>
    )
}