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
} from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { twitter } from 'react-native-simple-auth';

export default class Login extends Component {
  _loginTwitter(){
    twitter({
        appId: '6bEEu6VIi9oGPBl6sm2CGvwRE',
        appSecret: 'uchRfYyAqXfPA03uuKiBEhijy1D1NRMiAvimIYWkdftBOMjCLr',
        callback: 'com.anhtran://authorize', //rncs is deep link scheme
      }).then((info) => {
        console.log(info)
        alert(JSON.stringify(info))
      }).catch((error) => {
        alert(JSON.stringify(error))
      });
  }

  render() {
    return (
      <View>
        <Button title='Login' onPress={() => this._loginTwitter()} />
      </View>
    )
  }
}
