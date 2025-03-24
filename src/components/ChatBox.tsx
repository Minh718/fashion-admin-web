import { FaBars, FaSearch, FaEnvelope, FaTimes, FaPaperPlane } from "react-icons/fa";
import React from 'react'

export default function ChatBox({user, chatMessages, closeChat, handleChatMessageChange, sendMessage}) {
  return (
    <div key={user.id} className="w-80 bg-white shadow-lg rounded-t-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
              </div>
              <button onClick={() => closeChat(user.id)} className="text-xl focus:outline-none">
                <FaTimes />
              </button>
            </div>
            <div className="h-64 p-4 overflow-y-auto">
              <p className="text-gray-600">Chat messages with {user.name} would appear here.</p>
              <p className="text-gray-600 mt-2">Example message: Hi {user.name}, how are you today?</p>
            </div>
            <div className="p-3 border-t flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow px-3 py-2 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={chatMessages[user.id] || ""}
                onChange={(e) => handleChatMessageChange(user.id, e)}
              />
              <button
                onClick={() => sendMessage(user.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
  )
}
