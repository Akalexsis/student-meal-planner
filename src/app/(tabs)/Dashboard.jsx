`
    Render each cuisine category for user
`
import { Text } from "react-native";
import Screen from "../../components/Screen";
import { useFormContext } from "../../utils/FormContext";

// TO-DO Define UI for each meal card to be displayed

export default function Dashboard() {
    // Get all of user's saved cuisine preferences
    const { preferences } = useFormContext();

    // Fetch all preferences to render to screen
    return(
        <Screen>
            <Text> 
                { preferences["name"] }'s Dashboard 
            </Text>
            {/* Display fetched cuisines by category if fetch was successful, else display error message */}
            
            <Text> We couldn't find any meals for you </Text>
        </Screen>
    );
};