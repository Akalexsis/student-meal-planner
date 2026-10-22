`
    Defines logic and structure for multi-page forms. Specifically built for the User Preferences form.

    Saves user preferences, tracks currently displayed page, and handles navigation between
    pages in the form.
`
import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormContextProvider({children}) {
    `
        Provider defines all variables and methods that need global access

        currPage - stores current page index of multi-page form, initialize at 0
    `
    const [currPage, setCurrPage] = useState(0);
    console.log(`Current page: ${currPage}`);

    return(
        <FormContext.Provider value={{
            currPage, 
            setCurrPage
        }}>
            {children}
        </FormContext.Provider>
    );
}

export function UseFormContext() { return useContext(FormContext); }

