// ChatScreen.js
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {socket} from '../services/endPoints';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const ChatScreen = ({route}) => {
  const {userData} = useSelector((state: RootState) => state.userReducer);
  const {room} = route.params;
  // const [room, setRoom] = useState(userData._id);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  useEffect(() => {
    socket.emit('joinRoom', userData._id);

    socket.on('receiveMessage', message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [room]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages(prevMessages => [...prevMessages, 'customer:' + message]);
      socket.emit('sendMessage', {room, message: 'customer:' + message});
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <View className="flex-1">
        <ScrollView
          className="p-2"
          // onContentSizeChange={() =>
          //   scrollViewRef.current.scrollToEnd({animated: true})
          // }
        >
          {messages.map((message, index) => (
            <View key={index} className="mb-2 ">
              <Text
                className={` p-2 rounded-lg text-black ${
                  message.startsWith('customer')
                    ? 'text-right bg-yellow-200'
                    : ' text-left bg-blue-200'
                } `}>
                {message.startsWith('customer')
                  ? message.substring(9)
                  : message.substring(8)}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View className="flex-row items-center p-4 border-t">
          <TextInput
            className="flex-1 border rounded-lg p-2 mr-2 text-black"
            placeholder="Type a message"
            value={message}
            onChangeText={setMessage}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
