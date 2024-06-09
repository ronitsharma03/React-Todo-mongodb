import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Create = ({ fetchTodos }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const divRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                titleRef.current &&
                !titleRef.current.contains(event.target) &&
                !descRef.current.contains(event.target) &&
                !divRef.current.contains(event.target)
            ) {
                handleCloseClick();
            }
        };
        if (isVisible) {
            document.body.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [isVisible]);

    const now = new Date();
    const formattedDate = now.toString().split(' GMT')[0]; // Removes the timezone part
    // console.log(formattedDate); // e.g., "Fri Jun 07 2024 22:59:42"


    const addTodo = async () => {
        try {
            toast.loading("Adding Task...", {
                id: "adding"
            });
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/v1/user/todos/create`, {
                title: title,
                description: description,
                marked: false,
                Date: formattedDate
            },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );
            toast.success("Added Task", {
                id: "adding"
            });
            fetchTodos();
            handleCloseClick();

        } catch (error) {
            toast.error("Error adding Task!", {
                id: "adding"
            });
        }
    }

    const handleInputClick = () => {
        setIsVisible(true);
    };

    const handleCloseClick = () => {
        titleRef.current.value = "";
        descRef.current.value = "";
        setIsVisible(false);
    };

    return (
        <div ref={divRef} className="mt-20 max-sm:w-full max-md:w-[70%] flex flex-col w-[50%] bg-white dark:bg-transparent dark:border-blue-500 rounded-xl transition-all duration-300 p-4 shadow-md dark:shadow-slate-800">
            <div className="">
                <input
                    ref={titleRef}
                    onClick={handleInputClick}
                    onChange={e => {
                        setTitle(e.target.value)
                    }}
                    className="bg-transparent pb-2 px-2 outline-none dark:text-white w-full focus:border-b focus:border-blue-500 transition-colors duration-0"
                    placeholder="Write something"
                    spellCheck="false"
                />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${isVisible ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <textarea ref={descRef}
                    onChange={e => {
                        setDescription(e.target.value)
                    }}
                    className="w-full h-full bg-transparent outline-none dark:text-white resize-y rounded-lg border-blue-800"
                    placeholder="Description"
                    spellCheck="false"
                >

                </textarea>
                <div className="flex items-center justify-end gap-2 pb-2 mr-5">
                    <button
                        onClick={handleCloseClick}
                        className="dark:text-white cursor-pointer px-4 py-1 text-sm"
                    >
                        Close
                    </button>
                    <button onClick={addTodo} className="dark:text-white cursor-pointer px-4 py-1 text-sm">
                        Add
                    </button>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
};
