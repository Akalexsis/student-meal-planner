import { Link } from "expo-router";
import { Text } from "react-native";
import Screen from "../components/Screen";

export default function Index() {
  return (
    <Screen >
      <Text className="text-5xl/[2] text-yellowAccent font-medium tracking-wide">WELCOME</Text>
      <Text className="text-lg text"> Make meal planning fast, affordable, and stress free! Click the button below
          to get started.
      </Text>
      {/* Directs users to the preferences questionnaire */}
      <Link className="text text-md hover:text-prmaryOrange"
        href="/preferences"> 
        Get Started 
      </Link>
    </Screen>
  );
}
