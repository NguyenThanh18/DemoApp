import React, { Component } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import flatListData from '../data/flatlistData';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    flex: {
        flex: 0,
    },
    column: {
      flexDirection: 'column'
    },
      row: {
        flexDirection: 'row'
      },
      lists: {
      },
      products: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 30,
      },
      product:{
        marginTop: 35,
        width: width - 72,
        height: width * 0.45,
        marginHorizontal: 36,
        paddingHorizontal:  36,
        paddingVertical: 36 * 0.66,
        borderRadius: 12,
      },
      productInfo: {
        marginTop: -200,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
        left: 220,
        backgroundColor: '#e91e63',
        width: 180,
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
      dots: {
        width: 10,
        height: 10,
        borderWidth: 2.5,
        borderRadius: 5,
        marginHorizontal: 6,
        backgroundColor: '#DCE0E9',
        borderColor: 'transparent',
      },
      activeDot: {
        width: 12.5,
        height: 12.5,
        borderRadius: 6.25,
        borderColor: '#e91e63',
      },
      
    recommended: {
    },
    recommendedHeader: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingHorizontal: 36,
    },
    recommendedList: {
    },
    recommendation: {
      width: (width - 72) / 2,
      marginHorizontal: 8,
      backgroundColor: '#FFF',
      borderRadius: 12,
      marginVertical: 36 * 0.5,
    },
    recommendationHeader: {
      overflow: 'hidden',
      borderTopRightRadius: 12,
      borderTopLeftRadius: 12,
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
    },
    heart:{
      right: -120,
      marginTop: 0
    }
})
class List extends Component{
  constructor(props){
    super(props);
    this.state = {
        listProduct: []
    };
  }
  componentDidMount(){
      fetch('http://192.168.1.108/listproducts.php')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
              listProduct: responseJson,
          });
      });
  }
    scrollX = new Animated.Value(0);
    renderDots() {
        const { destinations } = this.props;
        const dotPosition = Animated.divide(this.scrollX, width);
        return (
          <View style={[
            styles.flex, styles.row,
            { justifyContent: 'center', alignItems: 'center', marginTop: -30 }
          ]}>
            {destinations.map((item, index) => {
              const borderWidth = dotPosition.interpolate({
                inputRange: [index -1, index, index + 1],
                outputRange: [0, 2.5, 0],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View
                  key={`step-${item.id}`}
                  style={[styles.dots, styles.activeDot, { borderWidth: borderWidth } ]}
                />
              )
            })}
          </View>
        )
    }
    renderProducts = () => {
        return (
          <View style={[ styles.column, styles.products ]}>
            <FlatList
              horizontal
              pagingEnabled
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              style={{ overflow:'visible', height: 280 }}
              data={this.state.listProduct}
              keyExtractor={(item) => `${item.id}`}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX }} }])}
              renderItem={({ item }) => this.renderProduct(item)}
            />
            {this.renderDots()}
          </View>
        )
    }
    renderProduct = item => {
        const { navigation } = this.props;
        return (
          <TouchableOpacity activeOpacity={0.8} onPress={() => {navigation.navigate('Details', {product: item})} } >
            <ImageBackground
              style={[styles.flex, styles.product, styles.shadow]}
              imageStyle={{ borderRadius: 12 }}
              source={{ uri: item.preview }}
            >
            </ImageBackground>
            <View style={[styles.margin, styles.productInfo, styles.shadow]}>
                <Text style={{ fontSize: 14 * 1.25, fontWeight: '500', paddingBottom: 8, color:'white' }}>
                  {item.name}                   ${item.price}
                </Text>
                
                <View style={ styles.row}>
                  <Text style={{ color: '#FFF' }}>
                    {item.description.split('').slice(0, 20)}...
                  </Text>
                </View>
            </View>
          </TouchableOpacity>
        )
    }  
    renderRecommended = () => {
      return (
        <View style={[styles.flex, styles.column, styles.recommended ]}>
          <View
            style={[
              styles.row,
              styles.recommendedHeader
            ]}
          >
            <Text style={{ fontSize: 18 }}>Recommended</Text>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={{ color: '#BCCCD4' }}>More</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.column, styles.recommendedList]}>
            <FlatList
              horizontal
              pagingEnabled
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              style={[ styles.shadow, { overflow: 'visible' }]}
              data={this.state.listProduct}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item, index }) => this.renderRecommendation(item, index)}
            />
          </View>
        </View>
      );
    }
    renderRecommendation = (item, index) => {
      const {navigation} = this.props;
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Details', {product: item})} >
        <View style={[
          styles.flex, styles.column, styles.recommendation, styles.shadow, 
          index === 0 ? { marginLeft: 36 } : null,
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
    render() {
        return (
          <View
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 36 }}
          >
            {this.renderProducts()}
            {this.renderRecommended()}
          </View>
        )
    }
}
List.defaultProps = {
  destinations: flatListData
};
export default List;
