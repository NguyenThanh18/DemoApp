import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
export default class All extends Component{
    render(){
        return(
            <View
                style={style.container}
            >
                <Text>
                    all
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