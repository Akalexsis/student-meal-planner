import { Text, View } from "react-native";
import Screen from "../../components/Screen";
import { useFormContext } from "../../utils/FormContext";

export default function Settings() {
    `
        Allow users to view and edit their selection preferences
    `
    const { preferences, handlePreferences } = useFormContext();
    // convert preferences into an array to display all elements
    const savedPreferences = Object.entries(preferences);
    console.log(`Saved preferences: ${savedPreferences}`);

    const editPreferences = () => {
        // allow user to change their set preferences
        handlePreferences();
    }

    return(
        <Screen className="flex-1 items-center bg p-6">
            <Text> Hello User </Text>
            {/* map over preferences to display them */}
            {
                savedPreferences && savedPreferences.map(([key, data]) => {
                    return(
                        <View key={key}>
                            <Text> {key} </Text>
                            <Text> {data} </Text> 
                        </View>
                    );
                })
            }
        </Screen>
    )
}