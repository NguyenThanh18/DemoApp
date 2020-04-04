import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import flatListData from '../data/flatlistData';
import bannerData from '../data/bannerData';
class CustomHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSoure: new FlatList
        }
    }
    render(){
        return(
            <Container >
                <Header style={{backgroundColor: 'white'}}>
                    <Body >
                        <Title style={{color:'black', fontWeight: "bold", fontSize: 26}}>Discover</Title>
                     </Body>
                     <Right >
                        <View style={style.search}>
                            <Button transparent style={style.button}>
                                <Icon name='md-search' size={24} />
                            </Button>
                        </View>
                    </Right> 
                </Header>
            </Container>           
        );
    }
}
class HomeScreen extends Component {
    constructor(props){
        super(props);

    }
    render(){
      return(
          <View style={styles.container}>
                <View style={styles.banner}>
                <FlatList
                        data={bannerData}
                        renderItem={({item}) => (
                            <View style={styles.productView}>
                                <TouchableOpacity style={styles.productTouch} onPress={() => {this.props.navigation.navigate('Details')}}>
                                    <Image source={{uri: '../data/fd.jpg'}} style={styles.productImage}/>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productPrice}>{item.price} ₫</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        numColumns={2}
                    />
                </View>
                <View style={styles.listProduct}>
                    <FlatList
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        scrollEventThrottle={16}
                        snapToAlignment="center"
                        style={{ overflow:'visible', height: 280 }}
                        data={this.props.destinations}
                        keyExtractor={(item, index) => `${item.id}`}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX }} }])}
                        data={flatListData}
                        renderItem={({item}) => (
                            <View style={styles.productView}>
                                <TouchableOpacity style={styles.productTouch} onPress={() => {this.props.navigation.navigate('Details')}}>
                                    <Image source={{uri: item.image}} style={styles.productImage}/>
                                    <Text style={styles.productName}>{item.name}</Text>
                                    <Text style={styles.productPrice}>{item.price} ₫</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
          </View>
      );
  }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    banner:{
        backgroundColor: 'red',
        flex: 2.5/4
    },
    listProduct:{
        flex: 1.5/4
    },
    productView:{
        width: 170,
        paddingLeft: 10,
        padding: 2,
    },
    productTouch:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginLeft: 10,
        marginBottom: 10,
        margin: 3,
        borderRadius: 10,
    },
    productImage:{
        width: 120,
        height: 100,
        marginTop: 10,
        marginBottom: 15,
    },
    productName: {
    },
    productPrice: {
        marginBottom: 5
    }
})

export default HomeScreen;