import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Orientation from 'react-native-orientation';
import Header from './header';


class Interface extends Component {

  componentDidMount() {
    // Orientation.lockToLandscape();
  }

  render() {
    return (
      <View>
        <Header />
      </View>
    )
  };

}

export default Interface;
