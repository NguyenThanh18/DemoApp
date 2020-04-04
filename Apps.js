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

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const HomeStackScreen = () =>(
    <Stack.Navigator>
        <Stack.Screen name="Discover" component={List}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
  )

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="List"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
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
        <MyTabs />
      </NavigationContainer>
    );
  }