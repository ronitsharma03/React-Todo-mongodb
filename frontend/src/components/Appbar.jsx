import { Link, useNavigate } from "react-router-dom"
import { IconListTodo } from "./Icon";
import toast, { Toaster } from "react-hot-toast";
import { ThemeBtn } from "./ThemeBtn";


export const Appbar = (
    { user, themeFn }
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
        <header className="fixed top-0 max-sm:px-4 w-full flex flex-row items-center justify-between px-5 py-3 bg-blue-600 dark:bg-blue-900 bg-opacity-100 z-50">
            <div className="flex items-center gap-5">
                <Link draggable={false} to={"/dashboard"}>
                    <div className="flex items-center gap-5">
                        <IconListTodo className="" />
                        <div className="max-sm:hidden text-white text-[1.6em] font-semibold tracking-wide">
                            Planify
                        </div>
                    </div>
                </Link>

            </div>
            <div>
                <nav className="">
                    <ul className="flex items-center gap-10">
                        <ThemeBtn ThemeBtn={themeFn} />
                        <div className="max-sm:hidden text-white text-xl tracking-wide">
                            {"Welcome, " + user}
                        </div>
                        <button onClick={logout} className="max-sm:px-4 bg-white px-7 py-2 rounded-lg outline-none tracking-wide">Logout</button>
                    </ul>
                </nav>
            </div>
            <Toaster
                position="top-center"
            />
        </header>
    )
}