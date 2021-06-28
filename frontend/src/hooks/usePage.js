import { useState } from "react";

const usePage = () => {
    const [mode, setMode] = useState("Home");
    const changePage = (newPage) => {
        console.log("Change mode :", newPage);
        setMode(newPage);
    }

    return { mode, changePage };
};

export default usePage;