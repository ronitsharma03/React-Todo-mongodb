import { Link, useNavigate } from "react-router-dom"
import { IconListTodo } from "./Icon";
import toast, { Toaster } from "react-hot-toast";


export const Appbar = (
    { user }
) => {
    const navigate = useNavigate();
    const logout = async () => {
        toast.loading("Logging out...", {
            id: "logout"
        });
        localStorage.clear();
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Logged out", {
            id: "logout"
        });
        navigate("/signin");
    }

    return (
        <header className="w-full flex flex-row items-center justify-between px-10 py-3 bg-blue-600">
            <div className="flex items-center gap-5">
                <Link draggable={false} to={"/dashboard"}><IconListTodo /></Link>
                <div className="text-white text-2xl font-semibold">
                    Planify
                </div>
            </div>
            <div>
                <nav className="">
                    <ul className="flex items-center gap-10">
                        <div className="text-white text-xl">
                            {"Welcome, " + user}
                        </div>
                        <button onClick={logout} className="bg-white px-7 py-2 rounded-lg outline-none">Logout</button>
                    </ul>
                </nav>
            </div>
        <Toaster 
            position="top-center"
        />
        </header>
    )
}