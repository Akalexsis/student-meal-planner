`
    Render each cuisine category for user
`
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { useFormContext } from "../../utils/FormContext";
import { response } from "../../utils/seed.js";

function MealCard({meal}) {
    ` UI container for each meal `
    
    return(
        <View className="m-8 w-120 h-200 bg shadow-md rounded-xl">
            <Image source={{ uri: meal["thumbnail_url"] }}
                    style={{height: 100}} 
                    className="rounded-xl"/>
            <Text className="p-3"> { meal["name"] } </Text>
            <Text className="p-3"> Cook time: { meal["cook_time_minutes"] } minutes | ${ meal["price"]["total"] }</Text>
        </View>
    );
}

export default function Dashboard() {
    // Get all of user's saved cuisine preferences
    const { preferences } = useFormContext();
    const preferredCuisine = preferences["cuisine"];

    // cuisine - the type of cuisine the user prefers to see
    const tempPreferences = ["american", "italian", "desserts"];
    const data = response["resulsts"]; // data - the data to render over
    
    // Fetch all preferences to render to screen
    return(
        <ScrollView className="flex-1 p-8">
            <Text> 
                Test's Dashboard 
            </Text>
            {/* Display fetched cuisines by category if fetch was successful, else display error message */}
            {
                tempPreferences && tempPreferences.map((cuisine, key) =>
                    {
                        return(
                            <View key={key}>
                                <Text> {cuisine} </Text>
                                <FlatList
                                    data={data}
                                    renderItem={({item}) => <MealCard meal={item} />}
                                    horizontal
                                />
                            </View>
                        )
                    }
                )
                
            }
        </ScrollView>
    );
};