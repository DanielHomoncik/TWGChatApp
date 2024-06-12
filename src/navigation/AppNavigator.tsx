import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoomListScreen from '../components/RoomListScreen';
import ChatScreen from '../components/ChatScreen';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import { View, StyleSheet } from 'react-native';
import CustomHeader from './CustomHeader'; 

export type RootStackParamList = {
  RoomList: undefined;
  Chat: { roomId: string; myId: string };
  Login: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const CustomHeaderWrapper = () => {
  return (
    <View style={styles.headerContainer}>
      <CustomHeader />
    </View>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RoomList"
          component={RoomListScreen}
          options={{
            header: () => <CustomHeaderWrapper />,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            header: () => <CustomHeaderWrapper />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#F0F8FF',
  },
});
