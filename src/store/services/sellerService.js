import http from "../../utils/httpClient";

class SellerService {
  createSellerToken = async (data) => {
    //////debugger;
    return await http
      .post("/api/Master/SendToken", {
        userEmail: data.userEmail,
        userContactNo: data.userContactNo,
      })
      .then((response) => {
        //////debugger;

        //const token = response.data.token;
        const tokenId = response.data.tokenId;
        localStorage.setItem("x-access-tokenId", tokenId);

        //////debugger;
        return response.data;
      })
      .catch((err) => Promise.reject("Authorization Failed!", err));
  };

  sellerTokenVerify = async (data) => {
    localStorage.setItem("x-access-tokenCode", data.tokenCode);
    return await http
      .post("/api/Master/CheckTokenValidity", {
        tokenId: data.tokenId,
        tokenCode: data.tokenCode,
      })
      .then((response) => {
        // const token = response.data.token
        //localStorage.setItem("x-access-token", token)
        return response.data;
      })
      .catch((err) => Promise.reject("Authorization Failed!", err));
  };

  createSeller = async (data) => {
    //////debugger;
    return await http
      .post("/api/Seller/SellerRegistration", data)
      .then((response) => {
        // const token = response.data.token
        // localStorage.setItem('x-access-token', token)
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  SellerLogInAuth = async (data) => {
    if (data.check === true) {
      localStorage.setItem("seller-remember", "Y");
    }
    return await http
      .post(`/api/Auth/SellerLogin`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        const token = response.data.token;
        const employeeId = response.data.user.employeeId;
        const roleId = response.data.user.roleId;
        // const email = response.data.user.email;
        localStorage.setItem("x-access-roleId", roleId);
        localStorage.setItem("x-access-employeeId", employeeId);
        localStorage.setItem("x-access-token", token);
        localStorage.setItem(
          "x-access-token-expiration",
          Date.now() + 2 * 60 * 60 * 1000 //expires in 2 hours
        );
        //const user = jwt(token);

        return response.data;
      })
      .catch((err) => Promise.reject("Authentication Failed!"));
  };

  authenticateUser = async () => {
    return (
      (await localStorage.getItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration") > Date.now()
    );
  };

  deauthenticateUser = async () => {
    (await localStorage.removeItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration");
    window.location = window.location.origin + "/";
  };

  saveToken = async (token) => {
    (await localStorage.setItem("x-access-token", token)) &&
      localStorage.getItem("x-access-token-expiration");
  };

  getToken = (async) => {
    return localStorage.getItem("x-access-token");
  };

  retriveToken = (async) => {
    return this.getToken();
  };

  retriveEmployeeId = (async) => {
    return this.getEmployeeId();
  };

  retriveRoleId = (async) => {
    return this.getRoleId();
  };

  deleteSeller = async (id) => {
    return await http.delete("api/seller/" + id);
  };

  getSeller = async () => {
    return await http.get("api/seller");
  };

  getSellerById = async (searchBy) => {
    return await http.get("api/seller/" + searchBy);
  };

  getPendingSellerById = async (shopId) => {
    //////debugger;
    return await http.get(
      "api/seller/GetPendingSellerDetails?shopId=" + shopId
    );
  };

  saveToken = async (token) => {
    (await localStorage.setItem("x-access-token", token)) &&
      localStorage.getItem("x-access-token");
  };

  getToken = (async) => {
    return localStorage.getItem("x-access-token");
  };

  retriveToken = (async) => {
    return this.getToken();
  };

  getPendingSeller = async () => {
    //////debugger;
    return await http.get("/api/Seller/GetRequestedShopDetails");

    //return await http.get("https://jsonplaceholder.typicode.com/posts");
    //return await http.get("/api/popup");
  };

  approveShop = async (data) => {
    //////debugger;
    return await http
      .post("/api/Seller/SellerVerification/", {
        shopId: data.shopId,
        sellerId: data.sellerId,
        status: data.status,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  rejectShop = async (data) => {
    //////debugger;
    return await http
      .post("/api/Seller/SellerVerification", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  deliveryStatusChange = async (id, status) => {
    //////debugger;
    return await http
      .post(
        `/api/Seller/UpdateSellerIsDelliverdStatus?sellerId=${id}&status=${status}`
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  getVerifiedShop = async () => {
    //////debugger;
    return await http.get("/api/Seller/GetShopDetails?isActive=Y");
  };

  getEmployeeId = (async) => {
    return localStorage.getItem("x-access-employeeId");
  };

  getRoleId = (async) => {
    return localStorage.getItem("x-access-roleId");
  };

  //
  checkEmailAvailable = async (data) => {
    //////debugger;
    return await http
      .post("api/Seller/EmailAvailable", {
        userEmail: data,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  checkMobileNumberAvailable = async (data) => {
    //////debugger;
    return await http
      .post("api/Seller/ContactNoAvailable", {
        userContactNo: data,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  passwordReset = async (data) => {
    return await http
      .post("/api/Seller/PasswordReset", {
        email: data.email,
        tokenId: data.tokenId,
        token: data.tokenCode,
        password: data.password,
      })
      .then((response) => {
        // const token = response.data.token
        // localStorage.setItem("x-access-token", token)
        return response.data;
      })
      .catch((err) => Promise.reject("Authorization Failed!", err));
  };

  // Seller Return Policy - Start
  getSellerReturnPolicy = async (sellerId) => {
    return await http.get(
      `/api/Seller/GetSellerReturnPolicy?sellerId=${sellerId}`
    );
    // return await http.get(`/api/Seller/GetSellerReturnPolicy?shopId=2&sellerId=2`)
  };

  getReturnPolicy = async (isApproved) => {
    return await http.get(
      `/api/Seller/GetSellerReturnPolicy?getAll=Y&isApprove=${isApproved}`
    );
    // return await http.get(`/api/Seller/GetSellerReturnPolicy?shopId=2&sellerId=2`)
  };

  addOrEditSellerReturnPolicy = async (data) => {
    return await http.post("/api/Seller/AddOrEditSellerReturnPolicy", data);
  };

  getSellerNameBySellerId = async (sellerId) => {
    return await http.get(
      `/api/Seller/GetSellerReturnPolicy?getAll=Y&sellerId=${sellerId}`
    );
    // return await http.get(`/api/Seller/GetSellerReturnPolicy?shopId=2&sellerId=2`)
  };

  getSellerNameBySellerId = async (sellerId) => {
    return await http.get(
      `/api/Seller/GetSellerReturnPolicy?getAll=Y&sellerId=${sellerId}`
    );
    // return await http.get(`/api/Seller/GetSellerReturnPolicy?shopId=2&sellerId=2`)
  };

  getApprovedReturnPolicyByShopId = async (shopId) => {
    return await http.get(
      `/api/Seller/GetSellerReturnPolicy?shopId=${shopId}&isApprove=Y`
    );
    // return await http.get(`/api/Seller/GetSellerReturnPolicy?shopId=2&sellerId=2`)
  };
  // Seller Return Policy - End

  // Get All Seller Start
  getAllSeller = async () => {
    return await http.get(`/api/Seller/GetSeller?getAll=Y`);
  };
  // Get All Seller End
}

export default new SellerService();
