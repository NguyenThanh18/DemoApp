import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert } from 'react-native';
import * as theme from '../../theme';
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/AntDesign';
const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.blue
    },
    slide2: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ee5253'
    },
    slide3: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.colors.green,
    },
    slideLogin: {
        flex: 1,
        backgroundColor: theme.colors.red,
    },
    text: {
        paddingTop: 100,
        paddingBottom: 100,
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    container:{
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },
    button: {
        width:300,
        backgroundColor:'#B53471',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color: theme.colors.white,
        textAlign:'center'
    },
    signupTextCont:{
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    },
    logo:{
        margin: 20,
    },
    logoText:{
        color:'rgba(255,255,255,0.6)',  
        margin: 20,
    }
  })
  
  export default class LoginScreen extends Component {
    constructor(props) {
 
        super(props)
     
        this.state = {
     
          UserEmail: '',
          UserPassword: ''
     
        }
     
      }

   UserLoginFunction = () =>{
    if(this.state.UserEmail !== '' && this.state.UserPassword !== ''){

    
    const { UserEmail }  = this.state ;
    const { UserPassword }  = this.state ;
    
    
   fetch('http://10.128.126.219/User_Login.php', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    
       email: UserEmail,
    
       password: UserPassword
    
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
    
           // If server response message same as Data Matched
          if(responseJson === 'Data Matched')
           {
    
               //Then open Profile activity and send user email to profile activity.
               this.props.navigation.navigate('Home', { Email: UserEmail });
               
    
           }
           else{
                Alert.alert(responseJson);
           }
    
         }).catch((error) => {
           console.error(error);
         });
       }else{
           alert('Vui lòng nhập lại');
       } 
     }  
    renderLogin (){
        const {navigation} = this.props
        return(
			<View style={styles.container}>
                <View style={styles.logo}>
                    <Icon name='dingding' size={150} color={theme.colors.white}/> 
                    <Text style={styles.logoText}>Chào mừng đến với MyShop</Text>
                </View>
                <TextInput
                    onChangeText={UserEmail => this.setState({UserEmail})}
                    style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder='Email'
                    placeholderTextColor = {theme.colors.white}
                    selectionColor="#ff9f43"
                    keyboardType="email-address"
                />
                <TextInput style={styles.inputBox} 
                    onChangeText={UserPassword => this.setState({UserPassword})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor = {theme.colors.white}
                    ref={(input) => this.password = input}
                />
                <TouchableOpacity style={styles.button} onPress={() =>  {this.UserLoginFunction()}}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Don't have an account yet?</Text>
					<TouchableOpacity 
                        onPress={() => {navigation.navigate('Register')}}
                    ><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
                </View>
  		    </View>
		)
	}
    render() {
      return (
    
            <View style={styles.slideLogin}>
                {this.renderLogin()}
            </View>
      )
    }
  }  