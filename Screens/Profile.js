import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeProvider } from 'react-native-paper';
const { width, height } = Dimensions.get('window');
import * as theme from '../theme';
export default class ProfileScreen extends Component{
    render(){
        const { route } = this.props;
        const { Email } = route.params;
        return(
            <View
                style={styles.container}
            >
               <View style={styles.image}>
                    <Image
                        source={{uri: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}}
                        style={{ width, height: 250 }}
                        resizeMode='cover'
                    />
                    <TouchableOpacity style={styles.buttonAdd}>
                        <View style={styles.buttonAddImage}>
                            <Icon name="plus" size={25}/>
                            <Text style={styles.title}>Upload</Text>
                        </View>
                    </TouchableOpacity>
               </View>
               <View style={styles.data}>
                    <Text style={styles.text}>
                        {Email}
                    </Text>
                    <Text style={styles.text}>
                    </Text>
               </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f1f2f6',
        backgroundColor: theme.colors.white,
    },
    buttonAddImage: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonAdd:{
        borderColor: theme.colors.gray,
        borderWidth: 1,
        width: 100,
        top: -27
    },
    title:{

    },
    text:{
        borderWidth: 0.5,
        borderTopColor: theme.colors.gray,
        padding: 10,
        color: theme.colors.black,
    }
})