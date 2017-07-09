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
  TouchableOpacity,
} from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { getHeaders } from 'react-native-simple-auth/lib/utils/oauth1';
import { KEY } from './Utils/Constant';

export default class Home extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentDidMount = () => {
    this._fectchTimeLineAPI();
  }
  async _fectchTimeLineAPI (){
    const info = this.props.navigation.state.params;
    const { credentials: { oauth_token, oauth_token_secret } } = info;
    const httpMethod = 'GET';
    const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
    const headers = getHeaders(url, {},{}, KEY.consumerKey, KEY.consumerSecret, httpMethod, oauth_token, oauth_token_secret);

    const response = await fetch(url, {
      method: httpMethod,
      headers,
    });
    const json = await response.json();
    console.log(json);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(json),
    })
  };

  async _updateLikeButton (favorited,id) {
    console.log(favorited);
    console.log(id);
    const info = this.props.navigation.state.params;
    const { credentials: { oauth_token, oauth_token_secret } } = info;
    const httpMethod = 'POST';
    let url ='';
    if(favorited) {
      url = `https://api.twitter.com/1.1/favorites/destroy.json?id=${id}`;
    }
    else {
      url = `https://api.twitter.com/1.1/favorites/create.json?id=${id}`;
    }
    console.log(url);
    const headers = getHeaders(url, {id:id},{}, KEY.consumerKey, KEY.consumerSecret, httpMethod, oauth_token, oauth_token_secret);
    console.log(headers);
    const response = await fetch(url, {
      method: httpMethod,
      headers,
      data: {id},
    });
    const json = await response.json();
    console.log(json);
    this._fectchTimeLineAPI();
  }

  _onImagePress (user) {
    console.log(user);
    //this.props.navigation.navigate('Profile',user)
  }

  renderRow(rowData) {
    return (
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=> this._onImagePress(rowData.user)}>
          <Image
            style={{width:100, height:100}}
            source={{uri: rowData.user.profile_image_url_https}}
          />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize:25}}>
            {rowData.user.name}
          </Text>
          <Text style={{fontSize:20}}>
            {rowData.text}
          </Text>
          {
            rowData.user.entities.media?
            rowData.user.entities.media.map(item => {
                if(item.type === 'photo') {
                  return <Image
                  style={{width:100, height:100}}
                  source={{uri: item.media_url}}
                  />
                }
              })
              : null
          }
          <TouchableOpacity
            onPress={() => this._updateLikeButton(rowData.favorited,rowData.id_str)}
          >
            <Image
              style={{width: 30, height: 30}}
              source={rowData.favorited? require('./if_JD-04_2246830.png') : require('./if_jee-04_2239656.png')}
            />

          </TouchableOpacity>
        </View>
      </View >
    )
  }

  render() {
    return (
      <View>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          enableEmptySections
          pageSize={2}
          renderRow={(rowData) => this.renderRow(rowData)}
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
