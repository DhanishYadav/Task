import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Button, Text, TextInput, Snackbar, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterPage = () => {
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [snackBarText, setSnackBarText] = useState('');
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const onShowSnackBar = () => setVisibleSnackBar(true);
  const onDismissSnackBar = () => setVisibleSnackBar(false);
  useEffect(() => {
    loginNavigation();
  }, []);
  const loginNavigation = async () => {
    const storedName = await AsyncStorage.getItem("@name");
    const storedEmail = await AsyncStorage.getItem("@email");
    const storedGender = await AsyncStorage.getItem("@gender");
    const storedPhone = await AsyncStorage.getItem("@phone");
    const storedAge = await AsyncStorage.getItem("@age");
    const password = await AsyncStorage.getItem("@password");
    const addressKeys = ["@pin", "@state", "@city"];
    const addressValues = await AsyncStorage.multiGet(addressKeys);
    const storedAddress = addressValues.map(([key, value]) => value).join(", ");
    setUserName(storedName || "");
    setEmail(storedEmail || "");
    setGender(storedGender || "");
    setPhone(storedPhone || "");
    setAge(storedAge || "");
    setAddress(storedAddress || "");
  };
  const PassValidation = async () => {
    if (password === null || password === '') {
      setSnackBarText('Please enter Password');
      setVisibleSnackBar(true);
    }
    else {
      setSnackBarText('Password Create Successfully');
      setVisibleSnackBar(true);
      await AsyncStorage.setItem("@password",password);
      setPassword("");
      navigation.navigate("Login")
    }
  }
  const validatePassword = (value) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()-_=+[\]{};:'",.<>?/\\|]/.test(value);
    if (value.length < minLength || !hasUpperCase || !hasNumber || !hasLetter || !hasSpecialCharacter) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
    setPassword(value);
  };
  return (
    <>
    <ImageBackground
      source={require('../../../asserts/back.png')}
      style={styles.backgroundImage}
    >
      <ScrollView>
        <View style={styles.mainContainer}>
          <Card style={styles.card}>
            <Text style={styles.textstyle}>{userName}</Text>
            <Card.Content style={{ flexDirection: "row" }}>
              <Text style={styles.cardLabel}>Email:</Text>
              <Text style={{ marginLeft: 60, fontWeight: "bold", fontSize: 16, color: "gray" }}>{email}</Text>
            </Card.Content>
            <Card.Content style={{ flexDirection: "row" }}>
              <Text style={styles.cardLabel}>Phone</Text>
              <Text style={{ marginLeft: 60, fontWeight: "bold", fontSize: 16, color: "gray" }}>{phone}</Text>
            </Card.Content>
            <Card.Content style={{ flexDirection: "row" }}>
              <Text style={styles.cardLabel}>Gender</Text>
              <Text style={{ marginLeft: 55, fontWeight: "bold", fontSize: 16, color: "gray" }}>{gender}</Text>
            </Card.Content>
            <Card.Content style={{ flexDirection: "row" }}>
              <Text style={styles.cardLabel}>Age</Text>
              <Text style={{ marginLeft: 77, fontWeight: "bold", fontSize: 16, color: "gray" }}>{age}</Text>
            </Card.Content>

            <Card.Content style={{ flexDirection: "row" }}>
              <Text style={styles.cardLabel}>Address</Text>
              <Text style={{ marginLeft: 50, fontWeight: "bold", fontSize: 14, color: "gray", flexWrap:"wrap",}}>{address}</Text>
            </Card.Content>
          </Card>
          <TextInput
            label="Create Password"
            left={<TextInput.Icon icon="lock" size={20} color="#5d6fe2" />}
            mode="outlined"
            style={styles.inputStyle}
            value={password}
            maxLength={8}
            outlineColor={isValid ? "#5d6fe2" : "red"}
            onChangeText={(value) => validatePassword(value)}
          />
          {!isValid && (
            <Text style={{ color: 'red' }}>
              Password must be at least 8 characters long and contain 1 
              uppercase character, 1 number,1 character and 1 special character.
            </Text>
          )}
          <Button
            mode="contained"
            icon="login"
            style={styles.buttonstyle2}
            onPress={PassValidation}
          >
            Create Password
          </Button>
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
        }}
      >
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
    marginTop: 90,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  card: {
    marginVertical: 5,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: "white"
  },
  cardLabel: {
    fontWeight: 'bold',

  },
  textstyle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5d6fe2',
    marginHorizontal: 20,
    alignSelf: "center",
    marginBottom: 10,
  },
  inputStyle: {
    marginTop: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  buttonstyle2: {
    marginTop: 20,
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: '#fda102',
    padding: 3,
  },
  snackBar: {
    backgroundColor: '#5d6fe2',
  },
});

export default RegisterPage;
