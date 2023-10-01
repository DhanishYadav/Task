import React, { useState, useEffect } from 'react';
import {
     View,
     StyleSheet,
     ImageBackground,
     PermissionsAndroid,
     ScrollView,
} from 'react-native';
import { Button, Text, TextInput, TouchableRipple, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';;
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterPage = () => {
     const navigation = useNavigation();
     const [isloading, setIsLoading] = useState(false);
     const [email, setEmail] = useState('');
     const [gender, setGender] = useState('');
     const [userName, setUserName] = useState('');
     const [phone, setPhone] = useState('');
     const [pin, setPin] = useState('');
     const [age, setAge] = useState('');
     const [state, setState] = useState('');
     const [city, setCity] = useState('');
     const [snackBarText, setSnackBarText] = useState('');
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
     const onShowSnackBar = () => setVisibleSnackBar(true);
     const onDismissSnackBar = () => setVisibleSnackBar(false);
     const loginFormValidate = async () => {
          if (userName === null || userName === '') {
               setSnackBarText('Please Enter First & Last Name');
               setVisibleSnackBar(true);
          } else if (phone === null || phone === '') {
               setSnackBarText('Please Enter Phone Number');
               setVisibleSnackBar(true);
          }
          else if (pin === null || pin === '') {
               setSnackBarText('Please Enter Pin Number');
               setVisibleSnackBar(true);
          }
          else if (gender === null || gender === '') {
               setSnackBarText('Please Enter Gender');
               setVisibleSnackBar(true);
          }
          else if (city === null || city === '') {
               setSnackBarText('Please Enter City');
               setVisibleSnackBar(true);
          }
          else if (age === null || age === '') {
               setSnackBarText('Please Enter Age');
               setVisibleSnackBar(true);
          }
          else if (email === null || email === '') {
               setSnackBarText('Please Enter Email Number');
               setVisibleSnackBar(true);
          }
          else if (state === null || state === '') {
               setSnackBarText('Please Enter State');
               setVisibleSnackBar(true);
          }
          else {
               saveData();
               setAge("");
               setCity("");
               setEmail("");
               setGender("");
               setPhone("");
               setPin("");
               setState("");
               setUserName(""); 
               navigation.navigate("DrawerNavigation")
          }
     };
     const saveData = async () => {
          await AsyncStorage.setItem("@name", userName);
          await AsyncStorage.setItem("@email", email);
          await AsyncStorage.setItem("@pin", pin);
          await AsyncStorage.setItem("@state", state);
          await AsyncStorage.setItem("@gender", gender);
          await AsyncStorage.setItem("@city", city);
          await AsyncStorage.setItem("@age", age);
          await AsyncStorage.setItem("@phone", phone);
     }
     return (
          <>
               <ImageBackground
                    source={require('../../../asserts/back.png')} // Replace with your image path
                    style={styles.backgroundImage}>
                    <ScrollView>
                         <View style={styles.mainContainer}>

                              <Text style={styles.textstyle}>Sign Up</Text>
                              <TextInput
                                   label="First & Last Name"
                                   left={<TextInput.Icon icon="account" size={20} color="#5d6fe2" />}
                                   mode="outlined"
                                   style={styles.inputStyle}
                                   value={userName}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setUserName(value)}
                              />
                              <TextInput
                                   label="Email Address"
                                   left={<TextInput.Icon icon="email" size={20} color="#5d6fe2" />}
                                   mode="outlined"
                                   style={styles.inputStyle}
                                   value={email}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setEmail(value)}
                              />
                              <TextInput
                                   label="Phone Number"
                                   left={<TextInput.Icon icon="phone" size={20} color="#5d6fe2" />}
                                   mode="outlined"
                                   style={styles.inputStyle}
                                   value={phone}
                                   maxLength={10}
                                   keyboardType={'numeric'}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setPhone(value)}
                              />
                              <TextInput
                                   label="Gender"
                                   left={<TextInput.Icon icon="account" size={20} color="#5d6fe2" />}
                                   mode="outlined"
                                   style={styles.inputStyle}
                                   value={gender}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setGender(value)}
                              />
                              <TextInput
                                   label="Age"
                                   autoCorrect={false}
                                   maxLength={30}
                                   mode="outlined"
                                   value={age}
                                   keyboardType={'numeric'}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setAge(value)}
                                   style={styles.inputStyle}
                                   left={<TextInput.Icon icon="lock" size={20} color="#5d6fe2" />}
                              />
                              <TextInput
                                   label="City"
                                   autoCorrect={false}
                                   maxLength={30}
                                   mode="outlined"
                                   value={city}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setCity(value)}
                                   style={styles.inputStyle}
                                   left={<TextInput.Icon icon="image-album" size={20} color="#5d6fe2" />}
                              />
                              <TextInput
                                   label="State"
                                   autoCorrect={false}
                                   maxLength={30}
                                   mode="outlined"
                                   value={state}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setState(value)}
                                   style={styles.inputStyle}
                                   left={<TextInput.Icon icon="steam" size={20} color="#5d6fe2" />}
                              />
                              <TextInput
                                   label="Pin Code"
                                   autoCorrect={false}
                                   maxLength={6}
                                   mode="outlined"
                                   value={pin}
                                   keyboardType={'numeric'}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setPin(value)}
                                   style={styles.inputStyle}
                                   left={<TextInput.Icon icon="pin" size={20} color="#5d6fe2" />}
                              />
                              <TouchableRipple>
                                   <Button mode="contained" icon="login" style={styles.buttonstyle2} onPress={loginFormValidate}>
                                        Sign Up
                                   </Button>
                              </TouchableRipple>
                         </View>
                    </ScrollView>
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
          marginTop: 120
     },
     backgroundImage: {
          flex: 1,
          resizeMode: 'cover',
     },
     inputStyle: {
          marginTop: 6,
          fontSize: 16,
          backgroundColor: '#fff',
          marginHorizontal: 20,
     },
     textstyle: {
          fontSize: 25,
          fontWeight: 'bold',
          color: '#5d6fe2',
          marginHorizontal: 20,
     },
     buttonstyle2: {
          marginTop: 20,
          fontSize: 18,
          borderRadius: 10,
          backgroundColor: '#fda102',
          padding: 3,
          marginHorizontal: 20,
     },
     snackBar: {
          backgroundColor: '#5d6fe2',
     },
});
export default RegisterPage;
