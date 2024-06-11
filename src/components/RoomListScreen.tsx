import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ROOMS } from '../graphql/queries';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Svg, { Path, Circle, Defs, ClipPath, G } from 'react-native-svg';
type RoomsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RoomList'>;

type Props = {
  navigation: RoomsScreenNavigationProp;
};

type Room = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  image: string;
};

const RoomListScreen: React.FC<Props> = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_ROOMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const rooms: Room[] = data.usersRooms.rooms;

  const renderRoomItem = ({ item }: { item: Room }) => (
    <TouchableOpacity style={styles.roomItem} onPress={() => navigation.navigate('Chat', { roomId: item.id })}>
      <View style={styles.roomAvatar}>
      <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <Circle cx="32" cy="32" r="32" fill="#E9EAEE"/>
            <Defs>
           
                <Circle cx="100" cy="100" r="100" fill="#E9EAEE"/>
         
            </Defs>
          
              <Path d="M32 32C38.6274 32 44 26.6274 44 20C44 13.3726 38.6274 8 32 8C25.3726 8 20 13.3726 20 20C20 26.6274 25.3726 32 32 32Z" fill="#BFC1CC"/>
              <Path d="M32 32C51.33 32 67 47.67 67 67C67 86.33 51.33 102 32 102C12.67 102 -3 86.33 -3 67C-3 47.67 12.67 32 32 32Z" fill="#BFC1CC"/>
          
          </Svg>

      </View>
      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomLastMessage}>{item.lastMessage}</Text>
      </View>
      <View style={styles.roomMeta}>
        <Text style={styles.roomTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoomItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 10,
  },
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  roomAvatar: {
    marginRight: 12,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  roomInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  roomLastMessage: {
    fontSize: 14,
    color: '#666666',
  },
  roomMeta: {
    alignItems: 'flex-end',
  },
  roomTime: {
    fontSize: 12,
    color: '#999999',
  },
});

export default RoomListScreen;
