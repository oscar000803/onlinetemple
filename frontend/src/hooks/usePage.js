import { useState } from "react";

const LOCALSTORAGE_KEY = "save-page";

const usePage = () => {
    const savePage = localStorage.getItem(LOCALSTORAGE_KEY);
    const [mode, setMode] = useState(savePage || "Home");
    const changePage = (newPage) => {
        console.log("Change mode :", newPage);
        localStorage.setItem(LOCALSTORAGE_KEY, newPage);
        setMode(newPage);
    }

    return { mode, changePage };
};

export default usePage;