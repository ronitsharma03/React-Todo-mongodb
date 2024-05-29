

export const Button = ({
    text
}) => {
    return (
        <div className="bg-blue-400 px-14 py-2 rounded-xl mt-10 text-xl text-white hover:bg-blue-500">
            <button>{text}</button>
        </div>
    )
}