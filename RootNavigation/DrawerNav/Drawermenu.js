import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const DrawerMenu = (props) => {
    const navigation = useNavigation();
    const [utId, setUtId] = useState('');
    const [userName, setUserName] = useState('');
    const [age, setAge] = useState('');

    const Profile = async () => {
        const storedName = await AsyncStorage.getItem("@name");
        const storedAge = await AsyncStorage.getItem("@age");
        setUserName(storedName || "");
        setAge(storedAge || "");
    }
    useEffect(() => {
        Profile();
    }, [])
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
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#fff" }}>
                <ImageBackground source={require("../../../asserts/header5.jpg")} style={{ padding: 10, height: 170, width: 300, marginTop: -4 }}>
                    <Text style={{ color: "white", fontSize: 12, fontWeight: "bold", alignSelf: "flex-end", paddingRight: 13 }}>Version : 2.1</Text>
                    <Image source={require("../../../asserts/user-profile.jpg")} style={{ height: 60, width: 60, borderRadius: 40, marginBottom: 10 }} />
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>{userName}</Text>
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>{age}</Text>
                </ImageBackground>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={{ borderTopWidth: 0.5, borderColor: "black", marginBottom: 100 }}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={{ marginHorizontal: 20, fontWeight: "700", fontSize: 20 }}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default DrawerMenu;
