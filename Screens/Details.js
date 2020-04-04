
import React, { Component } from 'react';
import { Text, StyleSheet, View, Animated, Image, Dimensions, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import * as theme from '../theme';
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
    header: {
      paddingHorizontal: theme.sizes.padding,
      paddingTop: theme.sizes.padding,
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    back: {
      width: theme.sizes.base * 3,
      height: theme.sizes.base * 3,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    content: {
    },
    contentHeader: {
      backgroundColor: 'transparent',
      height: 320,
      padding: theme.sizes.padding,
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: theme.sizes.radius,
      borderTopRightRadius: theme.sizes.radius,
      marginTop: -theme.sizes.padding / 2,
    },
    height:{
      height: 500
    },
    shadow: {
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    dotsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 36,
      right: 0,
      left: 0
    },
    dots: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 6,
      backgroundColor: theme.colors.gray,
    },
    fullName: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    price:{
      fontSize: 18,
      fontWeight: 'bold',
    },
    description: {
      fontSize: theme.sizes.font,
      color: theme.colors.caption,
      paddingBottom: 0,
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
    button: {
      flex: 1,
      padding: 14,
      alignContent: "center",
      alignItems: "center"
    },
    buttonText: {
      textAlign: "center",
      fontWeight: "500"
    },
    last: {
      borderTopRightRadius: 13,
      borderBottomRightRadius: 13
    },
    group: {
      flexDirection: "row",
      borderRadius: 14,
      borderWidth: 1,
      borderColor: "#FF7657",
      justifyContent: "space-between"
    },
    first: {
      borderTopLeftRadius: 13,
      borderBottomLeftRadius: 13
    },
    active: {
      backgroundColor: '#e91e63',
    },
    activeText: {
      color: '#FFF'
    },
    buttonAddToCart:{
      marginTop: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    section:{
      position: "absolute",
      width: width,
      paddingHorizontal: 35,
      marginTop: 420
    }
  });
class DetailsScreen extends Component{
      
      scrollX = new Animated.Value(0);
      addToCart(product) {
        let productAdd = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        }
        this.props.navigation.navigate('Cart', {
            product: productAdd,
        });
      }
  
      //hàm tạo dấu chấm
      renderDots = () => {
        const { route } = this.props;
        const { product } = route.params;
        const dotPosition = Animated.divide(this.scrollX, width);
    
        return (
          <View style={[ styles.flex, styles.row, styles.dotsContainer ]}>
            {product.images.map((item, index) => {
              const opacity = dotPosition.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View
                  key={`step-${item}-${index}`}
                  style={[styles.dots, { opacity }]}
                />
              )
            })}
          </View>
        )
      }
      render() {
        const { route } = this.props;
        const { product } = route.params;
    
        return (
          <View style={styles.flex}>
            <View style={[styles.flex]}>
              <ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
              >
              {
                product.images.map((img, index) => 
                  <Image
                    key={`${index}-${img}`}
                    source={{ uri: img }}
                    resizeMode='cover'
                    style={{ width, height: 250 }}
                  />
                )
              }
              </ScrollView>
              {/* dùng hàm con*/}
              {this.renderDots()}
            </View>
            <View style={[styles.flex, styles.content]}>
              <View style={[styles.flex, styles.contentHeader]}>
                <Text style={styles.fullName}>{product.fullName}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <Text style={styles.description}>{product.description}</Text>
                
              </View>
              
            </View>
            <View style={[styles.section, styles.flex]}>
                  <View>
                    <Text style={styles.title}>Size</Text>
                  </View>
                  <View style={styles.group}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        styles.first,
                        styles.active,
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          styles.activeText
                        ]}
                      >
                        7
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                        ]}
                      >
                        8
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                        ]}
                      >
                        9
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        styles.last,
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                        ]}
                      >
                        10
                      </Text>
                  </TouchableOpacity>
                </View>
                    <View style={[styles.buttonAddToCart, styles.group]}>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        styles.first,
                        styles.last,
                        styles.active
                      ]}
                      onPress={() => { this.addToCart(pictuerDetail) }}
                      >
                    <Text
                      style={[
                        styles.buttonText,
                        styles.activeText
                      ]}
                    >
                      ADD TO BAG
                    </Text>
                </TouchableOpacity>
                  </View>
                </View>
          </View>
        );
      }
}
export default DetailsScreen;