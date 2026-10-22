// Preferences UI to display preferences form to user
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput } from "react-native";
import { UseFormContext } from "../../utils/FormContext";
import { preferencesMetadata } from "../../utils/preferences_metadata";

// init object to store user preferences where key - question identifier, type - data type question can store
const initialPreferences = new Object();

preferencesMetadata.forEach((question) => { 
    let key = question["key"];
    let type = question["default_value"];

    initialPreferences[key] =  type;
}); 

// place pages dictionary here where key = index and value = component to render
    const pages = {
        0 : 'Name', // REPLACE W ACTUAL COMPONENT
        1 : 'Meal options',
        2 : 'Budget'
    }

export default function PreferencesForm(){
    `
        Render and save selected user preferences 

        userPreferences - stores user preferences, preferences based on input provided for each question
        key - unique question identifier, only stores key of currently displayed question
        index - indexes preferences metadata to control form navigation
    `
    const [userPreferences, setUserPreferences] = useState(initialPreferences);   
    const [key, setKey] = useState(""); 
    let index = useRef(0);
    
    // change which page is currently selected
    const { currPage, setCurrPage }  = UseFormContext();

    
    
    // save user preferences
    const handlePreferences = (key, value) => {
        setUserPreferences((prev) => ( { ...prev, [key]: value } ))
    }

    // handles forward and backwards navigation between questions
    const onNext = () => {
        // save data and route to home page when user finishes form
        // if (index.current === preferencesMetadata.length - 1) route to dashboard
        index.current++;
        setKey(preferencesMetadata[index.current]["key"]); // save current key value

        // trigger submit function when on final page
        if ( currPage === preferencesMetadata.length - 1 ) return; // replace w submit button
        setCurrPage(currPage + 1);
    }

    const onBack = () => {
        index.current--;
        setKey(preferencesMetadata[index.current]["key"]); // save current key value
        setCurrPage(currPage--);
    }

    return(
        <KeyboardAvoidingView key={key} behavior="padding" 
            keyboardVerticalOffset={Platform.OS ? 100 : 0 }>

                {/* navigation buttons */}
                <Pressable onPress={onNext} disabled={index.current === preferencesMetadata.length - 1 ? true : false}>
                    <Text> Next </Text>
                </Pressable>

                {/* TO-DO - USE STYLING TO HIDE BUTTON INSTEAD OF DISABLE IT */}
                <Pressable onPress={onBack} disabled={index.current === 0 ? true : false}>
                    <Text> Previous </Text>
                </Pressable>

                {/* index preferencesMetadata to display only one question (with it's related data) at a time */}
                <Text>{preferencesMetadata[index.current]["question"]}</Text>
                <Text>{preferencesMetadata[index.current]["subheading"]}</Text>

                {/* conditionally change page style based on input type */}
                    <TextInput 
                        onChangeText={(val) => handlePreferences(key, val)}
                        value={userPreferences[key]}
                        keyboardType={preferencesMetadata[index.current]["input_type"]}
                    />  
        </KeyboardAvoidingView>
                
    );
}