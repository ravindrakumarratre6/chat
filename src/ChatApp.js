import React, { useState, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
console.log("show",showUserList)
console.log("select",selectedUser)
  const handleSelectEmoji = (emoji) => {
    setNewMessage(prevMessage => prevMessage + emoji.native);
    inputRef.current.focus(); // Focus on the input field after selecting emoji
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
    const newMessageObj = {
      username: randomUser,
      message: newMessage,
      likes: 0
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  const handleLike = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].likes += 1;
    setMessages(updatedMessages);
  };

  const handleSelectUser = (username) => {
    setNewMessage(prevMessage => prevMessage + `@${username} `);
    setShowUserList(false);
    setSelectedUser('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewMessage(value);
    if (value.endsWith('@')) {
      setShowUserList(true);
    } else {
      setShowUserList(false);
      setSelectedUser('');
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center ">
      <div className="overflow-auto flex-grow">
        {messages.map((message, index) => (
          <div key={index} className="message mb-4">
            <strong>{message.username}: </strong>
            <span style={{color:"blue",margin:"0 5px 0 0 "}}>{message.message}</span>
            <button onClick={() => handleLike(index)} style={{color:"red"}} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Like</button>
            <span className="ml-2">({message.likes})</span>
          </div>
        ))}
      </div>
      <div className="flex items-center border-t p-4">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="message-input flex-grow mr-2 p-2 border rounded focus:outline-none"
          ref={inputRef} // Ref to focus on the input field after selecting emoji
        />
        <button  onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="emoji-button p-1">😀</button>
        {showEmojiPicker && (
          <Picker onSelect={handleSelectEmoji} data={data} onEmojiSelect={console.log} />
        )}
        <button onClick={handleSendMessage} className="send-button px-4 py-2 bg-blue-500 text-info rounded">Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
