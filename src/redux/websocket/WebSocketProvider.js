import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { url } from "../constants/urls";
import { fetchMessages } from "../message/messagesSlice";
import { fetchAllUsers } from "../users/usersSlice";

const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [webSocket, setWebSocket] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  const initializeWebSocket = () => {
    const user_id = window.localStorage.getItem("id");
    const prodUrl = `ws://${url}`;
    if (user_id) {
      const ws = new WebSocket(`${prodUrl}/user/ws/connect/${user_id}`);

      ws.onopen = () => {
        setWebSocket(ws);
      };

      ws.onmessage = (event) => {
        dispatch(fetchMessages()).then((res) => {
          dispatch(fetchAllUsers());

          // dispatch(updateReceiverUser(users.list[auth.receiverUser.id]));
        });
      };

      ws.onclose = () => {
        setWebSocket(null);
      };

      return () => {
        ws.close();
      };
    } else {
      console.error("Connection lost");
    }
  };

  const terminateWebSocket = () => {
    if (webSocket) {
      webSocket.close();

      setWebSocket(null);
    }
  };

  useEffect(() => {
    const cleanup = initializeWebSocket();
    return cleanup;
  }, []);

  useEffect(() => {
    // console.log(webSocket); // This will log the updated value of webSocket
  }, [webSocket]);

  const contextValue = {
    webSocket,
    initializeWebSocket,
    terminateWebSocket,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export default WebSocketProvider;
