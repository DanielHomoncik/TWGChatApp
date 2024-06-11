import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RoomListScreen from '../components/RoomListScreen';
import ChatScreen from '../components/ChatScreen';
import { View, StyleSheet } from 'react-native';
import CustomHeader from './CustomHeader'; // Adjust the import path as necessary

export type RootStackParamList = {
  RoomList: undefined;
  Chat: { roomId: string };
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
      <Stack.Navigator initialRouteName="RoomList">
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
    backgroundColor: '#F0F8FF', // Set to your app's main background color
  },
});
