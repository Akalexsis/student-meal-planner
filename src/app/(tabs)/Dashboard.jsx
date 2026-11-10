`
    Render each cuisine category for user
`
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { useFormContext } from "../../utils/FormContext";
import { response } from "../../utils/seed.js";

function MealCard({meal}) {
    ` UI container for each meal `
    // console.log(JSON.stringify(meal));
    return(
        <View className="m-8 p-6 w-120 bg">
            <Image source={{ uri: meal["thumbnail_url"] }}
                    style={{width: 400, height: 400}} />
            <Text> { meal["name"] } </Text>
            <Text> Cook time: { meal["cook_time_minutes"] }| ${ meal["price"]["total"] }</Text>
        </View>
    );
}

export default function Dashboard() {
    // Get all of user's saved cuisine preferences
    const { preferences } = useFormContext();
    const data = response["resulsts"];
    
    // Fetch all preferences to render to screen
    return(
        <ScrollView className="flex-1 p-8 bg">
            <Text> 
                Test's Dashboard 
            </Text>
            {/* Display fetched cuisines by category if fetch was successful, else display error message */}
            <Text> American </Text>
                <FlatList
                    data={data}
                    renderItem={({item}) => <MealCard meal={item} />}
                    horizontal
                />
            
        </ScrollView>
    );
};