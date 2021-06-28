import { useState } from "react";

const useName = () => {
    const [ name, setName ] = useState("匿名");
    const [ hasLight, setHasLight ] = useState(false);

    const signIn = (newName) => {
        setName(newName);
        setHasLight(false);
    }

    const signOut = () => {
        setName("匿名");
    }

    const turnLight = () => {
        setHasLight(true);
    }

    return { name, signIn, signOut, hasLight, turnLight };
};

export default useName;