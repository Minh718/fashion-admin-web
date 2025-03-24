import React, { useState } from 'react'
import { FaBars, FaSearch, FaEnvelope, FaTimes, FaPaperPlane } from "react-icons/fa";
import ChatBox from './ChatBox';

interface User {
    id: number;
    name: string;
    avatar: string;
}
export default function Header({isOpenSideBar, toggleSidebar}) {
    const [isMessageListOpen, setIsMessageListOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState({});
    const [activeChatUsers, setActiveChatUsers] = useState<User[]>([]);    
    const sendMessage = (userId) => {
        if (chatMessages[userId]?.trim()) {
          console.log(`Sending message to ${userId}: ${chatMessages[userId]}`);
          setChatMessages({ ...chatMessages, [userId]: "" });
        }
      };
    const openChat = (user) => {
        if (activeChatUsers.length < 3 && !activeChatUsers.find(u => u.id === user.id)) {
          setActiveChatUsers([...activeChatUsers, user]);
          setChatMessages({ ...chatMessages, [user.id]: [] });
        }
        setIsMessageListOpen(false);
      };
      const handleChatMessageChange = (userId, e) => {
        const newChatMessages = { ...chatMessages };
        newChatMessages[userId] = e.target.value;
        setChatMessages(newChatMessages);
      };
    
      const closeChat = (userId) => {
        setActiveChatUsers(activeChatUsers.filter(user => user.id !== userId));
        const newChatMessages = { ...chatMessages };
        delete newChatMessages[userId];
        setChatMessages(newChatMessages);
      };
      const toggleMessageList = () => {
        setIsMessageListOpen(!isMessageListOpen);
      };
      const users = [
        { id: 1, name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
        { id: 2, name: "Jane Smith", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
        { id: 3, name: "Bob Johnson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" },
        { id: 4, name: "Bob Johnson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" },
      ];
    
    return (
    <div className="bg-gray-800 text-white w-full ">
    <div className=" w-full max-w-screen-xl container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-2xl focus:outline-none"
            aria-label="Toggle Sidebar"
          >
         <FaBars />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="relative">
          <button
            onClick={toggleMessageList}
            className="text-2xl focus:outline-none"
            aria-label="Open Messages"
          >
            <FaEnvelope />
          </button>
          {isMessageListOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Messages</h3>
                <ul className="space-y-2">
                  {users.map((user) => (
                    <li
                      key={user.id}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                      onClick={() => openChat(user)}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-gray-800">{user.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="fixed bottom-0 right-0 flex space-x-2 p-2">
    {activeChatUsers.map((user) => (
        <ChatBox key={user.id} user={user} chatMessages={chatMessages} closeChat={closeChat} handleChatMessageChange={handleChatMessageChange} sendMessage={sendMessage} />
    ))}
    </div>
    </div>
  )
}
