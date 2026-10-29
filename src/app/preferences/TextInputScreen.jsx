`
    Accept and store text input from users to store in user preferences
`
import { TextInput } from "react-native";
import { useFormContext } from "../../utils/FormContext";

export default function TextInputScreen({ id, inputType }) {
    const { preferences, handlePreferences } = useFormContext();

    return(
        <TextInput 
            onChangeText={(val) => handlePreferences(id, val)}
            value={preferences[id]}
            keyboardType={inputType}
            autoFocus={true}
        />  
    )
}