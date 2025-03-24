import React, { useState } from "react";
import { FiUser, FiChevronRight, FiMenu } from "react-icons/fi";
import { format } from "date-fns";

const MessagesPage = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const clients = [
    {
      id: 1,
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: 3,
      name: "Bob Johnson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  const messages = {
    1: [
      { id: 1, text: "Hello John!", timestamp: new Date(2023, 5, 1, 10, 30) },
      {
        id: 2,
        text: "How are you doing?",
        timestamp: new Date(2023, 5, 1, 10, 35),
      },
    ],
    2: [
      {
        id: 1,
        text: "Hi Jane, can we schedule a meeting?",
        timestamp: new Date(2023, 5, 2, 14, 0),
      },
      {
        id: 2,
        text: "Sure, how about tomorrow at 2 PM?",
        timestamp: new Date(2023, 5, 2, 14, 15),
      },
    ],
    3: [],
  };

  const handleClientClick = (clientId) => {
    setSelectedClient(clientId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          {clients.map((client) => (
            <li
              key={client.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                selectedClient === client.id ? "bg-blue-50" : ""
              }`}
              onClick={() => handleClientClick(client.id)}
            >
              <div className="flex items-center">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-medium">{client.name}</span>
                <FiChevronRight className="ml-auto" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Message display */}
      <div className="flex-1 p-4 md:p-8">
        {selectedClient ? (
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
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a client to view messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
