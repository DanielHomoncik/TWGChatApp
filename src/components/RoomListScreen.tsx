import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ROOMS } from '../graphql/queries';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Svg, { Path, Circle, Defs } from 'react-native-svg';

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

type User = {
  __typename: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;
};

const RoomItem: React.FC<{ room: Room, user: User, navigation: RoomsScreenNavigationProp, isFirstUser: boolean }> = ({ room, user, navigation, isFirstUser }) => (
  <Pressable
    style={[
      styles.roomItem,
      { backgroundColor: isFirstUser ? '#5603ad' : '#FFFFFF' },
    ]}
    onPress={() => navigation.navigate('Chat', { roomId: room.id, myId: user.id })}
  >
    <View style={styles.roomAvatar}>
      <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <Circle cx="32" cy="32" r="32" fill="#E9EAEE" />
        <Defs>
          <Circle cx="100" cy="100" r="100" fill="#E9EAEE" />
        </Defs>
        <Path d="M32 32C38.6274 32 44 26.6274 44 20C44 13.3726 38.6274 8 32 8C25.3726 8 20 13.3726 20 20C20 26.6274 25.3726 32 32 32Z" fill="#BFC1CC" />
        <Path d="M32 32C51.33 32 67 47.67 67 67C67 86.33 51.33 102 32 102C12.67 102 -3 86.33 -3 67C-3 47.67 12.67 32 32 32Z" fill="#BFC1CC" />
      </Svg>
    </View>
    {isFirstUser && <View style={styles.onlineIndicator} />}
    <View style={styles.roomInfo}>
      <Text style={[styles.roomName, { color: isFirstUser ? '#FFFFFF' : '#333333' }]}> {user.firstName} {user.lastName} </Text>
      <Text style={[styles.userName, { color: isFirstUser ? '#FFFFFF' : '#666666' }]}>
        {room.name} {room.lastMessage} {user.lastName}
      </Text>
    </View>
    <View style={styles.roomMeta}>
      <Text style={[styles.roomTime, { color: isFirstUser ? '#FFFFFF' : '#999999' }]}>{room.time}</Text>
    </View>
  </Pressable>
);

const RoomListScreen: React.FC<Props> = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_ROOMS);
  const rooms: Room[] = data?.usersRooms?.rooms;
  const user: User = data?.user;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const renderRoomItem = ({ item, index }: { item: Room, index: number }) => (
    <RoomItem room={item} user={user} navigation={navigation} isFirstUser={index === 0} />
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
    position: 'relative',
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
  userName: {
    fontSize: 14,
    color: '#666666',
  },
  onlineIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 15,
    backgroundColor: '#a8ff76',
  },
});

export default RoomListScreen;
