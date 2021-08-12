import React, { FC } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Profile, Search, Details, Search2 } from './Screens';

type HomeStackParamList = {
  Home: undefined;
  Details: { name: string };
};

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator<HomeStackParamList>();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const HomeStackScreen: FC = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name,
      })}
    />
  </HomeStack.Navigator>
);

const ProfileStackScreen: FC = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const SearchStackScreen: FC = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home Stack" component={HomeStackScreen} />
    <Tabs.Screen name="Search Stack" component={SearchStackScreen} />
  </Tabs.Navigator>
);

const App: FC = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabsScreen} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default App;
