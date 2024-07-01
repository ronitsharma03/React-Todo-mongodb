import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Todo } from "../components/Todo";
import axios from "axios";
import { Create } from "./Create";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../components/Loader";
import { Footer } from "../components/Footer";

export const Dashboard = () => {
    const [todo, setTodo] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [user, setuser] = useState("");
    

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/v1/user/todos/mytodos`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setTodo(response.data.todos);
            setLoading(false)
            
            setuser(response.data.firstName);
            // console.log(response.data.todos[0].Date)

                // .then(response => {
                //     setTodo(response.data.todos);
                //     if (todo) {
                //         setLoading(false);
                //     }
                // });
        } catch (e) {
            toast.error("Something went wrong", {
                id: "signin"
            });
        }
    }
    useEffect(() => {
        fetchTodos();
    }, []);

    const handleDeleteTodo = async (id) => {
        try {
            toast.loading("Deleting...", {
                id: "delete"
            });

            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/v1/user/todos/${id}/delete`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setTodo(prevTodo => prevTodo.filter(todo => todo._id !== id));
            fetchTodos();
            toast.success("Todo deleted", {
                id: "delete"
            })
        } catch (e) {

            toast.error("Failed to delete Todo", {
                id: "delete"
            })
        }
    }

    


    return (
        <>
            <section className="min-h-screen dark:bg-slate-950 bg-gray-100">
                <div>
                    <Appbar user={user} />
                </div>
                <div className="flex flex-col gap-10">
                    <div className="flex items-center justify-center p-5">
                        <Create fetchTodos={fetchTodos} />
                    </div>

                    {
                        isLoading ? (
                            <Loader />
                        ) : (todo.length === 0) ? (
                            // Display toast when there are no todos
                            <div className="flex items-center justify-center h-full">
                                {toast("Hurray! No pending task", {
                                    id: " ",
                                    duration: 1000,
                                    icon: "😎"
                                })}
                            </div>
                        ) : (
                            <div className="px-4 w-full grid gap-4 sm:grid sm:grid-cols-2 md:grid-cols-4">
                                {todo.map((item, index) => {
                                    return <Todo key={index} id={item._id} title={item.title} description={item.description} Date={item.Date} marked={item.marked} onDelete={handleDeleteTodo} fetchTodos={fetchTodos} />

                                })}
                            </div>
                        )
                    }
                </div>
                <Toaster className="bg-slate-700" position="top-center" />
            </section>
            <section className="pt-40 dark:bg-slate-950 bg-gray-100">
                <Footer />
            </section>
        </>
    )
}