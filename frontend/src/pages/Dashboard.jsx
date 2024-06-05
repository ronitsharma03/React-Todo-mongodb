import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Todo } from "../components/Todo";
import axios from "axios";
import { Create } from "./Create";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../components/Loader";

export const Dashboard = () => {
    const [todo, setTodo] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        try {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}api/v1/user/todos/mytodos`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(response => {
                    setTodo(response.data.todos);
                    if (todo) {
                        setLoading(false);
                    }
                });
        } catch (e) {
            toast.error("Something went wrong", {
                id: "signin"
            });
        }
    }, []);


    return (
        <section className="min-h-screen dark:bg-slate-950 bg-gray-100">
            <div>
                <Appbar user={localStorage.getItem("name")} />
            </div>

            <div className="flex flex-col gap-10">
                <div className="flex items-center justify-center p-5">
                    <Create />
                </div>

                {
                    isLoading ? (
                        <Loader />
                    ) : todo.length === 0 ? (
                        // Display toast when there are no todos
                        <div className="flex items-center justify-center h-full">
                            {toast.error("No todos to display", {id: "logout"})}
                        </div>
                    ) : (
                        <div className="px-4 w-full grid gap-4 sm:grid sm:grid-cols-2 md:grid-cols-4">
                            {todo.map((item, index) => (
                                <Todo key={index} title={item.title} description={item.description} Date={item.Date} marked={item.marked} />
                            ))}
                        </div>
                    )
                }
            </div>
            <Toaster position="top-center" />
        </section>
    )
}