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

export default class Profile extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentDidMount = () => {
    this._fectchProfileAPI();
  }
  async _fectchProfileAPI (){
    const info = this.props.navigation.state.params;
    console.log()
    const { credentials: { oauth_token, oauth_token_secret } } = info;
    const httpMethod = 'GET';
    const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
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

  renderRow(rowData) {
    console.log(rowData.user.profile_image_url);
    return (
      <View style={{flexDirection:'row'}}>
        <Image
          style={{width:100, height:100}}
          source={{uri: rowData.user.profile_image_url_https}}
        />
        <View>
          <Text
            style={{fontSize:24}}
          >
            {rowData.user.name}
          </Text>
          <Text>
            {rowData.text}
          </Text>
          {
            rowData.user.entities.media?
            rowData.user.entities.media.map(item => {
                if(item.type === 'photo') {
                  return <Image
                  style={{width:100, height:100}}
                  source={{uri: item.media_url_https}}
                  />
                }
              })
              : null
          }
          <Text>
            Followers: {rowData.user.followers_count}
          </Text>
          <Text>
            Friends: {rowData.user.friends_count}
          </Text>
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
