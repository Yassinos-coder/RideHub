import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack initialRouteName="Screens/AuthScreen">
      <Stack.Screen
        name="Screens/AuthScreen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default RootLayout;
