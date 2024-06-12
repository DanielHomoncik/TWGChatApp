import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { SEND_MESSAGE } from '../graphql/mutations';
import { GET_ROOM_MESSAGES } from '../graphql/queries';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Svg, { Path } from 'react-native-svg';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

type Props = {
  route: ChatScreenRouteProp;
  navigation: ChatScreenNavigationProp;
};

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  const { roomId, myId } = route.params;
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { loading, error, data } = useQuery(GET_ROOM_MESSAGES, {
    variables: { id: roomId },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    refetchQueries: [{ query: GET_ROOM_MESSAGES, variables: { id: roomId } }],
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleSend = () => {
    if (message.trim() === '') return;
    sendMessage({ variables: { body: message, roomId } });
    setMessage('');
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View style={item.user.id === myId ? styles.sentMessage : styles.receivedMessage}>
      <Text style={item.user.id === myId ? styles.sentMessageText : styles.receivedMessageText}>{item.body}</Text>
      <Text style={styles.messageTimestamp}>{new Date(item.insertedAt).toLocaleTimeString()}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={90}>
      <FlatList
        data={data.room.messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        inverted
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.nextTo}>
        <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <Path d="M25.5378 38.5513C26.5866 39.6001 28.372 39.1825 28.8468 37.7773L39.0291 7.64382C39.5591 6.07527 38.0627 4.57879 36.4941 5.10881L6.36061 15.2912C4.95548 15.766 4.53788 17.5514 5.58664 18.6001L12.0232 25.0367C12.6903 25.7038 13.7328 25.814 14.5247 25.3012L18.9131 22.4589C20.7233 21.2865 22.8514 23.4146 21.679 25.2248L18.8367 29.6132C18.3239 30.405 18.4341 31.4476 19.1012 32.1147L25.5378 38.5513Z" fill="#5603AD" />
          </Svg>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  messagesContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6A0DAD',
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
  sentMessageText: {
    color: '#FFFFFF',
  },
  receivedMessageText: {
    color: '#333333',
  },
  messageTimestamp: {
    fontSize: 10,
    color: '#999999',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  nextTo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b3d9ff',
    borderRadius: 30,
    padding: 30,
    paddingBottom: 55,
    margin: 0,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputContainerFocused: {
    borderColor: '#6A0DAD',
    borderWidth: 4,
  },
  input: {
    flex: 1,
    borderWidth: 0,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default ChatScreen;