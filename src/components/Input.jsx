// Custom component defines UI for various types of input
import { TextInput } from "react-native-web";

export function TextInput(placeholder, value, onChange, textType) {
    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            textContentType={textType}
        />
    );
}