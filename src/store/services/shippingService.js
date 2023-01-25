import http from "../../utils/httpClient";

class shippingService {
  getShippingType = async () => {
    return await http.get("/api/Shipping/GetShippingType?getAll=Y");
  };

  createOrUpdateShippingType = async (data) => {
    return await http.post("/api/Shipping/CreateOrUpdateShippingType", data);
  };
  //
  getCourierProfile = async () => {
    return await http.get("/api/Shipping/GetCourierProfile?getAll=Y");
  };

  createOrUpdateCourierProfile = async (data) => {
    return await http.post("/api/Shipping/CreateOrUpdateCourierProfile", data);
  };
  //
  getCourierProductType = async () => {
    return await http.get("/api/Shipping/GetCourierProductType?getAll=Y");
  };

  createOrUpdateCourierProductType = async (data) => {
    return await http.post(
      "/api/Shipping/CreateOrUpdateCourierProductType",
      data
    );
  };
  //
  getShippingOptions = async () => {
    return await http.get("/api/Shipping/GetShippingOptions?getAll=Y");
  };

  createOrUpdateShippingOptions = async (data) => {
    return await http.post("/api/Shipping/CreateOrUpdateShippingOptions", data);
  };
  //
  getShippingCost = async (shippingTypeId, shippingOptionsId) => {
    let link = `/api/Shipping/GetShippingCost?getAll=Y`;
    //
    if (shippingTypeId === 0 && shippingOptionsId === 0) {
      link = `/api/Shipping/GetShippingCost?getAll=Y`;
    } else if (shippingTypeId && shippingOptionsId === 0) {
      link = `/api/Shipping/GetShippingCost?shippingTypeId=${shippingTypeId}&getAll=Y`;
    }
    // else if (shippingTypeId) {
    //   link = `/api/Shipping/GetShippingCost?shippingTypeId=${shippingTypeId}&shippingOptionsId=${99}&getAll=Y`
    // }
    else if (shippingTypeId === 0 && shippingOptionsId) {
      link = `/api/Shipping/GetShippingCost?shippingOptionsId=${shippingOptionsId}&getAll=Y`;
    } else if (shippingTypeId && shippingOptionsId) {
      link = `/api/Shipping/GetShippingCost?shippingTypeId=${shippingTypeId}&shippingOptionsId=${shippingOptionsId}&getAll=Y`;
    }

    return await http.get(link);
  };

  createShippingCost = async (data) => {
    return await http.post("/api/Shipping/CreateShippingCost", {
      shippingCosts: data.shippingCosts,
    });
  };

  updateShippingCost = async (data) => {
    return await http.post("/api/Shipping/UpdateShippingCost", data);
  };
  //
  getProductShippingCostMapping = async () => {
    return await http.get(
      "/api/Shipping/GetProductShippingCostMapping?getAll=Y"
    );
  };

  createOrUpdateProductShippingCostMapping = async (data) => {
    return await http.post(
      "/api/Shipping/CreateOrUpdateProductShippingCostMapping",
      data
    );
  };

  getCourierCost = async () => {
    return await http.get("/api/Shipping/GetCourierCost?getAll=Y");
  };

  createOrUpdateCourierCost = async (data) => {
    return await http.post("/api/Shipping/CreateOrUpdateCourierCost", data);
  };

  calculateShippingCost = async (
    countryId,
    cityId,
    areaId,
    productSingleId,
    productSingleQty
  ) => {
    return await http.get(
      `/api/Shipping/CalculateShippingCharge?countryId=${countryId}&cityId=${cityId}&areaId=${areaId}&productId=${productSingleId}&orderQty=${productSingleQty}`
    );
  };
}

export default new shippingService();
