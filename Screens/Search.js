import React, {Component} from 'react';
import {StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Text,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as theme from '../theme';
import { View } from 'native-base';
import flatListData from '../data/flatlistData';
const { width, height } = Dimensions.get('window');

export default class SearchScreen extends Component{
    renderRecommendation = (item, index) => {
        const {navigation} = this.props;
        return (
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Details', {product: item})} >
          <View style={[
            styles.flex, styles.column, styles.recommendation, styles.shadow, 
          ]}>
            <View style={[styles.flex, styles.recommendationHeader]}>
              <Image style={[styles.recommendationImage]} source={{ uri: item.preview }} />
              <View style={[ styles.flex, styles.row, styles.recommendationOptions ]}>
                <Icon
                  name={item.favorite ? 'heart' : 'hearto'}
                  color= '#e91e63'
                  size= {22}
                  style={styles.heart}
                />
              </View>
            </View>
            <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: 16 }]}>
              <Text style={{ fontSize: 14 * 1.25, fontWeight: '500', paddingBottom: 36 / 4.5, }}>{item.name}</Text>
              <Text style={{ color: '#BCCCD4' }}>$ {item.price}</Text>
            </View>
          </View>
          </TouchableOpacity>
        )
      }
    render(){
        const { navigation } = this.props;
        return(
            <View style={{flex: 1}}>
                <View style={styles.searchBar}>
                    <View style={styles.bar}>
                        <Icon name="search1" size={22}/>
                        <TextInput 
                            placeholder="Search" 
                            autoFocus={false} 
                        />
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <FlatList
                        data={flatListData}
                        numColumns={2}
                        renderItem={({ item, index }) => this.renderRecommendation(item, index)}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    searchBar:{
        height: 80,
        backgroundColor: theme.colors.red,
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    heart:{
        right: -120,
        marginTop: 0
    },
    bar:{
        height: 50,
        backgroundColor: theme.colors.white,
        borderRadius: theme.sizes.radius,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5
    },
    flex: {
        flex: 0,
    },
    column: {
      flexDirection: 'column'
    },
    recommendation: {
        width: (width - 72) / 2,
        marginHorizontal: 8,
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginVertical: 36 * 0.5,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    recommendedHeader: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 36,
    },
    recommendationOptions: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 18,
        position: 'absolute',
    },
    recommendationTemp: {
        fontSize: 14 * 1.25,
        color: '#FFF'
    },
    recommendationImage: {
        width: (width - 72) / 2,
        height: (width - 72) / 3,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12
    },  
})