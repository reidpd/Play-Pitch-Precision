import React, { Component } from 'react';
import { View, Text } from 'react-native';

import OctaveUp from './octaveUp';
import OctaveDown from './octaveDown';
import Profile from './profile';


class Header extends Component {

  render() {
    return (
      <View>
        <OctaveUp />
        <Profile />
        <OctaveDown />
      </View>
    )
  };


}

export default Header;
