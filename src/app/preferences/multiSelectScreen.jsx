`
    Handles logic for rendering forms with multi-select options 
`
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useFormContext } from "../../utils/FormContext";

export default function MultiselectScreen({id, options}) {
    ` 
        UI for multiselect, renders UI for each button and saves selection when user clicks on it
        options - array of options to render to screen

        isSelected - highlights button when it is selected
        selectedItems - saves array of selected options 
    `
    const [isSelected, setIsSelected] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const { handlePreferences } = useFormContext();

    console.log(`Options: ${options}`);

    // toggle button each time it is selected and save response
    const onSelect = (option) => {
        setIsSelected(!isSelected);
        console.log(`Option ${option}: ${isSelected}`);
        
        // remove item if it has already been saved, else save it
        // if (!isSelected) {
        //     let filteredItems = selectedItems.filter( (item) => { item !== option } );
        //     setSelectedItems(filteredItems);
        // } 
        // else {
        //     setSelectedItems((prev) => [...prev, option]);
        // }

         setSelectedItems((prev) => {
            if (prev.includes(option)) prev.filter( (item) => { item !== option } );
            else [...prev, option];
        });

        // save selections to global context
        // handlePreferences(id, selectedItems);
    }
    console.log(`Selected items: ${selectedItems}`);

    return(
            // render each option as its own individual button
            <View>
                {
                    options && options.map((option, key) => {
                        return(
                            <Pressable key={key} onPress={(option) => onSelect(option)}>
                                <Text> {option} </Text>
                            </Pressable>
                        );
                    })
                }
            </View>
        );

}
