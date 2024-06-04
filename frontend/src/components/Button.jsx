

export const Button = ({
    text, onclick
}) => {
    return (
        <div className="bg-blue-400 w-full h-10 rounded-xl mt-10 text-xl text-white hover:bg-blue-500 cursor-pointer dark:bg-blue-800">
            <button className="w-full h-full dark:text-white" onClick={onclick}>{text}</button>
        </div>
    )
}