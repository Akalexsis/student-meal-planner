// Preferences UI to display preferences form to user
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";
import { useFormContext } from "../../utils/FormContext";
import { preferencesMetadata } from "../../utils/preferences_metadata";
import MultiselectScreen from "./MultiSelectScreen";
import TextInputScreen from "./TextInputScreen";


export default function PreferencesForm(){
    `
        Render and save selected user preferences 

        currPage - Context variable that stores index for currently displayed page
        pages - Object that stores which input type to render along with its associated page identifier (key)
    `
    // stores currently displayed page and implements form navigation
    const { currPage, setCurrPage }  = useFormContext();

    
    // Render appropriate form input based on selected question. key - form index, value - component to return
    const pages = {
        0 : <TextInputScreen id={preferencesMetadata[0]["key"]} inputType={preferencesMetadata[0]["input_type"]}/>, 
        1 : <MultiselectScreen id={preferencesMetadata[1]["key"]} options={preferencesMetadata[1]["input_type"]}/>,
        2 : <TextInputScreen id={preferencesMetadata[2]["key"]} inputType={preferencesMetadata[2]["input_type"]}/>,
    }


    // handles forward and backwards navigation between questions
    const onNext = () => {
        // TO-DO route to home page when user submits form

        setCurrPage( prev => prev + 1 );
    }

    return(
        <KeyboardAvoidingView 
            className="flex-1 items-center bg p-6"
            behavior="padding" 
            keyboardVerticalOffset={Platform.OS ? 100 : 0 }
        >

                {/* Next and Previous buttons handle forward and backward form navigation */}
                <View className="flex-row">
                    <Pressable disabled={currPage === 0 ? true : false} onPress={ (prev) => setCurrPage( prev => prev - 1 )}>
                        <Text className="p-2 text-primaryGreen text-md hover:bg-primaryOrange hover:text-primaryGreen"> { currPage === 0 ? null : "Previous" }  </Text>
                    </Pressable>
                    <Pressable 
                        className="rounded-sm"
                        onPress={onNext} disabled={currPage === preferencesMetadata.length - 1 ? true : false}
                    >
                        <Text className="p-2 text text-md bg-primaryGreen hover:bg-primaryOrange hover:text-primaryGreen"> { currPage === preferencesMetadata.length - 1 ? "Submit" : "Next" } </Text>
                    </Pressable> 
                </View>
                

                {/* Index preferencesMetadata to display that page's question and subheading */}
                <Text className="text-3xl/[2] text-primaryGreen font-medium">{preferencesMetadata[currPage]["question"]}</Text>
                <Text className="pb-6 text-xl/[2] font-medium">{preferencesMetadata[currPage]["subheading"]}</Text>

                {/* Index pages object to render input type for currently selected page */}
                { pages[currPage] } 
        </KeyboardAvoidingView>
                
    );
}