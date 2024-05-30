import { Link } from "react-router-dom"
import { IconListTodo } from "./Icon";


export const Appbar = (
    { user }
) => {
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
                        <button className="bg-white px-7 py-2 rounded-lg outline-none">Logout</button>
                    </ul>
                </nav>
            </div>

        </header>
    )
}