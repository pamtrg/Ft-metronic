import { socket } from "./InitSockets";

export const ModifyQuantity = (payload) => {
    // This emit is to change the quantity of a specific product
    // Payload object:
        // productID : id of product to modify
        // brandID : email of brand
        // email: retailer email
        // newQuantity: new quantity
    socket.emit("updateQuantity", payload);
}

export const GetAllBrands = (payload) => {
    // This emit is the show all the brands that a retailer is affiliated with
    // Payload:
        // Just retailer ID, no object
    socket.emit("GetAllbrands", payload)
}

export const CreateNewProduct = (payload) => {
    // This emit is to create a new product for a brand, NOT A RETAILER. I REPEAT NOT A RETAILER
    // Payload:
        // name : name of product
        // brandID : email of brand
    socket.emit("createNewproduct", payload);
}

export const GetStock = (payload) => {
    // This emit is to view the stock of a retailer or a brand
    // Payload:
        // retailID: email of retailer
        // brandID: email of brand
        // type: "retail" or "brand"
    socket.emit("getStock", payload);
}

export const GetValidRetail = (payload) => {
    // This emit is to obtain the retailers selling a specific product
    // selfEmail: String
        // productID: Integer
        // brandID: String
        // Type: "retail" or "brand"
    socket.emit("getValidretail", payload);
}

export const CreateNewCompany = (payload) => {
    // This emit is to add a company (either brand or retailer) to our database of users
    // Payload attributes:
        // email : email of the company
        // name : name of the company
        // phoneNumber : phoneNumber of the company
        // address : Address of the company
        // type: Whether it's a brand or not, either "retail" or "brand"
    socket.emit("createNewcompany", payload);
}

export const AddProductToRetail = (payload) => {
    // This emit is to add a new product to a retailer's stock, NOT FOR A BRAND TO USE
    // Payload:
        // productID : id of product of a brand
        // brandID : email of brand
        // retailerID : email of the retailer
    socket.emit("addProductinRetail", payload);
}

export const RequestProduct = (payload) => {
    // This emit is to trigger the Twilio API to ask a company (brand or retailer) for a product
    // Payload:
        // productID : to identify the product
        // brandID : to identify the product
        // target : companyObject
            // id : email
            // type: "brand" or "retail", who is being asked?
        // asker : companyObject
            // id : email
            // type: "brand" or "retail", who is asking?
    socket.emit("requestProduct", payload);
}

export const AddRetailer = (payload) => {
    // Payload:
        // retailID : email of Retailer
        // brandID : email of brand
    socket.emit("addRetailer", payload);
}

export const ReturnNotice = (payload) => {
    // Emit to send a "return notice" (On twilio, it's the FSync return notice)
    // Payload:
        // brandName
        // brandEmail
        // retailName
    socket.emit("returnNotice", payload);
}

export const TestEmission = () => {
    socket.emit("testEmit", "Hello backend!");
}


export const setUniqueIdio = (payload,options) => {
    socket.emit("setUniqueId",payload,options);
}