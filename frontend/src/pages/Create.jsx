import { useEffect, useRef, useState } from "react";

export const Create = ({ forTitle, forDescription, clickDone }) => {
    const [isVisible, setIsVisible] = useState(false);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const divRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                titleRef.current && 
                !titleRef.current.contains(event.target) && 
                !descRef.current.contains(event.target) &&
                !divRef.current.contains(event.target)
            ) {
                handleCloseClick();
            }
        };
        if (isVisible) {
            document.body.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [isVisible]);

    const handleInputClick = () => {
        setIsVisible(true);
    };

    const handleCloseClick = () => {
        titleRef.current.value = "";
        setIsVisible(false);
    };

    return (
        <div ref={divRef} className="flex flex-col w-[30%] bg-transparent border border-slate-600 rounded-xl transition-all duration-300">
            <input
                ref={titleRef}
                onClick={handleInputClick}
                onChange={forTitle}
                className="bg-transparent p-3 outline-none text-white"
                placeholder="Write something"
            />
            <div className={`overflow-hidden transition-all duration-300 ${isVisible ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <input
                ref={descRef}
                    onChange={forDescription}
                    className="bg-transparent p-5 outline-none text-white"
                    placeholder="Description"
                />
                <div className="flex items-center justify-end gap-2 pb-2 mr-5">
                    <button
                        onClick={handleCloseClick}
                        className="text-white cursor-pointer px-4 py-1 hover:bg-slate-800 text-sm"
                    >
                        Close
                    </button>
                    <button onClick={clickDone} className="text-white cursor-pointer px-4 py-1 hover:bg-slate-800 text-sm">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
