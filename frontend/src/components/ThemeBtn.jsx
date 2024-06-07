import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"

export const ThemeBtn = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('color-theme');
        if (savedTheme) {
            return savedTheme;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        } else {
            return 'light';
        }
    });

    // Apply the theme to the document
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    }, [theme]);

    // Toggle the theme
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
        if(theme === "dark") {
            toast('Hello Light!',
                {
                    duration: 1200,
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#fff',
                        color: '#333',
                    },
                    id: "dark"
                }
            );
        }
        else{
            toast('Hello Darkness!',
                {
                    duration: 1200,
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#020617',
                        color: '#fff',
                    },
                    id: "dark"
                }
            );
        }
    };

    return (
        <div>
            <button onClick={toggleTheme} id="theme-toggle" className="text-white bg-blue-600 dark:bg-blue-950 rounded-full p-2 flex items-center justify-center">
                {theme === "dark" ? (
                    <svg id="theme-toggle-light-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                ) : (
                    <svg id="theme-toggle-dark-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                )}
            </button>
            <Toaster position="top-center" />
        </div>
    );
};
