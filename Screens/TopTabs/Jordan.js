import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
export default class Jordan extends Component{
    render(){
        return(
            <View
                style={style.container}
            >
                <Text>
                    Favorite
                </Text>
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
        
    }
})