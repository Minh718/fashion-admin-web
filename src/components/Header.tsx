import { Stomp } from "@stomp/stompjs";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaEnvelope, FaSearch } from "react-icons/fa";
import BoxChat from "../components/BoxChat";
import { API_URL } from "../constants";
import {
  adminGetMessages,
  adminSendMessage,
  getChatBoxListUnSeenByAdmin,
} from "../services/MessageService";
import { notifyError } from "./toastNotify";

import sockjs from "sockjs-client/dist/sockjs";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setChatBox } from "../store/chatbox/chatBoxSlice";
interface User {
  id: number;
  name: string;
  avatar: string;
}
export default function Header({ isOpenSideBar, toggleSidebar }) {
  const [isMessageListOpen, setIsMessageListOpen] = useState(false);
  const { chatBox } = useSelector((state: RootState) => state.chatbox);
  const dispatch = useDispatch();
  const [chatMessages, setChatMessages] = useState({});
  const [numNewChat, setNumNewChat] = React.useState(0);
  const privateStompClient = useRef<any | null>(null);

  const [activeChatUsers, setActiveChatUsers] = useState<User[]>([]);
  const [chatBoxs, setChatBoxs] = React.useState<any[]>([]);
  const [messages, setMessages] = React.useState<any[]>([]);
  const accessToken = Cookies.get("accessToken");
  const [size, setSize] = React.useState(10);

  const handleOpenChatBox = (chatBox) => {
    dispatch(setChatBox(chatBox));
    if (chatBox.isSeen === false) setNumNewChat(numNewChat - 1);
    setChatBoxs(
      chatBoxs.map((item) =>
        item.id === chatBox.id ? { ...item, isSeen: true } : item
      )
    );
    handleCloseMessageList();
  };
  const handleCloseMessageList = () => {
    setIsMessageListOpen(false);
  };
  const sendPrivateMessage = (data) => {
    if (privateStompClient && chatBox) {
      console.log({ text: "message", to: chatBox.userId });
      privateStompClient.current?.send(
        "/app/private",
        {},
        JSON.stringify({ text: JSON.stringify(data), to: chatBox.userId })
      );
    }
  };
  const closeChat = (userId) => {
    setActiveChatUsers(activeChatUsers.filter((user) => user.id !== userId));
    const newChatMessages = { ...chatMessages };
    delete newChatMessages[userId];
    setChatMessages(newChatMessages);
  };
  const toggleMessageList = () => {
    setIsMessageListOpen(!isMessageListOpen);
  };
  const handleSendMessage = async (message) => {
    try {
      const data = await adminSendMessage({ message, chatBoxId: chatBox?.id });
      setMessages([...messages, data]);
      sendPrivateMessage(data);
    } catch (err) {
      notifyError("Error occured");
    }
  };
  useEffect(() => {
    if (!chatBox) return;

    const fetchMessages = async () => {
      try {
        const data = await adminGetMessages({ size, chatBoxId: chatBox.id });
        setMessages(data.reverse());
      } catch (err) {
        notifyError("Error occurred");
      }
    };

    fetchMessages(); // Initial fetch

    const intervalId = setInterval(fetchMessages, 5000); // Polling

    return () => clearInterval(intervalId); // Cleanup
  }, [chatBox, size]);

  // Establish WebSocket connection
  useEffect(() => {
    const privateSocket = new sockjs(
      `${API_URL}/ws?access_token=${accessToken}`
    );
    const stompClient = Stomp.over(privateSocket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/user/specific", (result) => {
        const newChatBox = JSON.parse(result.body);

        setChatBoxs((prevChatBoxs) => {
          const exists = prevChatBoxs.some((item) => item.id === newChatBox.id);
          if (exists) {
            return prevChatBoxs.map((item) =>
              item.id === newChatBox.id ? newChatBox : item
            );
          }
          setNumNewChat((prev) => prev + 1);
          return [newChatBox, ...prevChatBoxs];
        });
      });
    });
    privateStompClient.current = stompClient;

    return () => {
      privateStompClient.current?.disconnect();
    };
  }, [accessToken]);

  // Fetch unseen chat boxes on mount
  useEffect(() => {
    const fetchChatBoxs = async () => {
      try {
        const data = await getChatBoxListUnSeenByAdmin();
        // setChatBoxs(data);
      } catch (err) {
        notifyError("Error occurred");
      }
    };
    fetchChatBoxs();
  }, []);

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
            <div className="w-[20px] h-[20px] rounded-full bg-red-600 absolute top-0 right-2 font-bold flex items-center justify-center text-white">
              {numNewChat}
            </div>
            {isMessageListOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10">
                {chatBoxs.length === 0 ? (
                  <div className="px-4 py-2 text-gray-500">
                    No waiting messages
                  </div>
                ) : (
                  chatBoxs.map((chatBox) => (
                    <div
                      key={chatBox.id}
                      className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                      onClick={() => handleOpenChatBox(chatBox)}
                    >
                      <div className="flex items-center justify-between w-[300px] p-2">
                        <div className="flex items-center gap-5">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={chatBox.image}
                            alt={chatBox.name}
                          />
                          <div>{chatBox.name}</div>
                        </div>
                        {!chatBox.isSeen && (
                          <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}

                <button
                  className="flex justify-center w-full text-blue-600 hover:underline mt-2"
                  onClick={handleCloseMessageList}
                >
                  View all
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed right-0 bottom-0 z-50">
        {chatBox ? (
          <BoxChat
            handleSendMessage={handleSendMessage}
            messages={messages}
            name={chatBox.name}
            image={chatBox.image}
            size={size}
            setSize={setSize}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
