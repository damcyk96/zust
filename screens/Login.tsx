import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { MonoText } from "../components/StyledText";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { setToken } = useContext(AuthContext);

  const onPress = () => {
    setToken("token");
  };

  return (
    <View style={{ padding: 50 }}>
      <TouchableOpacity onPress={onPress}>
        <MonoText>login</MonoText>
      </TouchableOpacity>
    </View>
  );
}
