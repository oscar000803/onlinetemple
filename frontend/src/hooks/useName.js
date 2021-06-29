import { useState } from "react";

const LOCALSTORAGE_KEY = "save-me";

const useName = () => {
    const saveMe = localStorage.getItem(LOCALSTORAGE_KEY);
    const [ name, setName ] = useState(saveMe || "匿名");
    const [ hasLight, setHasLight ] = useState(false);

    const signIn = (newName) => {
        setName(newName);
        localStorage.setItem(LOCALSTORAGE_KEY, newName);
        setHasLight(false);
    }

    const signOut = () => {
        setName("匿名");
        localStorage.setItem(LOCALSTORAGE_KEY, "匿名");
    }

    const turnLight = () => {
        setHasLight(true);
    }

    return { name, signIn, signOut, hasLight, turnLight };
};

export default useName;