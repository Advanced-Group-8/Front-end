import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CurrentOrders = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CurrentOrders</Text>
    </View>
  )
}

export default CurrentOrders

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", 
    justifyContent: "center",
  },
  text: {
    color: "white", 
    fontSize: 18,
  },
});