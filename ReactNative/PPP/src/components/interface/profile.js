import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';


class Profile extends Component {

  onPress() {

  }


  render() {
    return (
      <View>
        <Button
          onPress={this.onPress}
          title="Profile"
          color="#841584"
        />
      </View>
    );
  }

}

export default Profile;
