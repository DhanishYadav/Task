import { View, Text, Dimensions, StyleSheet, Alert, Image } from 'react-native'
import React from 'react'
import { IconButton, TouchableRipple } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Header = (props) => {
    const navigation = useNavigation();
    const Logout = async () => {
        try {
            await AsyncStorage.removeItem('@email');
            await AsyncStorage.removeItem('@password');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    const handleLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        Logout();
                    },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <>
            {props.isback == true ? <View style={{ backgroundColor: "#5d6fe2", height: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                    <View style={{ marginRight: 0 }}>
                        <IconButton
                            icon="logout"
                            iconColor={'white'}
                            size={21}
                            style={{ height: 23, width: 23 }}
                            onPress={handleLogout}
                        />
                    </View>
                </View>
            </View> : <View style={{ backgroundColor: "#5d6fe2", height: 60 }}>
                <View style={{ flexDirection: 'row', justifyContent: "flex-end", width: '100%' }}>
                    <View style={{ marginTop: 5, }}>
                        <Text style={styles.headerText}>{props.name}</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <IconButton
                            icon="logout"
                            iconColor={'white'}
                            size={23}
                            style={{ height: 23, width: 23, marginLeft: 30 }}
                            onPress={handleLogout} />
                    </View>
                </View>
            </View>
            }
        </>
    )
}
const styles = StyleSheet.create({
    headerText: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: '5%',
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '400',

    },

    buttonstyle: {
        height: 30,
        width: 18,
        color: "blue",
        backgroundColor: "white"
    }
})
export default Header;
