import React, { FC } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  CreateAccount,
  SignIn,
  Home,
  Profile,
  Search,
  Details,
  Search2,
} from './Screens';

const AuthStack = createStackNavigator();

type HomeStackParamList = {
  Home: undefined;
  Details: { name: string };
};

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator<HomeStackParamList>();
const ProfileStack = createStackNavigator();
const SearchStack = createStackNavigator();

const AppWithStackNavigation: FC = () => (
  <NavigationContainer>
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: 'Sign in' }}
      />
      <AuthStack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ title: 'Create Account' }}
      />
    </AuthStack.Navigator>
  </NavigationContainer>
);

const HomeStackNavigation: FC = () => (
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

const ProfileStackNavigation: FC = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const SearchStackNavigation: FC = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Search2" component={Search2} />
  </SearchStack.Navigator>
);

const App: FC = () => (
  <NavigationContainer>
    <Tabs.Navigator>
      <Tabs.Screen name="Home Stack" component={HomeStackNavigation} />
      <Tabs.Screen name="Search Stack" component={SearchStackNavigation} />
    </Tabs.Navigator>
  </NavigationContainer>
);

export default App;
