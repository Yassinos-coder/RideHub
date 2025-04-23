import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="user/[id]"
        options={{ headerTitle: "User Profile" }}
      />
    </Stack>
  );
};

export default RootLayout;
