// import { socket } from "../App" // Possibly fix this import later, check events.js also
import { socket } from "./InitSockets";

export const socketEvents = ({ setValue }) => {
  // I'll learn createContext and make these contexts later, probably?

  socket.on("yourBrands", (retailerBrandslist) => {
    // This event gives the client a list of brand objects with the attributes:
    // name : name of the brand
    // email : email of the brand (to be used as the unique ID in the database)
    console.log(retailerBrandslist)
    setValue(state => {return {...state, retailerBrandslist } });
  });

  socket.on("updateStock", (inventory) => {
    // This event gives the client a list of product objects for the use in the table.
    // Array of objects with attributes:
    // name
    // id
    // quantity
    setValue(state => {return {...state, inventory} })
  });

  socket.on("yourRetailers", (retailerList) => {
    // This event gives the client a list of retailers that carry one specific product
    // Array of objects with attributes:
    // name : retailer name,
    // email : retailer email (to serve as the unique ID for the retailer)
    // quantity : specific product quantity
    // setValue(state => {return {...state, stateStocklist} })
  });

  socket.on("debugConnection", (payload) => {
    console.log(
      "I was triggered by the backend. Check if payload made it through: "
    );
    console.log(
      "The message under me should say: If you can see this, you can hear me!"
    );
    console.log(payload);
  });
};