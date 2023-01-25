import http from "../../utils/httpClient";

class inventoryService {
  createInventory = async (data) => {
    //////debugger;
    return await http
      .post("/api/inventory", {
        inventoryId: data.inventoryId,
        productId: data.productId,
        colorId: data.colorId,
        InventoryDetails: data.InventoryDetails,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  deleteInventory = async (id) => {
    //////debugger;
    return await http.delete("/api/inventory/" + id);
  };

  getInventory = async () => {
    return await http.get("/api/inventory");
  };

  getInventoryById = async (searchBy) => {
    return await http.get("/api/inventory/" + searchBy);
  };
}
export default new inventoryService();
