import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

export default class App extends Component {
  render() {
    return (
      <Text style={styles.text}>vansh</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25
  }
})