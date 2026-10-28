// Preferences UI to display preferences form to user
import { KeyboardAvoidingView, Platform, Pressable, Text } from "react-native";
import { useFormContext } from "../../utils/FormContext";
import { preferencesMetadata } from "../../utils/preferences_metadata";
import MultiselectScreen from "./MultiSelectScreen";
import TextInputScreen from "./TextInputScreen";

// init object to store user preferences where key - question identifier, type - data type question can store
const initialPreferences = new Object();

preferencesMetadata.forEach((question) => { 
    let key = question["key"];
    let type = question["default_value"];

    initialPreferences[key] =  type;
}); 


export default function PreferencesForm(){
    `
        Render and save selected user preferences 

        currPage - Context variable that stores index for currently displayed page
        pages - Object that stores which input type to render along with its associated page (key)
    `
    // stores currently displayed page and implements form navigation
    const { currPage, setCurrPage }  = useFormContext();

    
    // Render appropriate form input based on selected question. key - form index, value - component to return
    const pages = {
        0 : <TextInputScreen id={preferencesMetadata[0]["key"]} inputType={preferencesMetadata[0]["input_type"]}/>, 
        1 : <MultiselectScreen id={preferencesMetadata[1]["key"]} options={preferencesMetadata[1]["input_type"]}/>,
        2 : <TextInputScreen id={preferencesMetadata[2]["key"]} inputType={preferencesMetadata[2]["input_type"]}/>,
    }


    // handles forward and backwards navigation between questions
    const onNext = () => {
        // save data and route to home page when user finishes form

        // trigger submit function when on final page
        if ( currPage.current === preferencesMetadata.length - 1 ) return; // replace w submit button
        setCurrPage( prev => prev + 1 );
    }

    return(
        <KeyboardAvoidingView behavior="padding" 
            keyboardVerticalOffset={Platform.OS ? 100 : 0 }>

                {/* Next and Previous buttons handle forward and backward form navigation */}
                <Pressable onPress={onNext} disabled={currPage === preferencesMetadata.length - 1 ? true : false}>
                    <Text> Next </Text>
                </Pressable>

                {/* TO-DO - USE STYLING TO HIDE BUTTON INSTEAD OF DISABLE IT */}
                <Pressable disabled={currPage === 0 ? true : false} onPress={ (prev) => setCurrPage( prev => prev - 1 )}>
                    <Text> Previous </Text>
                </Pressable>

                {/* Index preferencesMetadata to display that page's question and subheading */}
                <Text>{preferencesMetadata[currPage]["question"]}</Text>
                <Text>{preferencesMetadata[currPage]["subheading"]}</Text>

                {/* Index pages object to render input type for currently selected page */}
                { pages[currPage] } 
        </KeyboardAvoidingView>
                
    );
}