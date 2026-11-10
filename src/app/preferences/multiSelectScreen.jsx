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

    const onSelect = (option) => {
        `
            Save selected cuisine when user clicks on that option, otherwise remove from saved 
            cuisine array selectedItems
        `
        // setIsSelected(!isSelected);
        
        // if selected option not already saved, save it
        if (!selectedItems.includes(option)) {
            setSelectedItems([...selectedItems, option]);
        } 
        else {
            setSelectedItems(selectedItems.filter( (item) => item !== option ));
        }

        // save selections to global context
        handlePreferences(id, selectedItems);
    }
    console.log(`Selected items: ${selectedItems}`);

    return(
            // render each option as its own individual button
            <View>
                {
                    options && options.map((option, key) => {
                        return(
                            <View key={key}>
                                <Pressable 
                                    className="hover:bg-primaryGreen"
                                    onPress={() => onSelect(option)}>
                                    <Text> {option} </Text>
                                </Pressable>
                            </View>
                        );
                    })
                } 
            </View>   
        );

}

