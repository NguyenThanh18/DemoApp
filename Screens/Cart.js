import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import InputSpinner from "react-native-input-spinner";
import { Container, Header, Left, Right, Button, Title } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import * as theme from "../theme";
console.disableYellowBox = true;

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
        marginTop: -400,
        paddingTop: 20,
        flex: 4.7/6,
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    barNext:{
        flex: 1.3/6,
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
        
    },
    /* Cart tag */
    cartTag: {
        position: 'relative',
        backgroundColor: '#fff',
        marginBottom: 10,
        marginHorizontal: 5,
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#eee',
        shadowOpacity: 0.8
    },
    cartCloseTag: {
        position: 'absolute',
        right: '3%',
        top: '6%'
    },
    cartContent: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    cartImageView: {
        flex: 2,
    },
    cartImage: {
        resizeMode: 'cover',
        width: 80,
        height: 100
    },
    cartInfo: {
        flex: 4
    },
    cartName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cartPrice: {
        color: '#B22222',
        fontSize: 16,
        fontWeight: 'bold'
    },
    /* Cart Extra Info */
    
    cartProductInfo: {
        flexDirection: 'row',
        marginBottom: 15
    },
    cartProductRight: {
        flex: 4,
        marginHorizontal: 10
    },
    cartProductTitle: {
        fontStyle: 'italic',
        fontSize: 14
    },
    cartProductNum: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    cartQuantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    cartPriceTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cartSale: {
        flex: 2,
        marginHorizontal: 10
    },
    cartSaleInput: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 5,
        backgroundColor: '#f1f1f1',
        textAlign: 'center',
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    cartOrder: {
        marginHorizontal: 10,
        borderRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: '#eee',
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 3
    },
    cartOrderText: {
        backgroundColor: '#f4511e',
        textAlign: 'center',
        color: '#fff',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    ViewButtonX:{
        marginTop: -75,
        marginLeft: 200,
    },
    buttonX: {
        backgroundColor: theme.colors.white,
        color: theme.colors.black,
    },
    trash: {
    }
 
})

 class CartScreen extends Component{
    async setCart(cart) {
        try {
            await AsyncStorage.setItem('@Cart', JSON.stringify(cart));
            this.setState({
                cart: cart
            });
        } catch (e) {
            // save error
        }
    }
    async getCart() {
        try {
            let cart = await AsyncStorage.getItem('@Cart');
            if (cart != null) {
                this.setState({
                    cart: JSON.parse(cart)
                });
            }
        } catch (e) {
            // read error
        }
    }
    async removeCart() {
        try {
            await AsyncStorage.removeItem('@Cart');
        } catch (e) {
            // read error
        }
    }
    addItemCart(product) {
        // Get current list of products
        let products = this.state.cart.products;
        let idx = this.search(product, this.state.cart.products);
        // Update the total price by quantity * price of the added product
        let totalPrice = this.state.cart.totalPrice + (product.price *
            product.quantity);
        if (idx > -1) {
            products[idx].quantity += 1;
        } else {
            products.push(product);
        }
        // Update the state
        let cart = {
            products: products,
            totalPrice: totalPrice,
        };
        this.setCart(cart);
    }
    editItemCart(product, operation) {
        // Get current list of products
        let products = this.state.cart.products;
        let idx = this.search(product, products);
        let totalPrice = parseInt(this.state.cart.totalPrice);

        if (operation == 'add') {
            totalPrice += parseInt(product.price);
            products[idx].quantity += 1;
        } else if (operation == 'sub') {
            if (products[idx].quantity > 1) {
                totalPrice -= parseInt(product.price);
                products[idx].quantity -= 1;
            }
        }
        // Update the state
        let cart = {
            products: products,
            totalPrice: totalPrice,
        };
        this.setCart(cart);
    }
    removeItemCart(product) {
        let products = this.state.cart.products;
        let idx = this.search(product, products);
        let totalPrice = this.state.cart.totalPrice - (product.price * product.quantity);
        // Remove single item
        products.splice(idx, 1);
        // Update the state
        let cart = {
            products: products,
            totalPrice: totalPrice,
        };
        this.setCart(cart);
    }
    search(product, products) {
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === product.id) {
                return i;
            }
        }
        return -1;
    }
    
    constructor(props) {
        super(props);
        this.state = {
            cart: {
                products: [],
                totalPrice: 0,
            },
            nameInput: '',
            phoneInput: '',
            addressInput: '',
        };
    }
    
    async componentDidMount() {
        
        this.getCart().then(() => {
            let { product } = this.props.route.params;
            if (product != null) {
            this.addItemCart(product);
            }
        } );

    }

    render(){
        console.log(this.props.route.params);
        console.log(this.state.cart.products);
        return(

           <View style={styles.container}>
               <Container >
                        <Header style={styles.headerBar}>
                        <Left>
                            <Title style={[styles.headerText, styles.title]}>My Bag</Title>
                        </Left>
                        <Right>
                            <Title style={[styles.headerText, styles.sub]}>Total item: {this.state.cart.products.length} </Title>
                        </Right>
                        </Header>
                    </Container>
               <ScrollView style={styles.list}>
                <View >
                        {this.state.cart.products != null && this.state.cart.products.length > 0 ? (this.state.cart.products.map((item, key) => {
                            return (
                                <View  key={key} style={styles.item}>
                                    
                                    <View style={styles.leftImage}>
                                        <Image style={styles.image} source={{uri: item.preview}}/>
                                    </View>
                                    <View style={styles.rightInfo}>
                                        
                                        <Text style= {styles.name}>  
                                            {item.name.split('').slice(0, 20)}...
                                        </Text> 
                                        
                                        <Text style= {styles.price}>
                                            ${item.price}    
                                        </Text>
                                        <View style={styles.countBar}>
                                            <InputSpinner
                                                min={1}
                                                step={1}
                                                rounded={false}
                                                showBorder={true}
                                                fontSize={12}
                                                inputStyle={{
                                                    paddingVertical: 5
                                                }}
                                                width={100}
                                                height={30}
                                                value={item.quantity}
                                                onIncrease={(increased) => {
                                                    this.editItemCart(item, 'add')
                                                }}
                                                onDecrease={(decreased) => {
                                                    this.editItemCart(item, 'sub')
                                                }}
                                                style={styles.cartSpinner} />
                                        </View>
                                        <View style={styles.ViewButtonX}>
                                             <TouchableOpacity
                                                style={styles.buttonX}
                                                onPress={() => { this.removeItemCart(item) }}
                                            >
                                                <Icon
                                                    name='md-trash'
                                                    color= {theme.colors.black}
                                                    size= {22}
                                                    style={styles.trash}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                </View>
                                
                            </View>
                            );
                        })) : <Text>Không có sản phẩm trong giỏ hàng</Text>}
                            
                </View>
               </ScrollView>
               <View style={styles.barNext}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.total}>
                            <Text style={{fontSize: 20}}>TOTAL</Text>
                        </View>    
                        <View>
                            <Text style={styles.totalPrice}>${this.state.cart.totalPrice}</Text>
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
export default CartScreen;