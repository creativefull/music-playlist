'use strict';
import React, {Component} from 'react'
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
  ListView,
  Alert,
  BackHandler
} from 'react-native';
import Button from 'react-native-button';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase'
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('ndx aka').addKeyword('music');
import { Artists } from '../../mockData';
import Player from '../player/Player';
const admob = require('../../admob.json')

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 280;
const STICKY_HEADER_HEIGHT = 50;
const AVATAR_SIZE = 120;

import { 
  StackNavigator,
  NavigationActions
} from 'react-navigation'

let backButtonPressFunction = () => false

class ArtistShow extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft : null,
      header : {
        visible : false
      },
      title : 'NDX AKA'
    }
  }

  constructor() {
    super()
    this.state = {
      player : {
          songIndex: 0,
          songs: Artists[0].songs,
          image: Artists[0].background,
          artist: Artists[0]
      }      
    }    
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert('This App', 'Are you quit ?', [{
        text : 'Yes',
        onPress : () =>  {
          return BackHandler.exitApp()
        }
      }, {
        text : 'No',
        onPress : () => {
          return false
        }
      }])

      return true
      // return this.props.navigation.navigate('Home', {artist : Artists[0]})
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      return true
    })
  }

  renderStickyHeader() {
    const {artist} = this.props.navigation.state.params
    return(
      <View style={ styles.stickySection }>
        <Text style={ styles.stickySectionTitle }>{ artist.name }</Text>
      </View>
    );
  }

  renderForeground() {
    const {artist} = this.props.navigation.state.params
    return(
      <View key="parallax-header" style={ styles.parallaxHeader }>
        <Image style={ styles.avatar } source={{
          uri:  artist.background,
          width: AVATAR_SIZE,
          height: AVATAR_SIZE
        }}/>
        <Text style={ styles.artistName }>
          { artist.name }
        </Text>
      </View>
    );
  }

  renderBackground() {
    const {artist} = this.props.navigation.state.params
    return(
      <View key="background" style={ styles.background }>
        <Image source={{uri: artist.background,
                        width: window.width,
                        height: PARALLAX_HEADER_HEIGHT}}/>
        <View style={ styles.backgroundOverlay }/>
      </View>
    );
  }

  renderSongsList() {
    const {artist} = this.props.navigation.state.params
    let songsDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows( artist.songs );

    return(
      <ListView
        dataSource={ songsDataSource }
        style={ styles.songsList }
        renderRow={(song, sectionId, rowId) => (
          <TouchableHighlight
                onPress={ () => {
                  let player = { songIndex: parseInt( rowId ), songs: artist.songs, artist: artist }
                  this.playerMusic.setItem(parseInt(rowId))
                }}
                activeOpacity={ 100 }
                underlayColor="rgba(246, 41, 118, 0.6)">
            <View key={song} style={ styles.song }>
              <Text style={ styles.songTitle }>
                { song.title.toUpperCase() }
              </Text>
            </View>
          </TouchableHighlight>
          )}/>
    );
  }

  renderAdmob() {
    return (
        <Banner
            size={"SMART_BANNER"}
            request={request.build()}
            unitId={admob.banner_id}
            onAdLoaded={() => {
                console.log('BANNER ADMOB LOADED')
                {/*alert('ok')*/}
            }}/>
    )
  }

  x() {
    return this.state.player
  }
  renderPlayer() {
    const {player} = this.state
    return (
        <View style={{height : 350}}>
          <Image
            style={{
              top : 0,
              left : 0,
              right : 0,
              bottom : 0,
              flex : 1,
              position : 'absolute',
              justifyContent : 'center'
            }}
            source={{uri : 'https://i.ytimg.com/vi/_PybCKpaw3U/maxresdefault.jpg' }}/>
          <Player
            ref={ref => this.playerMusic = ref}
            navigation={this.props.navigation}
            params={this.state.player}/>
        </View>
    )
  }
  render() {
    const { onScroll = () => {} } = this.props;
    const {artist} = this.props.navigation.state.params
    return (
      <View>
        <ParallaxScrollView
          style={ { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, width: window.width, height: window.height } }
          parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
          stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
          onScroll={onScroll}
          renderStickyHeader={ this.renderStickyHeader.bind(this) }
          renderForeground={ this.renderPlayer.bind(this) }
          renderBackground={ this.renderBackground.bind(this) }>
          {this.renderAdmob()}
          { this.renderSongsList() }
        </ParallaxScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#000",
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    width: window.width,
    backgroundColor: 'rgba(0,0,0,.8)',
    height: PARALLAX_HEADER_HEIGHT
  },
  headerClose: {
    position: 'absolute',
    top: 5,
    left: 0,
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickySectionTitle: {
    color: "#FFF",
  },
  parallaxHeader: {
    alignItems: 'center',
    paddingTop: 40,
    width: window.width,
  },
  artistName: {
    fontSize: 23,
    color: "#FFF",
    fontFamily: "Helvetica Neue",
  },
  avatar: {
    marginBottom: 12,
    borderRadius: AVATAR_SIZE / 2
  },
  playButton: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 70,
    paddingRight: 70,
    backgroundColor: "#f62976",
    borderRadius: 200,
  },
  playButtonText: {
    color: "#FFF",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
  },
  songsList: {
    flex: 1,
    backgroundColor: "#000",
    // paddingTop: 5,
    height: window.height - STICKY_HEADER_HEIGHT,
  },
  song: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#111",

  },
  songTitle: {
    color: "white",
    fontFamily: "Helvetica Neue",
    marginBottom: 5,
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: "Helvetica Neue",
    fontSize: 12
  },

});

export default StackNavigator({
  Home : {
    index: 0,
    screen : ArtistShow
  },
  Player : {
    index : 1,
    screen : Player
  }
}, {
  headerMode : 'none',
  initialRouteName : 'Home',
  navigationOptions : {
    headerLeft : null
  }
})