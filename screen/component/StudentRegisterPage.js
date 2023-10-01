import React, { useState, useEffect } from 'react';
import {
     View,
     StyleSheet,
     ImageBackground,
     PermissionsAndroid,
     ScrollView,
     TouchableOpacity,
     Image,
} from 'react-native';
import { Button, Text, TextInput, TouchableRipple, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Header from './Header';
const RegisterPage = () => {
     const navigation = useNavigation();
     const [jsonData, setJsonData] = useState("");
     const [isloading, setIsLoading] = useState(false);
     const [email, setEmail] = useState('');
     const [gender, setGender] = useState('');
     const [userName, setUserName] = useState('');
     const [cameraPhoto, setCameraPhoto] = useState();
     const [galleryPhoto, setGalleryPhoto] = useState();
     const [subject, setSubject] = useState('');
     const [studentClass, setStudentClass] = useState('');
     const [age, setAge] = useState('');
     const [snackBarText, setSnackBarText] = useState('');
     const [visibleSnackBar, setVisibleSnackBar] = useState(false);
     const onShowSnackBar = () => setVisibleSnackBar(true);
     const onDismissSnackBar = () => setVisibleSnackBar(false);
     const [isCameraActive, setIsCameraActive] = useState(false);
     const [isGalleryActive, setIsGalleryActive] = useState(false);
     const loginFormValidate = async () => {
          if (userName === null || userName === '') {
               setSnackBarText('Please Enter Student Name');
               setVisibleSnackBar(true);
          } else if (subject === null || subject === '') {
               setSnackBarText('Please Enter Subject Name');
               setVisibleSnackBar(true);
          }
          else if (studentClass === null || studentClass === '') {
               setSnackBarText('Please Enter studentClass');
               setVisibleSnackBar(true);
          }
          else if (gender === null || gender === '') {
               setSnackBarText('Please Enter Gender');
               setVisibleSnackBar(true);
          }
          else {
               setSnackBarText('Registration SuccessFully');
               setVisibleSnackBar(true);
               saveData();
               setGender("");
               setUserName(""); 
               setStudentClass("");
               setSubject("");
               navigation.navigate("StudentDetails")
          }
     };
     let options = {
          saveToPhotos: true,
          mediaType: "photo"
     }
     const openCamera = async () => {
          const granted = await PermissionsAndroid.request(
               PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               const result = await launchCamera(options);
               setCameraPhoto(result.assets[0].uri);
          }
          setIsCameraActive(true);
          setIsGalleryActive(false);
     }
     const GalleryPhoto = async () => {
          const result = await launchImageLibrary(options);
          setGalleryPhoto(result.assets[0].uri);
          setIsGalleryActive(true);
          setIsCameraActive(false);
     }
     const saveData = async () => {
          await AsyncStorage.setItem("@name", userName);
          await AsyncStorage.setItem("@studentClass",studentClass );
          await AsyncStorage.setItem("@StudentGender", gender);
          await AsyncStorage.setItem("@subject",subject);
          await AsyncStorage.setItem("@cameraPhoto",cameraPhoto);
          await AsyncStorage.setItem("@galleryPhoto",galleryPhoto);
     }
     return (
          <>
               <ImageBackground
                    source={require('../../../asserts/back.png')} // Replace with your image path
                    style={styles.backgroundImage}>
                    <ScrollView>
                         <View style={styles.mainContainer}>
                              <Text style={styles.textstyle}>Sign Up</Text>
                              <View style={{ flexDirection: "row", alignSelf: "center", }}>
                                   <TouchableOpacity style={styles.camera} onPress={openCamera}>
                                        <Image style={{
                                             height: 40, width: 40, resizeMode: "cover",
                                             alignSelf: "center", borderRadius: 10
                                        }}
                                             source={require('../../../asserts/camera.png')} />
                                   </TouchableOpacity>
                                   {isCameraActive && (
                                        <Image style={{ height: 100, width: 100, resizeMode: "cover", alignSelf: "center", borderRadius: 10 }} source={{ uri: cameraPhoto }} />
                                   )}
                                   {isGalleryActive && (
                                        <Image style={{ height: 100, width: 100, resizeMode: "cover", alignSelf: "center", borderRadius: 10 }} source={{ uri: galleryPhoto }} />
                                   )}
                                   <TouchableOpacity style={styles.gallery} onPress={GalleryPhoto}>
                                        <Image style={{
                                             height: 40, width: 40, resizeMode: "cover",
                                             alignSelf: "center", borderRadius: 10
                                        }}
                                             source={require('../../../asserts/gallery.jpg')} />
                                   </TouchableOpacity>

                              </View>
                              <TextInput
                                   label="Student Name"
                                   left={<TextInput.Icon icon="account" size={20} color="#5d6fe2" />}
                                   mode="outlined"
                                   style={styles.inputStyle}
                                   value={userName}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setUserName(value)}
                              />
                              <TextInput
                                   label="Class"
                                   left={<TextInput.Icon icon="email" size={20} color="#5d6fe2" />}
                                   mode="outlined"
                                   style={styles.inputStyle}
                                   value={studentClass}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setStudentClass(value)}
                              />
                              <TextInput
                                   label="Gender"
                                   left={<TextInput.Icon icon="gender-male" size={20} color="#5d6fe2" />}
                                   mode="outlined"
                                   style={styles.inputStyle}
                                   value={gender}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setGender(value)}
                              />
                              <TextInput
                                   label="Subject"
                                   autoCorrect={false}
                                   maxLength={50}
                                   mode="outlined"
                                   placeholder='Please Enter Subject Name'
                                   value={subject}
                                   outlineColor="#5d6fe2"
                                   activeOutlineColor="#5d6fe2"
                                   onChangeText={(value) => setSubject(value)}
                                   style={styles.inputStyle}
                                   left={<TextInput.Icon icon="subtitles" size={20} color="#5d6fe2" />}
                              />

                              <TouchableRipple>
                                   <Button mode="contained" icon="login" style={styles.buttonstyle2} onPress={loginFormValidate}>
                                        Save
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
     camera: {
          alignSelf: "center",
          marginHorizontal: 6,
          color: "gray"
     },
     gallery: {
          alignSelf: "center",
          marginHorizontal: 6,
          color: "red"
     }
});
export default RegisterPage;
