import http from "../../utils/httpClient";

class customerService {
  customerContactAvailable = async (contactNo) => {
    return await http
      .post("/api/Customer/ContactAvailable", {
        contactNo: contactNo,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  getCustomerDetails = async (contactNo) => {
    return await http.get(`/api/Customer/Get?contactNo=${contactNo}`);
  };

  createNewCustomer = async (data) => {
    return await http.post("/api/Customer/CreateOrUpdate", {
      customerId: data.customerId,
      roleId: data.roleId,
      cusName: data.cusName,
      cusContactNo: data.cusContactNo,
      isActive: data.isActive,
      cusPassword: data.cusPassword,
    });
  };

  createCustomerAddress = async (data) => {
    return await http.post(
      "/api/Customer/AddOrEditAddress",
      data.dataToSendApi
    );
  };

  getAddressOneApi = async () => {
    return await http.get("/api/Customer/GetAddressOneApi");
  };

  getProductWithSku = async (sku) => {
    return await http.get(`/api/Product/GetProductBySku?sku=${sku}`);
  };

  getCustomerAddress = async (id) => {
    return await http.get(`/api/Customer/GetAddressByCusId?customerId=${id}`);
  };

  createOrder = async (data) => {
    return await http.post("/api/Order/CreateOrder", data);
  };
}

export default new customerService();