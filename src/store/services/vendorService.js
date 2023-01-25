import http from "../../utils/httpClient";

class VendorService {
  createVendor = async (data) => {
    
    return await http.post("/api/vendor", {
      vendorId: data.vendorId,
      vendorName: data.vendorName,
      bussinessTypeId: data.bussinessTypeId,
      binNo: data.binNo,
      AdressId: data.AdressId,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      url: data.url,
      address: data.address,
      contactNo: data.contactNo,
      email: data.email,
      activeYn: data.activeYn,
    });
  };

  deleteVendor = async (id) => {
    return await http.delete("api/vendor/" + id);
  };

  getVendor = async () => {
    return await http.get("api/vendor");
  };

  getVendorById = async (searchBy) => {
    return await http.get("api/vendor/" + searchBy);
  };
}
export default new VendorService();
