import { Link } from "react-router-dom";


export const BottomWarning = ({ warningText, buttonText, to }) => {
    return (
        <div className="mt-10">
            {warningText}
            <Link className="pointer underline pl-1 cursor-pointer" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}