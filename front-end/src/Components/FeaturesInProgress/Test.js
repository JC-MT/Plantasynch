import { useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import './Chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([]);

  function handleNewUserMessage(newMessage) {
    setMessages([...messages, { message: newMessage, sender: 'user' }]);
    // Send the user message to your chatbot platform for processing
    // and retrieve the chatbot's response
    const chatbotResponse = 'Hello, how can I help you today?';
    addResponseMessage(chatbotResponse);
    setMessages([...messages, { message: chatbotResponse, sender: 'bot' }]);
  }

  return (
    <div className="chatbot-container">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chat with our Support Team"
        subtitle="We're here to help you with any questions you have."
        senderPlaceHolder="Type your message here..."
        profileAvatar="https://cdn-icons-png.flaticon.com/512/628/628324.png"
        showTimeStamp={true}
        fullScreenMode={false}
        badge={1}
      />
    </div>
  );
}

export default Chatbot;
