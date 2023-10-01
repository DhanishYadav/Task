import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Snackbar } from 'react-native-paper';
import Loader from "../component/Loader";
const ReportTab = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);

  const onShowSnackBar = () => setVisibleSnackBar(true);
  const onDismissSnackBar = () => setVisibleSnackBar(false);
  const data = [
    { "name": "Dhanish yadav", "class": "Btech", "Age": "21", "Subject": "SDLC" },
    { "name": "John Doe", "class": "MBA", "Age": "25", "Subject": "Marketing" },
    { "name": "Alice Johnson", "class": "PhD", "Age": "30", "Subject": "Computer Science" },
    { "name": "Bob Smith", "class": "BSc", "Age": "22", "Subject": "Mathematics" },
    { "name": "Ella Davis", "class": "MSc", "Age": "24", "Subject": "Physics" },
    { "name": "Michael Brown", "class": "BBA", "Age": "23", "Subject": "Finance" },
    { "name": "Sara Williams", "class": "BA", "Age": "20", "Subject": "English" },
    { "name": "James Wilson", "class": "MSW", "Age": "28", "Subject": "Social Work" },
    { "name": "Olivia Miller", "class": "BSN", "Age": "26", "Subject": "Nursing" },
    { "name": "David Anderson", "class": "LLB", "Age": "29", "Subject": "Law" },
    { "name": "Sophia Lee", "class": "MFA", "Age": "27", "Subject": "Art" }
  ];
  const renderCardItem = ({ item }) => (
    <Card style={[styles.card]}>
      <Card.Content>
        <Title style={[styles.heading, { fontSize: 20, }]}>Student Name: {item.name}</Title>
        <Title style={styles.heading}>Student Age: {item.age}</Title>
        <Paragraph style={styles.date}>Student Class:{item.class}</Paragraph>
        <Paragraph style={styles.timing}>Student Subject:{item.subject}</Paragraph>
      </Card.Content>
    </Card>
  );
  return (
    <>
      <ImageBackground
        source={require('../../../asserts/back.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.mainContainer}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderCardItem}
          />
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
        </View>
      </ImageBackground>
      {isLoading == true && (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 90,
    margin: 10,
  },
  container: {
    flex: 1,
    marginTop: 48,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  card: {
    marginTop: 8,
    marginHorizontal: 10,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
  date: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  timing: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    margin: 8,
    backgroundColor: "white"
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestionItem: {
    padding: 10,
    borderColor: 'grey',
  },
});

export default ReportTab;
