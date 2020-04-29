import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/Home';
import ProfileScreen from './Screens/Profile';
import FavoriteScreen from './Screens/Favorite';
import CartScreen from './Screens/Cart';
import DetailsScreen from './Screens/Details'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStackScreen = () =>(
  <Stack.Navigator>
      <Stack.Screen name="Discover" component={HomeScreen}/>
      <Stack.Screen name="Details" component={DetailsScreen}/>
      <Stack.Screen name="Cart" component={CartScreen}/>
    </Stack.Navigator>
)
function MyTabs(){
  return(
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen 
          name="Home" component={HomeStackScreen} 
          options={{
            tabBarIcon: ({color}) => (
                <Icon style={{color: color}}  size={24} name={'home'}/>
            ),
          }}
        />
        <Tab.Screen 
          name="Favorites" component={FavoriteScreen} 
          options={{
            tabBarIcon: ({color}) => (
                <Icon style={{color: color}}  size={24} name={'hearto'}/>
            ),
          }}
        />
        <Tab.Screen 
          name="Cart" component={CartScreen}
          options={{
            tabBarIcon:({color}) => (
                <Icon style={{color: color}}  size={24} name={'shoppingcart'}/>
            ),
          }}
        />
        <Tab.Screen 
          name="Profile" component={ProfileScreen} 
          options={{
            tabBarIcon: ({color}) => (
                <Icon style={{color: color}}  size={24} name={'user'}/>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;