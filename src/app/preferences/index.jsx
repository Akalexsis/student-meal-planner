// Preferences UI to display preferences form to user
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput } from "react-native";
import { View } from "react-native-web";
import { preferencesMetadata } from "../../utils/preferences_metadata";

// init object to store user preferences where key - question identifier, type - data type question can store
const initialPreferences = new Object();

preferencesMetadata.forEach((question) => { 
    let key = question["key"];
    let type = question["default_value"];

    initialPreferences[key] =  type;
}); 

function MultiselectScreen({options}) {
    ` 
        UI for multiselect, renders UI for each button and saves selection when user clicks on it
        options - array of options to render to screen

        isSelected - highlights button when it is selected
        selectedItems - saves array of items 
    `
    const [isSelected, setIsSelected] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    console.log(`Options: ${options}`);

    // toggle button each time it is selected and save response
    const onSelect = (option) => {
        setIsSelected(!isSelected);
        // console.log(`Selected option: ${selectedItems.includes(option)}`);
        
        // // remove item if it has already been saved, else save it
        // if (selectedItems.includes(option)) {
        //     let filteredItems = selectedItems.filter( (item) => { item !== option } );
        //     setSelectedItems(filteredItems);
        // } 
        // else {
        //     setSelectedItems((prev) => [...prev, option]);
        // }
        
        // console.log(`Selected items: ${selectedItems}`);
    }
   

    return(
        // render each option as its own individual button
        <View>
            {
                options && options.map((option, key) => {
                    return(
                        <Pressable key={key} style={{"backgroundColor": isSelected ? "bule" : "white"}} onPress={(option) => onSelect(option)}>
                            <Text> {option} </Text>
                        </Pressable>
                    );
                })
            }
        </View>
    )

}

export default function PreferencesForm(){
    `
        Render and save selected user preferences 

        userPreferences - stores user preferences, preferences based on input provided for each question
        key - unique question identifier, only stores key of currently displayed question
        index - indexes preferences metadata to control form navigation
    `
    const [userPreferences, setUserPreferences] = useState(initialPreferences);   
    const [key, setKey] = useState(""); 
    let index = useRef(0);
    
    // save user preferences
    const handlePreferences = (key, value) => {
        setUserPreferences((prev) => ( { ...prev, [key]: value } ))
    }

    // handles forward and backwards navigation between questions
    const onNext = () => {
        // save data and route to home page when user finishes form
        // if (index.current === preferencesMetadata.length - 1) route to dashboard
        index.current++;
        setKey(preferencesMetadata[index.current]["key"]); // save current key value
    }

    const onBack = () => {
        index.current--;
        setKey(preferencesMetadata[index.current]["key"]); // save current key value
    }

    return(
        <KeyboardAvoidingView key={key} behavior="padding" 
            keyboardVerticalOffset={Platform.OS ? 100 : 0 }>

                {/* navigation buttons */}
                <Pressable onPress={onNext} disabled={index.current === preferencesMetadata.length - 1 ? true : false}>
                    <Text> Next </Text>
                </Pressable>

                {/* TO-DO - USE STYLING TO HIDE BUTTON INSTEAD OF DISABLE IT */}
                <Pressable onPress={onBack} disabled={index.current === 0 ? true : false}>
                    <Text> Previous </Text>
                </Pressable>

                {/* index preferencesMetadata to display only one question (with it's related data) at a time */}
                <Text>{preferencesMetadata[index.current]["question"]}</Text>
                <Text>{preferencesMetadata[index.current]["subheading"]}</Text>

                {/* conditionally change page style based on input type */}
                { preferencesMetadata[index.current]["input_type"] === "text" ?
                    <TextInput 
                        onChangeText={(val) => handlePreferences(key, val)}
                        value={userPreferences[key]}
                        keyboardType={preferencesMetadata[index.current]["input_type"]}
                    />  :
                    <MultiselectScreen options={preferencesMetadata[index.current]["input_type"]}/> 
                }   
        </KeyboardAvoidingView>
                
    );
}