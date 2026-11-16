import { Text } from "react-native";

export default function BodyText({children}) {
    return (
        <Text className="text-md/[2] text">
            {children}
        </Text>
    )
}