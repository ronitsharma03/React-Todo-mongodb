import { Link } from "react-router-dom";


export const BottomWarning = ({ warningText, buttonText, to }) => {
    return (
        <div className="mt-10 dark:text-white max-sm:text-sm">
            {warningText}
            <Link className="pointer underline pl-1 cursor-pointer dark:text-white" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}