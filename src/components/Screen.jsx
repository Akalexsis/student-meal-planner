`
    Create custom screen styling for each page
`
import { View } from "react-native";

export default function Screen({children}) {
    // define the different types of screen variants


    // set default padding and sizes for all screen types as well as different variants
    return(
        <View className="flex-1 items-center bg-primaryGreen p-6">
            {children}
        </View>
    );
}