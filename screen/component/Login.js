import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import { Card, Button, Text, TextInput, TouchableRipple, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';
const Login = () => {
  const navigation = useNavigation();
  const [isloading, setIsLoading] = useState(false);
  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [snackBarText, setSnackBarText] = useState('');
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const onShowSnackBar = () => setVisibleSnackBar(true);
  const onDismissSnackBar = () => setVisibleSnackBar(false);

  const LoginUser = async () => {
    const Email = await AsyncStorage.getItem('@email');
    const Password = await AsyncStorage.getItem('@password');
    if (Email == email && Password == password) {
      setSnackBarText('Login Successfully');
      setVisibleSnackBar(true);
      navigation.navigate("DrawerNavigation")
    }
    else {
      setSnackBarText('Inavild Password&Email', Email, Password);
      setVisibleSnackBar(true);
    }
  };
  useEffect(() => {
    checkForSession();
  }, []);
  const registerNavigation = () => {
    navigation.navigate("RegisterPage")
  }
  const checkForSession = async () => {
    setIsLoading(true);
    const Email = await AsyncStorage.getItem('@email');
    console.log(Email,"Email")
    const Password = await AsyncStorage.getItem('@password');
    console.log(Password,"Password")
    if (Email !== null && Password !== null) {
      setIsLoading(false);
      navigation.replace('DrawerNavigation');
    }
    setIsLoading(false);
  };

  const loginFormValidate = async () => {
    if (email === null || email === '') {
      setSnackBarText('Please enter Email');
      setVisibleSnackBar(true);
    } else if (password === null || password === '') {
      setSnackBarText('Please enter password');
      setVisibleSnackBar(true);
    } else {
      LoginUser();
      setPassword('');
      setUserName('');
    }
  };
  return (
    <>
      <ImageBackground
        source={require('../../../asserts/back.png')}
        style={styles.backgroundImage}>
        <View style={styles.mainContainer}>
          <Card style={styles.cardStyle}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('../../../asserts/logo4.png')} style={{ height: 100, width: 120, resizeMode: 'contain' }} />
            </View>
            <Text style={styles.textstyle}>Sign In</Text>
            <TextInput
              label="Email"
              left={<TextInput.Icon icon="account" size={20} color="#5d6fe2" />}
              mode="outlined"
              placeholder='Enter Email'
              style={styles.inputStyle}
              value={email}
              outlineColor="#5d6fe2"
              activeOutlineColor="#5d6fe2"
              onChangeText={(value) => setUserName(value)}
            />
            <TextInput
              label="Password"
              autoCorrect={false}
              maxLength={8}
              mode="outlined"
              placeholder='Enter Password'
              value={password}
              outlineColor="#5d6fe2"
              activeOutlineColor="#5d6fe2"
              onChangeText={(value) => setPassword(value)}
              style={styles.inputStyle}
              left={<TextInput.Icon icon="lock" size={20} color="#5d6fe2" />}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableRipple>
                <Button mode="contained" icon="login" style={styles.buttonstyle} onPress={loginFormValidate}>
                  Sign In
                </Button>
              </TouchableRipple>
              <TouchableRipple>
                <Button mode="contained" icon="login" style={styles.buttonstyle2} onPress={registerNavigation}>
                  Sign Up
                </Button>
              </TouchableRipple>
            </View>

          </Card>
          <Snackbar
            visible={visibleSnackBar}
            onDismiss={onDismissSnackBar}
            style={styles.snackBar}
            action={{
              label: 'Dismiss',
              onPress: () => {
                onDismissSnackBar();
              },
            }}>
            {snackBarText}
          </Snackbar>
        </View>
        {isloading == true && (
          <>
            <Loader />
          </>
        )}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  cardStyle: {
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 15,
    height: 380,
  },
  inputStyle: {
    marginTop: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  textstyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5d6fe2',
  },
  buttonstyle: {
    marginTop: 20,
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: '#5d6fe2',
    padding: 3,
    marginLeft: 3,
    width: "130%",
  },
  buttonstyle2: {
    marginTop: 20,
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: '#fda102',
    padding: 3,
    marginLeft: 60,
    width: "86%",
  },
  snackBar: {
    backgroundColor: '#5d6fe2',
  },
});
export default Login;
