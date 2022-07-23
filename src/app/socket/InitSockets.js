
import { socketEvents } from "./events";
import io from "socket.io-client";
import { TestEmission } from "./emits";

const ENDPOINT = 'http://localhost:8081';
console.log(ENDPOINT);
export const socket = io(ENDPOINT);

const initSockets = ({ setValue }) => {
  socketEvents({ setValue });
  TestEmission();
};

export default initSockets;