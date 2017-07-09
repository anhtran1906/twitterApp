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
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { twitter } from 'react-native-simple-auth';
import { getHeaders,} from 'react-native-simple-auth/lib/utils/oauth1';
import {KEY} from './Utils/Constant';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      ready: false,
    }
  }
  componentWillMount = () => {
    AsyncStorage.getItem('info')
      .then((info) => {
        console.log(info);
        if(info){
          this.props.navigation.navigate('Home',JSON.parse(info));
        }else {
          this.setState({
            ready: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          ready: true,
        });
      })
  }

  _loginTwitter(){
    twitter({
        appId: KEY.consumerKey,
        appSecret: KEY.consumerSecret,
        callback: 'com.anhtran://authorize', //rncs is deep link scheme
      }).then((info) => {
        AsyncStorage.setItem('info',JSON.stringify(info));
        this.props.navigation.navigate('Home',info);
      }).catch((error) => {
        alert(JSON.stringify(error))
      });
  }
  render() {
    if(!this.state.ready){
//show loading
      console.log('ready false')
      return null;
    }
    return (
      <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity
          onPress={() => this._loginTwitter()} >
          <Text style={{fontSize:25}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
