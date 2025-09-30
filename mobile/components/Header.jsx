import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
      <Text>Header</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // 👈 svart bakgrund så vit text syns
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white", // 👈 vit text
    fontSize: 18,
  },
});