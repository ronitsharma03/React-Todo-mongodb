

export const Input = ({
    type, placeText, labelText
}) => {
    return (
        <div className="m-2 flex flex-col w-full">
            <div className="mb-2 text-xl">
                {labelText}
            </div>
            <input className="p-2 w-full rounded-lg outline-none text-lg" type={type} placeholder={placeText} />
        </div>
    )
}