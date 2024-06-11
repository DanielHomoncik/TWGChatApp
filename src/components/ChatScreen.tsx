import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { SEND_MESSAGE } from '../graphql/mutations';
import { GET_ROOM_MESSAGES } from '../graphql/queries';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

type Props = {
  route: ChatScreenRouteProp;
  navigation: ChatScreenNavigationProp;
};

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId } = route.params;
  const [message, setMessage] = useState('');
  const { loading, error, data } = useQuery(GET_ROOM_MESSAGES, {
    variables: { id: roomId },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    refetchQueries: [{ query: GET_ROOM_MESSAGES, variables: { id: roomId } }],
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleSend = () => {
    sendMessage({ variables: { body: message, roomId } });
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.room.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.user.id === '1' ? styles.sentMessage : styles.receivedMessage}>
            <Text style={styles.messageText}>{item.body}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    padding: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6200EE',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  messageText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default ChatScreen;
