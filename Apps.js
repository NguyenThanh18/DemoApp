import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './Screens/Profile';
import FavoriteScreen from './Screens/Favorite';
import CartScreen from './Screens/Cart';
import DetailsScreen from './Screens/Details';
import List from './Screens/List';
import SearchScreen from './Screens/Search';
import LoginScreen from './Screens/auth/LoginScreen';
import StartScreen from './Screens/auth/StartScreen';
import RegisterScreen from './Screens/auth/RegisterScreen';
const Tab = createBottomTabNavigator();

const StackHome = createStackNavigator();

function HomeStack () {
    return(
      <StackHome.Navigator>
        <StackHome.Screen name="Discover" component={List}/>
        <StackHome.Screen name="Details" component={DetailsScreen} />
        <StackHome.Screen options={{headerShown: false}} name="Cart" component={CartScreen} />
        <StackHome.Screen name="Search" component={SearchScreen} />
        <StackHome.Screen name="Profile" component={ProfileScreen} />
      </StackHome.Navigator>
    )
}
const StackApp = createStackNavigator();

function AppStack () {
    return(
      <StackApp.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <StackApp.Screen name="Start" component={StartScreen}/>
        <StackApp.Screen name="Login" component={LoginScreen}/>
        <StackApp.Screen name="Register" component={RegisterScreen}/>
        <StackApp.Screen name="Home" component={MyTabs} />
    </StackApp.Navigator>
    )
}


function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="hearto" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shoppingcart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
    return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    );
  }