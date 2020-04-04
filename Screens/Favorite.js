import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import bannerData from '../data/bannerData';
import Swiper from 'react-native-swiper';
const image = {uri: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/zaiywkaxptzxmajetrd7/pg-3-basketball-shoe-bqfLGJ.jpg'}
const image2 = {uri: 'https://mpng.subpng.com/20180406/gee/kisspng-air-jordan-jumpman-sneakers-shoe-nike-jordan-5ac6ff221f6d24.0206187215229908821287.jpg'}

export default class FavoriteScreen extends Component{
    render(){
        return(
                <ViewPager style={{flex: 0.5}} initialPage={0}>
                    <View key="1" style={{backgroundColor: 'red'}}>
                        <Text>First page</Text>
                    </View>
                    <View key="2">
                        <Text>Second page</Text>
                    </View>
                </ViewPager>

        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#f1f2f6'
        
    },
    wrapper:{

    },
    image:{
        width: 100,
        height: 100
    }
})