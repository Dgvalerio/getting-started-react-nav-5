import React, { FC, useEffect, useMemo, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthContext from './context';
import {
  Home,
  Profile,
  Search,
  Details,
  Search2,
  Splash,
  SignIn,
  CreateAccount,
} from './Screens';

type HomeStackParamList = {
  Home: undefined;
  Details: { name: string };
};

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
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

const DrawerScreen: FC = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="HomeOff" component={TabsScreen} />
    <Drawer.Screen name="ProfileOff" component={ProfileStackScreen} />
  </Drawer.Navigator>
);

const AuthStackScreen: FC = () => (
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
);

const RootStackScreen: FC<{ userToken: string | null }> = ({ userToken }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    {userToken ? (
      <RootStack.Screen name="Auth" component={DrawerScreen} />
    ) : (
      <RootStack.Screen
        name="App"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  const authContext = useMemo(
    () => ({
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
      signIn: () => {
        setIsLoading(false);
        setUserToken('complexUserToken');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('complexUserToken');
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) return <Splash />;

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
