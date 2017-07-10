import { addNavigationHelpers, StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import HomePage from './Home';
import ProfilePage from './Profile';
import LoginPage from './Login';
import { combineReducers, createStore } from 'redux';
import React from 'react';
import {connect, Provider} from 'react-redux';
import {
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';


const MenuButton = (props) => {
  return (
    <TouchableOpacity onPress={() => {
      props.navigation.navigate('DrawerOpen');
    }}>
      <Image
        style={{width:40, height:40}}
        source={require('./ic_dehaze_3x.png')}
      />
    </TouchableOpacity>
  );
}

const drawerNavigationOptions = ({screenProps, navigation}) => {
  return {
    headerStyle: {
      backgroundColor: '#FF6347',
      shadowColor: 'white',
    },
    headerTitleStyle: {
      color: 'black',
    },
    headerLeft: (<MenuButton navigation={navigation}/>),
  }
};

const ProfileNav = StackNavigator({
  ProfileDrawer: {
    screen: ProfilePage,
    navigationOptions: {
      title: 'Profile',
    }
  },
  },
  {
    navigationOptions: drawerNavigationOptions,
  },
)


const HomeNav = StackNavigator({
  HomeDrawer: {
    screen: HomePage,
    navigationOptions: {
      title: 'Home',

    }
  },
  },
  {
    navigationOptions: drawerNavigationOptions,
  },
)

const MainNav = DrawerNavigator(
  {
  HomeNav: {
    screen: HomeNav,
  },
  Profile: {
    screen: ProfileNav,
  }
  },
  {
  contentComponent: props =>
    <ScrollView>
      <DrawerItems
        {...props}
      />
      </ScrollView>,
  contentOptions: {
    activeTintColor:  '#FF6347'
  }
  },
);

const AppRouteConfigs = {
  Login: {
    screen: LoginPage,
  },
  Home: {
    screen: MainNav,
  },
}

const AppNavigator = StackNavigator(AppRouteConfigs,{headerMode: 'none'});

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const appReducer = combineReducers({
  nav: navReducer,
});



class App extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
export default Root;
