`
    Defines logic and structure for multi-page forms. Specifically built for the User Preferences form.

    Saves user preferences, tracks currently displayed page, and handles navigation between
    pages in the form.
`
import { createContext, useContext, useState } from "react";
import { preferencesMetadata } from "./preferences_metadata";

const FormContext = createContext({});

// initialize object to store user preferences 
// key - question identifier, type - data type question can store
const initialPreferences = new Object();

preferencesMetadata.forEach((question) => { 
    let key = question["key"];
    let type = question["default_value"];

    initialPreferences[key] =  type;
}); 

export function FormContextProvider({children}) {
    `
        Provider defines all variables and methods that need global access

        preferences (object) - stores all user preferences from preferences form
        currPage - stores current page index of multi-page form, initialize at 0
    `
    const [ preferences, setPreferences ] = useState(initialPreferences);
    const [currPage, setCurrPage] = useState(0);
    console.log(`Current page from context: ${currPage}`);

    // save user preferences based on text input of current question
    const handlePreferences = (id, value) => {
        setPreferences((prev) => ( { ...prev, [id]: value } ))
    }

    return(
        <FormContext.Provider value={{ preferences, currPage, setCurrPage, handlePreferences }}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() { 
    const ctx = useContext(FormContext); 

    if (!ctx) throw new Error("FormContext must be inside FormContextProvider");
    else return ctx;
}

