import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import { View } from "react-native";
// Identify the types of the props coming in
type Props = {
  newValue: string;
  changeValue: any;
  secure: boolean;
};

const FormItem: React.FC<Props> = ({ newValue, changeValue, secure }) => {
  //   capitalize the first letter of the category's value
  const capitalizeFirstLetter = (newValue: string) => {
    return newValue.charAt(0).toUpperCase() + newValue.slice(1);
  };
  const titleValue = capitalizeFirstLetter(newValue);
  return (
    <View>
      <Text>{titleValue}</Text>
      <TextInput
        placeholder={`Enter ${newValue}`}
        placeholderTextColor="#888"
        value={newValue}
        onChangeText={changeValue}
        autoCapitalize="none"
        accessibilityLabel={`${titleValue} input field`}
        accessibilityHint={`Enter your ${newValue}`}
        secureTextEntry={secure}
      ></TextInput>
    </View>
  );
};

export default FormItem;
