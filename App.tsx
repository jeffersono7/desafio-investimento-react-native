import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './src/app/Header';
import Investimentos from './src/app/Investimentos';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Resgate from './src/app/Resgate';
require('./src/app/prototypes');

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style='light' />
        <Header title='Resgate' />

        <Stack.Navigator>
          <Stack.Screen name='Investimentos' component={Investimentos} />

          <Stack.Screen name='Resgate' component={Resgate} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
