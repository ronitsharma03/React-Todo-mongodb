import { useState } from "react";


export const Todo = ({ title, description, Date, marked }) => {
    const createdAt = Date.slice(0, 10);
    const time = Date.slice(11, 16);

    function formatDate(inputDate) {
        const parts = inputDate.split("-");
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    const formattedDate = formatDate(createdAt);

    const [isClicked, setClicked] = useState(false);
    const handleclick = () => {
        setClicked(!isClicked);
    }

    return (
        <div className={`bg-blue-100 dark:bg-transparent w-62 h-60 rounded-md border border-slate-800 overflow-hidden ${marked ? 'opacity-50' : ''} hover:cursor-pointer`} onClick={handleclick}>
            <div className="h-full grid grid-rows-8 grid-cols-4">

                <div className="flex justify-between px-2 py-2 col-span-4 row-span-1">
                    <input className="bg-transparent rounded-full" type="checkbox" />
                    <div className="text-slate-600 mr-2 flex gap-5">
                        {time} - {formattedDate}

                    </div>
                </div>
                <div className="px-2 py-3 w-full col-span-4 row-span-6 cursor-pointer">
                    <div className="dark:text-white text-xl font-medium mb-3">
                        {title}
                    </div>

                    <div className="dark:text-white">
                        {description}
                    </div>
                </div>
                <div className="text-slate-600 place-self-end col-span-4 px-3 row-span-1">
                    <div>
                        {marked ? "Completed" : "Pending"}
                    </div>
                </div>

            </div>
        </div>
    )
}