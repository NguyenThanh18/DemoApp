import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base';
import * as theme from "../theme";
import flatListData from "../data/flatlistData";


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    headerBar:{
        backgroundColor: theme.colors.white,
    },
    headerText:{
        color: theme.colors.black,
    }, 
    title:{
        fontWeight: "bold",
        fontSize: theme.sizes.title,
        fontFamily: 'Verdana'
    } ,
    sub:{
        fontSize: 15,
    },
    list:{
        flex: 5/6,
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    barNext:{
        flex: 1/6,
        borderTopColor: theme.colors.gray,
    },
    item:{
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 20,
        backgroundColor: theme.colors.white,
        
    },
    leftImage:{
       marginRight: 10
    },
    image:{
        width: 120,
        height: 100,
        borderRadius: theme.sizes.radius,
    },
    rightInfo:{

    },
    name:{
        
    },
    price:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    countBar:{
        flexDirection: 'row',
    },
    button:{
        backgroundColor: theme.colors.gray,
        width: 30,
        justifyContent: 'center',
        alignItems: "center",
    },
    total:{
        marginRight: 250,
        fontSize: 20,
        marginLeft: 10
    },
    totalPrice:{
        textAlign: 'right',
        fontSize: 22,
        fontWeight: 'bold',
    },
    buttonNext:{
        backgroundColor: theme.colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: theme.sizes.radius,
        
    }
})

export default class CartScreen extends Component{
    renderItem = (item, index) => {
        return (
          <View style={styles.item}>
              <View style={styles.leftImage}>
                <Image style={styles.image} source={{uri: item.preview}}/>
              </View>
              <View style={styles.rightInfo}>
                <Text style= {styles.name}>  
                    {item.fullName.split('').slice(0, 20)}...
                </Text> 
                <Text style= {styles.price}>
                    ${item.price}    
                </Text>
                <View style={styles.countBar}>
                    <TouchableOpacity style={styles.button}>
                        <Text> - </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20}}> 1 </Text>
                    <TouchableOpacity style={styles.button}>
                        <Text> + </Text>
                    </TouchableOpacity>
                </View>
              </View>
          </View>
        )
    }
    render(){
        return(
           <View style={styles.container}>
               <View style={styles.list}>
                    <Container >
                        <Header style={styles.headerBar}>
                        <Left>
                            <Title style={[styles.headerText, styles.title]}>My Bag</Title>
                        </Left>
                        <Right>
                            <Title style={[styles.headerText, styles.sub]}>Total 4 items</Title>
                        </Right>
                        </Header>
                    </Container>
                    <View>
                        <FlatList
                            data={flatListData}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                        />
                    </View>
               </View>
               <View style={styles.barNext}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.total}>
                            <Text style={{fontSize: 20}}>TOTAL</Text>
                        </View>    
                        <View>
                            <Text style={styles.totalPrice}>$420</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonNext}
                    >
                        <Text style={{color: theme.colors.white, fontSize: 20}}>
                            Next
                        </Text>
                    </TouchableOpacity>
               </View>
           </View>
        );
    }
}