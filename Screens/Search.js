import React, {Component} from 'react';
import {StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Text,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as theme from '../theme';
import { View } from 'native-base';
import flatListData from '../data/flatlistData';
const { width, height } = Dimensions.get('window');
import { ListItem, SearchBar } from "react-native-elements";

export default class SearchScreen extends Component{
    constructor(props) {
        super(props); 
      
        this.state = { 
          loading: false,   
          data: [],
          temp: [],
          error: null,
          search: null
        };
      }
      
      componentDidMount() {
        this.getData();
      }
      getData = async ()  => {
        const url = `http://192.168.1.108/listproducts.php`;
        this.setState({ loading: true });
          
         try {
            const response = await fetch(url);
            const json = await response.json();
            this.setResult(json);
         } catch (e) {
            this.setState({ error: 'Error Loading content', loading: false });
         }
      };
      setResult = (res) => {
        this.setState({
          data: [...this.state.data, ...res],
          temp: [...this.state.temp, ...res],
          error: res.error || null,
          loading: false
        });
      }
      updateSearch = search => {
        this.setState({ search }, () => {
            if ('' == search) {
                this.setState({
                    data: [...this.state.temp]
                });
                return;
            }
             
            this.state.data = this.state.temp.filter(function(item){
                return item.name.includes(search);
              }).map(function({id, name, price, preview}){
                return {id, name, price, preview};
            });
        });
    };
    renderHeader = () => {
        return <SearchBar placeholder="Search Here..."
            lightTheme round editable={true}
            value={this.state.search}
            onChangeText={this.updateSearch} />; 
    }; 
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
            this.state.error != null ?
            <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.state.error}</Text>
                <Button onPress={
                    () => {
                    this.getData();
                    }
                } title="Reload" />
            </View> : 
            <FlatList
                ListHeaderComponent={this.renderHeader}
                data={this.state.data}
                keyExtractor={item => item.name}
                numColumns={2}
                renderItem={({ item, index }) => this.renderRecommendation(item, index)}
            />
                
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