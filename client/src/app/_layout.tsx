import { Stack } from "expo-router";
import "../global.css"; // may need to be imported in app/index.tsx
import { FormContextProvider } from "../utils/FormContext";

export default function RootLayout() {
  return (
    <FormContextProvider>
      <Stack />
    </FormContextProvider>
  );
}
