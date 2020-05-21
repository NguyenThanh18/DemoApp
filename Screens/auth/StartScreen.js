import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import * as theme from '../../theme';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/AntDesign';
const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.blue
    },
    slide2: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ee5253'
    },
    slide3: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.green,
    },
    slideLogin: {
        flex: 1,
        backgroundColor: theme.colors.red,
    },
    text: {
        paddingTop: 100,
        paddingBottom: 100,
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    container:{
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    getStart:{
        backgroundColor: theme.colors.white,
        width: 380,
        height: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        marginTop: 150,
    },
    getStartText:{
        color: theme.colors.green,
        fontSize: 25,
        fontWeight: 'bold',

    }
})
export default class StartScreen extends Component {
    render() {
      return (
        <Swiper style={styles.wrapper}  loop={false}>
            <View style={styles.slide1}>
                <Text style={styles.text}>Chào Mừng Đến Với MyShop</Text>
                <Icon name='shoppingcart' size={150} color={theme.colors.white}/>
            </View>
            <View style={styles.slide2}>
                <Text style={styles.text}>Thanh Toán An Toàn</Text>
                <Icon name='creditcard' size={150} color={theme.colors.white}/>
            </View>
            <View style={styles.slide3}>
                <Text style={styles.text}>Giao Hàng Nhanh Chóng</Text>
                <Icon name='rocket1' size={150} color={theme.colors.white}/>
                <TouchableOpacity 
                    style={styles.getStart} 
                    onPress={() =>  this.props.navigation.navigate('Login')}
                >
                    <Text style={styles.getStartText} >LET'S GO</Text>
                </TouchableOpacity>
            </View>
        </Swiper>
      )
    }
  }      