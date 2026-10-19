// Preferences UI to display preferences form to user
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput } from "react-native";
import { preferencesMetadata } from "../../utils/preferences_metadata";

// init object to store user preferences where key - question identifier, type - data type question can store
const initialPreferences = new Object();

preferencesMetadata.forEach((question) => { 
    let key = question["key"];
    let type = question["default_value"];

    initialPreferences[key] =  type;
}); 

// UI for multiselect option

export default function PreferencesForm(){
    // save responses to each each question and store the key (for readability)
    const [userPreferences, setUserPreferences] = useState(initialPreferences);   
    const [key, setKey] = useState(""); // stores key of current question 
    let index = useRef(0); // indexes metadata to view current question
    
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
    }

    const onBack = () => {
        index.current--;
        setKey(preferencesMetadata[index.current]["key"]); // save current key value
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

                <TextInput 
                    onChangeText={(val) => handlePreferences(key, val)}
                    value={userPreferences[key]}
                    keyboardType={preferencesMetadata[index.current]["input_type"]}
                />     
        </KeyboardAvoidingView>
                
    );
}