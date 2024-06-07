

export const Heading = ({headingText}) => {
    return (
        <div>
            <div className="text-4xl max-sm:text-2xl font-medium dark:text-white">
                {headingText}
            </div>
        </div>
    )
}