import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/header';
import Home from './src/components/home';
import CommunityList from './src/components/PersonalList';

const App = () => {
  return (
    <View>
      <Header headerText={'Home'} />
      <CommunityList />
      <Home />
    </View>
  );
};


AppRegistry.registerComponent('PPP', () => App);
