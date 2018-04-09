'use strict';
import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  Image,
  View
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import { Artists } from '../../mockData';
import ArtistListItem from './ArtistListItem';

class ArtistList extends Component {

  componentDidMount() {
      const {navigate} = this.props.navigation
        setTimeout(() => {
            navigate('PlayList', {artist : Artists[0]})
        }, 1000)
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<Text style={styles.welcome}>Hello world</Text>*/}
        <Image
          source={{uri : 'https://www.music-bazaar.com/album-images/vol32/1356/1356730/3227038-big/Nella-Hip-Hop-Koplo-cover.jpg'}}
          style={{flex : 1, alignItems : 'stretch'}}
          resizeMode="cover"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#111',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  instructions: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
});

export default ArtistList
