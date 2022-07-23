import { createContext } from "react";

const SocketContext = createContext({
    retailerBrandslist: [],
    inventory: []
});

// retailerBrandslist: A list of all brand objects associated with a retailer. Attributes: name, email (for unique ID on brand focus)
// inventory: A list of all product objects associated with a company (either brand or retailer). Attributes: name, id, quantity

export default SocketContext;