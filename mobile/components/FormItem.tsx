import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import { View } from "react-native";
// Identify the types of the props coming in
type Props = {
  title: string;
  newValue: string;
  changeValue: any;
  secure: boolean;
};

const FormItem: React.FC<Props> = ({
  title,
  newValue,
  changeValue,
  secure,
}) => {
  //   capitalize the first letter of the category's value
  const capitalizeFirstLetter = (title: string) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };
  const titleValue = capitalizeFirstLetter(title);
  return (
    <View>
      <Text style={{ fontWeight: 500 }}>{titleValue}</Text>
      <TextInput
        placeholder={`Enter ${title}`}
        placeholderTextColor="#888"
        value={newValue}
        onChangeText={changeValue}
        autoCapitalize="none"
        accessibilityLabel={`${titleValue} input field`}
        accessibilityHint={`Enter your ${title}`}
        secureTextEntry={secure}
        style={{ borderColor: "gray", borderWidth: 1, borderRadius: 10 }}
      ></TextInput>
    </View>
  );
};

export default FormItem;
