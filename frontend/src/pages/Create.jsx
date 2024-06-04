import { useEffect, useRef, useState } from "react";

export const Create = ({ forTitle, forDescription, clickDone }) => {
    const [isVisible, setIsVisible] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                handleCloseClick();
            }
        }
        if (isVisible) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [isVisible]);

    const handleInputClick = () => {
        setIsVisible(true);
    };

    const handleCloseClick = () => {
        inputRef.current.value = "";
        setIsVisible(false);
    };

    return (
        <div className="flex flex-col w-[30%] bg-transparent border border-slate-600 rounded-xl transition-all duration-300">
            <input
                ref={inputRef}
                onClick={handleInputClick}
                onChange={forTitle}
                className="bg-transparent p-3 outline-none text-white"
                placeholder="Write something"
            />
            <div className={`overflow-hidden transition-all duration-300 ${isVisible ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <input
                    onChange={forDescription}
                    className="bg-transparent p-5 outline-none text-white"
                    placeholder="Description"
                />
                <div className="flex items-center justify-end gap-2 pb-2 mr-5">
                    <button
                        onClick={handleCloseClick}
                        className="bg-transparent text-white cursor-pointer px-4 py-1 hover:bg-slate-800 text-sm"
                    >
                        Close
                    </button>
                    <button onClick={clickDone} className="bg-transparent text-white cursor-pointer px-4 py-1 hover:bg-slate-800 text-sm">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
