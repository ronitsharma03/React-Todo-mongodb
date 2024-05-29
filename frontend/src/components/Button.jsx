

export const Button = ({
    text, onclick
}) => {
    return (
        <div className="bg-blue-400 w-full py-2 rounded-xl mt-10 text-xl text-white hover:bg-blue-500 cursor-pointer">
            <button className="w-full" onClick={onclick}>{text}</button>
        </div>
    )
}