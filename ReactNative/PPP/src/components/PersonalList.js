import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';
import PersonalDetail from './PersonalDetail';

class CommunityList extends Component {
  state = { users: [] };

  componentWillMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    .then(response => this.setState({ users: response.data }));
  }

  renderCommunityList() {
    return (this.state.users.map(album =>
        <PersonalDetail key={album.title} album={album} />)
      );
  }

  render() {
    return (
      <ScrollView>
        {this.renderCommunityList()}
      </ScrollView>
    );
  }
}

export default CommunityList;
