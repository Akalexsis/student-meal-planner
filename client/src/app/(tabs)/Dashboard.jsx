`
    Render each cuisine category for user
`
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useFormContext } from "../../utils/FormContext";

function MealCard({meal}) {
    ` UI container for each meal `
    
    return(
        <View className="m-8 w-120 h-200 bg shadow-md rounded-xl">
            <Image source={{ uri: meal["image"] }}
                    style={{height: 100}} 
                    className="rounded-xl"/>
            <Text className="p-3"> { meal["name"] } </Text>
            <Text className="p-3"> Cook time: { meal["cook_time"] } minutes | ${ meal["price"] }</Text>
        </View>
    );
}

export default function Dashboard() {
    `
        Fetch all user's preferred cuisine and display it to them.
        
        preferences - list of cuisines(string) user prefers to see. min - 3, max - 5
        fetchedCuisines - the results of fetching cuisine from the user
    `
    // Get all of user's saved cuisine preferences
    const { preferences } = useFormContext();
    // const preferredCuisine = preferences["cuisine"];
    const [ isLoading, setIsLoading ] = useState(true);
    const [ fetchedCuisines, setFetchedCuisined ] = useState([]);

    // cuisine - the type of cuisine the user prefers to see
    const tempPreferences = ["american", "italian", "desserts"];

    const fetchMeals = async() => {
        try {
            const response = await fetch(`http://localhost:3306/get-cuisines`);
            const data = await response.json();

            console.log(`Fetch results: ${data}`);

            setFetchedCuisined(data);
            setIsLoading(false);
        }
        catch (error) {
            console.log(`There was an error fetching the meals`);
        }
    }
    
    useEffect(() => { fetchMeals(); }, [preferences]);

    // Fetch all preferences to render to screen
    return(
        <ScrollView className="flex-1 p-8">
            <Text> 
                Test's Dashboard 
            </Text>
            {/* Display fetched cuisines by category if fetch was successful, else display error message */}
            {
                isLoading ? <Text> Loading ... </Text> : <Text> Meals Received </Text>

                // fetchedCuisines && fetchedCuisines.map((cuisine, key) =>
                //     {
                //         return(
                //             <View key={key}>
                //                 <Text> {cuisine} </Text>
                //                 <FlatList
                //                     data={cuisine}
                //                     renderItem={({item}) => <MealCard meal={item} />}
                //                     horizontal
                //                 />
                //             </View>
                //         );
                //     }
                // )
            }
            
        </ScrollView>
    );
};