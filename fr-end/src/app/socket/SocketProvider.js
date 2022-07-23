import SocketContext from "./SocketContext";
import { useState, useEffect } from "react";
import initSockets from "./InitSockets";

const SocketProvider = ({ children }) => {
  const [value, setValue] = useState({
    retailerBrandslist: [],
    inventory: []
  });

  useEffect(() => {
    initSockets({ setValue });
  }, []);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;