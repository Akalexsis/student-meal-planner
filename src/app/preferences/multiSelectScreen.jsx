`
    Handles logic for rendering forms with multi-select options 
`

export default function MultiselectScreen({options}) {
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
        );

}
