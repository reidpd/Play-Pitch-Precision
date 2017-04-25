import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


class OctaveDown extends Component {

  onPress() {

  }


  render() {
    return (
      <View>
        <Button
          onPress={this.onPress}
          title="Octave Down"
          color="#841584"
        />
      </View>
    );
  }

}

export default OctaveDown;
