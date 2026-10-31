// Defines UI and logic outline for all buttons that will be used in project
import { Pressable, Text } from "react-native";

export default function Button({ text, isDisabled, variant = "primary" }) {
    return(
        <Pressable 
            className="bg-primaryOrange"
            // onPress={handler}
            disabled={isDisabled}
        >
            <Text className="text"> {text} </Text>
        </Pressable>
    );
}