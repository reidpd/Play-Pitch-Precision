import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/header';
import Home from './src/components/home';
import CommunityList from './src/components/PersonalList';

const App = () => {
  return (
<<<<<<< HEAD
    <View>
      <Header headerText={'NavBar'} />
=======
    <View style={{ flex: 1 }}>
      <Header headerText={'Home'} />
      <CommunityList />
>>>>>>> feature
      <Home />
    </View>
  );
};


AppRegistry.registerComponent('PPP', () => App);
