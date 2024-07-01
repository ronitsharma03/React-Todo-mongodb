import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "./Input";

export const Todo = ({ id, title, description, Date, marked, onDelete, fetchTodos }) => {
    const [isClicked, setClicked] = useState(false);
    const [ismarked, setmarked] = useState(marked);
    const [edit, setEdit] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newDesc, setNewDesc] = useState(description);

    useEffect(() => {
        setmarked(marked);
    }, [marked]);

    const handleEditClick = () => {
        setEdit(!edit);
    };

    const handleDeleteClick = async () => {
        await onDelete(id);
        setClicked(false);
    };

    const handleEditTodo = async () => {
        try {
            toast.loading("Saving...", { id: "edit" });

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}api/v1/user/todos/${id}/update`,
                {
                    title: newTitle,
                    description: newDesc,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (!response) {
                toast.error("Error updating the todo!", { id: "edit" });
            }

            fetchTodos();
            toast.success(response.data.message, { id: "edit" });
        } catch (e) {
            console.log(`Error updating the todo ${e}`);
            toast.error(e.response?.data?.message || "Error updating the todo", {
                id: "edit",
            });
        } finally {
            setClicked(false);
        }
    };

    const handleMarkTodo = async () => {
        try {
            toast.loading("Marking...", { id: "marked" });

            await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}api/v1/user/todos/${id}/toggle`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            setmarked(!ismarked);
            fetchTodos();
            toast.success(`Marked as ${!ismarked ? "Completed" : "Pending"}!`, {
                id: "marked",
            });
        } catch (e) {
            toast.error("Failed to mark Todo", { id: "marked" });
        }
    };

    return (
        <div className={`rounded-lg relative ${isClicked ? "z-10" : ""}`}>
            <div
                className={`bg-white dark:bg-transparent w-62 h-56 min-h-20 max-h-32 rounded-md shadow-md dark:shadow-slate-700 dark:border dark:border-slate-800 overflow-hidden ${
                    ismarked ? "opacity-50" : ""
                }`}
            >
                <div className="h-full grid grid-rows-8 grid-cols-4 tracking-wider">
                    <div className="flex justify-between px-2 py-2 col-span-4 row-span-1">
                        <input
                            className="bg-transparent rounded-full"
                            type="checkbox"
                            onChange={handleMarkTodo}
                            checked={ismarked}
                        />
                        <div className="text-slate-600 mr-2 flex gap-5">{Date}</div>
                    </div>
                    <div
                        className="px-10 py-6 w-full col-span-4 row-span-6 cursor-pointer"
                        onClick={() => setClicked(!isClicked)}
                    >
                        <div className="dark:text-white text-xl font-medium mb-3">{title}</div>
                    </div>
                    <div className="text-slate-600 place-self-end col-span-4 px-3 row-span-1">
                        <div className="mb-1">{ismarked ? "Completed" : "Pending"}</div>
                    </div>
                </div>
            </div>

            {isClicked && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70 cursor-default">
                    <div className="bg-blue-100 dark:bg-slate-800 w-full max-w-xl lg:max-w-3xl md:p-2 rounded-md border border-slate-800 overflow-hidden">
                        <div className="grid grid-rows-8 grid-cols-4 h-full">
                            <div className="flex justify-between px-2 col-span-4 row-span-1">
                                <div className="dark:text-white cursor-pointer" onClick={() => setClicked(false)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                </div>
                                <div className="text-slate-600 mr-2 flex gap-5 dark:text-white">{Date}</div>
                            </div>
                            <div className="px-2 w-full col-span-4 row-span-6">
                                {!edit ? (
                                    <>
                                        <div className="text-xl font-medium mb-3 dark:text-white">{title}</div>
                                        <div className="dark:text-white tracking-wider">{description}</div>
                                    </>
                                ) : (
                                    <div className="flex flex-col w-[90%] gap-5 ml-5 mt-5">
                                        <input
                                            type="text"
                                            className="rounded-md dark:bg-transparent dark:text-white"
                                            value={newTitle}
                                            placeholder="New Title"
                                            onChange={(e) => setNewTitle(e.target.value)}
                                        />
                                        <textarea
                                            value={newDesc}
                                            className="rounded-md mb-5 dark:bg-transparent dark:text-white"
                                            placeholder="New Description"
                                            onChange={(e) => setNewDesc(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="text-slate-600 col-span-4 px-3 row-span-1">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-6">
                                        <div className="mb-1 cursor-pointer" onClick={handleEditClick}>
                                            {!edit ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                    />
                                                </svg>
                                            ) : (
                                                <button
                                                    className="bg-blue-500 text-white text-md px-2 py-1 rounded-sm"
                                                    onClick={handleEditTodo}
                                                >
                                                    Save
                                                </button>
                                            )}
                                        </div>
                                        <div className="mb-1 cursor-pointer" onClick={handleDeleteClick}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="dark:text-white opacity-70">
                                        {ismarked ? "Completed" : "Pending"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
