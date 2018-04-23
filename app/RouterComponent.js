'use strict';
import React, {Component} from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ArtistList from './components/artists/ArtistList';
import ArtistShow from './components/artists/ArtistShow';
import Player from './components/player/Player';
import { Artists } from './mockData';

import {
    StackNavigator
} from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  }
});

export default StackNavigator({
    Splash : {
        screen : ArtistList,
        navigationOptions : {
            headerLeft : null
        }
    },
    PlayList : {
        screen : ArtistShow,
        navigationOptions : {
            headerLeft : null
        }
    }
}, {
    headerMode : 'none',
    initialRouteName : 'PlayList',
    initialRouteParams : {
        artist : Artists[0]
    }
})