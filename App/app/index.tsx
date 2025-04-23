import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View>
      <Text>HomePage</Text>
      <Link href="/user/1"> Go to user profile</Link>
    </View>
  );
};

export default index;
