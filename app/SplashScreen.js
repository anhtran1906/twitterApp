/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Button,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { getHeaders } from 'react-native-simple-auth/lib/utils/oauth1';
import { KEY } from './Utils/Constant';

export default class SplashScreen extends Component {
  render() {
    return (
      <View>
        <Image
        style={{height: 200, width: 200}}
        source={require('./CbpiXftUUAEdYNX.png')}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
