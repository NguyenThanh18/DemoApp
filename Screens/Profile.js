import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
const image = {uri: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/zaiywkaxptzxmajetrd7/pg-3-basketball-shoe-bqfLGJ.jpg'}
const image2 = {uri: '../pic/fd.jpg'}

export default class ProfileScreen extends Component{
    render(){
        return(
            <View
                style={style.container}
            >
                <Text>
                    Profile
                </Text>
                <Image 
                    style={style.image}
                    source={image}
                />
                <Image 
                    style={style.image}
                    source={image2}
                />
            </View>
        );
    }
}
const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#f1f2f6'
    },
    image:{
        width: 100,
        height: 100,
        backgroundColor: 'red',
        flex: 8/10
    }
})