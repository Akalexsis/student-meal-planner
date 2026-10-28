`
    Defines logic and structure for multi-page forms. Specifically built for the User Preferences form.

    Saves user preferences, tracks currently displayed page, and handles navigation between
    pages in the form.
`
import { createContext, useContext, useState } from "react";


const FormContext = createContext({});

export function FormContextProvider({children}) {
    `
        Provider defines all variables and methods that need global access

        preferences (object) - stores all user preferences from preferences form
        currPage - stores current page index of multi-page form, initialize at 0
    `
    const [ preferences, setPreferences ] = useState({});
    const [currPage, setCurrPage] = useState(0);
    console.log(`Current page from context: ${currPage}`);

    return(
        <FormContext.Provider value={{ currPage, setCurrPage }}>
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() { 
    const ctx = useContext(FormContext); 

    if (!ctx) throw new Error("FormContext must be inside FormContextProvider");
    else {
        console.log('Context created');
        return ctx;
    };
}

