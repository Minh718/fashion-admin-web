import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { convertDateTimeFlexibly } from "../utils/convertDateTimeFlexibly";
import { Message } from "../types/Message";
import { RootState } from "../store";
import { clearChatBox } from "../store/chatbox/chatBoxSlice";
interface ChatBoxProps {
  setSize: (size: number) => void;
  size: number;
  messages: Message[];
  name: string;
  image?: string;
  handleSendMessage: (message: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  setSize,
  size,
  messages,
  name,
  image = "avatar.jpg",
  handleSendMessage,
}) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesBeginRef = useRef<HTMLDivElement | null>(null);
  const [isViewMore, setIsViewMore] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const handleMessage = () => {
    if (!message.trim()) return;
    handleSendMessage(message);
    setMessage("");
    setIsViewMore(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleMessage();
    }
  };

  const handleCloseChatBox = () => {
    dispatch(clearChatBox());
  };
  useEffect(() => {
    if (messagesEndRef.current && messagesBeginRef.current) {
      if (isViewMore) {
        messagesBeginRef.current.scrollIntoView();
      } else {
        messagesEndRef.current.scrollIntoView();
      }
    }
  }, [messages, isViewMore]);

  return (
    <div className="bg-white w-[330px] h-[400px] rounded-lg shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between py-2 px-4 border-b">
          <div className="flex items-center gap-2">
            <FaUser />
            <div className="text-lg font-bold">{name}</div>
          </div>
          <div className="flex items-center gap-2">
            {["green", "yellow", "red"].map((color, idx) => (
              <div
                key={idx}
                onClick={color === "red" ? handleCloseChatBox : undefined}
                className={`w-6 h-6 rounded-full bg-${color}-500 ${
                  color === "red" ? "cursor-pointer" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-2 pb-1">
          <div ref={messagesBeginRef}></div>
          {messages.length === 0 ? (
            <div className="text-center">No messages</div>
          ) : messages.length >= size ? (
            <div
              onClick={() => {
                setSize(size + 7);
                setIsViewMore(true);
              }}
              className="text-center text-[14px] cursor-pointer hover:underline mb-2"
            >
              View more
            </div>
          ) : null}

          {messages.map((messageItem, index) => (
            <div
              key={index}
              className={`flex gap-2 mt-1 ${
                messageItem.idSend === userInfo.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  messageItem.idSend === userInfo.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {messageItem.message}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef}></div>
          {messages.length > 0 && (
            <div className="text-center opacity-70 text-[14px] flex justify-end">
              {convertDateTimeFlexibly(messages[messages.length - 1].createdAt)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 p-4 border-t">
          <input
            type="text"
            placeholder="Type a message"
            onKeyDown={handleKeyDown}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 rounded-full border outline-none"
          />
          <button
            onClick={handleMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
