import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const API_KEY = '8c4ad341a01a4d468cd155754232809';
const API_BASE_URL = 'https://api.weatherapi.com/v1/current.json';

const WeatherApp = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}?key=${API_KEY}&q=${city}&aqi=no&units=metric`
        );
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
        } else {
          setError(data.error.message);
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  const refreshWeather = () => {
    setLoading(true);
    setError(null);
    fetchWeatherData();
  };

  const renderWeatherInfo = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    } else if (error) {
      return <Text>Error: {error}</Text>;
    } else if (weatherData) {
      const { current } = weatherData;
      const temperature = current.temp_c;
      const weatherCondition = current.condition.text;
      const iconURL = `https:${current.condition.icon}`;

      return (
        <View>
          <Text>{city}</Text>
          <Text>Temperature: {temperature}°C</Text>
          <Text>Condition: {weatherCondition}</Text>
          <Image source={{ uri: iconURL }} style={styles.weatherIcon} />
        </View>
      );
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={refreshWeather}>
        <Text>Refresh Weather</Text>
      </TouchableOpacity>
      {renderWeatherInfo()}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

export default WeatherApp;
