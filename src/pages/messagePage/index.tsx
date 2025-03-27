import React, { useState } from "react";
import { FiUser, FiChevronRight, FiMenu } from "react-icons/fi";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setChatBox } from "../../store/chatbox/chatBoxSlice";
import { useEffect } from "react";
import { getChatBoxListByAdmin } from "../../services/MessageService";
import { notifyError } from "../../components/toastNotify";

const MessagesPage = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatBoxs, setChatBoxs] = React.useState<any[]>([]);
  const dispatch = useDispatch();


  const handleClientClick = (clientId) => {
    setSelectedClient(clientId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOpenChatBox = (chatBox) => {
    dispatch(setChatBox(chatBox));
    setChatBoxs(
      chatBoxs.map((item) =>
        item.id === chatBox.id ? { ...item, isSeen: true } : item
      )
    );
  };
  useEffect(() => {
    const fetchChatBoxs = async () => {
      try {
        const data = await getChatBoxListByAdmin();
        // setChatBoxs(data);
      } catch (err) {
        notifyError("Error occurred");
      }
    };
    fetchChatBoxs();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Client list */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-10 w-64 bg-white shadow-lg overflow-y-auto`}
      >
        <h2 className="text-xl font-semibold p-4 border-b">Clients</h2>
        <ul className="divide-y divide-gray-200">
          {chatBoxs.map((chatBox) => (
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
          ))}
        </ul>
      </div>

      {/* Message display */}
      <div className="flex-1 p-4 md:p-8">
        {/* {selectedClient ? (
          <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">
              {clients.find((c) => c.id === selectedClient)?.name}
            </h2>
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages[selectedClient].length > 0 ? (
                messages[selectedClient].map((message) => (
                  <div key={message.id} className="bg-gray-100 rounded-lg p-3">
                    <p>{message.text}</p>
                    <span className="text-xs text-gray-500">
                      {format(message.timestamp, "MMM d, yyyy HH:mm")}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <FiUser className="w-12 h-12 mx-auto mb-2" />
                  <p>No messages to display for this client.</p>
                </div>
              )}
            </div>
          </div>
        ) : ( */}
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Select a client to view messages</p>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default MessagesPage;
