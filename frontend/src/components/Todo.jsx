export const Todo = ({ title, description, Date, marked }) => {

    return (
        <div className="bg-transparent w-62 h-60 rounded-md border border-slate-800 overflow-hidden">
            <div className="mt-1 ml-2">
                <input className="bg-transparent rounded-full checked" type="checkbox" />
            </div>
            <div className="flex flex-col gap-2 w-full h-auto border ">
                <div className="text-white text-xl font-medium">
                    {title}
                </div>
                <div className="text-white">
                    {}
                </div>
                <div className="text-white">
                    {description}
                </div>
            </div>
        </div>
    )
}