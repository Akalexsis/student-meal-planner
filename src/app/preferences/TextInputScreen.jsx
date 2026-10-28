`
    Accepts text input from users
`
import { useState } from "react";
import { TextInput } from "react-native";
import { preferencesMetadata } from "../../utils/preferences_metadata";

const initialPreferences = new Object();

preferencesMetadata.forEach((question) => { 
    let key = question["key"];
    let type = question["default_value"];

    initialPreferences[key] =  type;
}); 

export default function TextInputScreen({ id, inputType }) {
    const [userPreferences, setUserPreferences] = useState(initialPreferences); 

    // save user preferences
    const handlePreferences = (id, value) => {
        setUserPreferences((prev) => ( { ...prev, [id]: value } ))
    }

    return(
        <TextInput 
            onChangeText={(val) => handlePreferences(id, val)}
            value={userPreferences[id]}
            keyboardType={inputType}
        />  
    )
}