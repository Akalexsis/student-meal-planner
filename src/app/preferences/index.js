// Preferences UI to display preferences form to user
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { preferencesMetadata } from "../../utils/preferences_metadata";

// use data in preferencesMetadata to initialize object storing user preferences
const initialPreferences = new Object();

preferencesMetadata.forEach((question) => { 
    let key = question["key"];
    let type = question["default_value"];

    initialPreferences[key] =  type;
}); 

console.log(JSON.stringify(initialPreferences));

export default function PreferencesForm(){
    // save responses to questions as user enters data
    const [userPreferences, setUserPreferences] = useState(initialPreferences);

    // save user preferences
    const handlePreferences = (key, value) => {
        setUserPreferences((prev) => ( { ...prev, [key]: value } ))
    }

    // define navigation between questions, be sure to save each response
    return(
        <View>
            {/* map each question, subheading, and corresponding input option*/}
            {preferencesMetadata.map((data, key) => {
                return (
                    <KeyboardAvoidingView key={key} behavior="padding" 
                        keyboardVerticalOffset={Platform.OS ? 100 : 0 }>
                            
                            <Text>{data["question"]}</Text>
                            <Text>{data["subheading"]}</Text>

                            <TextInput 
                                onChangeText={(val) => handlePreferences(key, val)}
                                value={userPreferences[key]}
                                keyboardType={data["input_type"]}
                            />     
                    </KeyboardAvoidingView>
                )
            })}
        </View>
    )
}