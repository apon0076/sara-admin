import http from "../../utils/httpClient"

class sellerProfileService {
  //
  createSellerProfile = async (data) => {
    //////debugger;
    return await http
      .post("/api/Seller", {
        sellerId: data.sellerId,
        sellerName: data.sellerName,
        sellerEmail: data.sellerEmail,
        sellerContactNo: data.sellerContactNo,
        sellerPresentAddress: data.sellerPresentAddress,
        isActive: data.isActive,
        sellerImageUrl: data.sellerImageUrl,
        sellerImage: data.sellerImage,
        imageType: data.imageType,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }

  createOrUpdateSellerProfile = async (data) => {
    //////debugger;
    return await http
      .post("/api/Seller/createOrUpdateSeller", {
        sellerId: data.sellerId,
        roleId: data.roleId,
        sellerName: data.sellerName,
        sellerContactNo: data.sellerContactNo,
        sellerEmail: data.sellerEmail,
        sellerImageUrl: data.sellerImageUrl,
        sellerPresentAddress: data.sellerPresentAddress,
        sellerPermanentAddress: data.sellerPermanentAddress,
        isActive: data.isActive,
        shopId: data.shopId,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }

  //
  createSellerAddress = async (data) => {
 
    return await http
      .post("/api/Seller/CreateOrUpdateAddress", data
      // {
      //   sellerAddressId: data.sellerAddressId,
      //   fullName: data.fullName,
      //   address: data.address,
      //   phoneNo: data.phoneNo,
      //   postCode: data.postCode,
      //   division: data.division,
      //   city: data.city,
      //   addressTypeId: data.addressTypeId,
      //   shopId: data.shopId,
      //   sellerId: data.sellerId,
      //   isActive: data.isActive,
      //   isApprove: data.isApprove,
      //   status: data.status,
      //   // data,
      // }
      )
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }

  createSellerBankAccount = async (data) => {

    return await http
      .post("/api/Seller/CreateOrUpdateBankAccount", {
        sellerBankAccountId: data.sellerBankAccountId,
        accountHolderName: data.accountHolderName,
        accountNo: data.accountNo,
        bankName: data.bankName,
        branchName: data.branchName,
        routingNo: data.routingNo,
        documentUrl: data.documentUrl,
        shopId: data.shopId,
        sellerId: data.sellerId,
        isActive: data.isActive,
        isApprove: data.isApprove,
        status: data.status,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }

  //
  sellerUpdateShop = async (data) => {
    return await http
      .post("/api/Seller/UpdateShop", {
        shopId: data.shopId,
        sellerId: data.sellerId,
        shopUrl: data.shopUrl,
        shopName: data.shopName,
        shopLogoUrl: data.shopLogoUrl,
        bussinessTypeId: data.bussinessTypeId,
        shopDescription: data.shopDescription,
        binNo: data.binNo,
        shopCity: data.shopCity,
        shopState: data.shopState,
        shopZipCode: data.shopZipCode,
        shopAddress: data.shopAddress,
        isVerified: data.isVerified,
        isActive: data.isActive,
        ownerName: data.ownerName,
        ownerNidUrl: data.ownerNidUrl,
        shopBannerUrl: data.shopBannerUrl,
        bussinessDocUrl: data.bussinessDocUrl,
        sellerTypeId: data.sellerTypeId,
        sellerAccountNo: data.sellerAcNo,
        countryId: data.countryId,
        currency: data.currency
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }

  //
  updateSellerPassword = async (data) => {
    //////debugger;

    return await http
      .post("/api/Seller/ChangeSellerPassword", {
        sellerId: data.sellerId,
        sellerEmail: data.sellerEmail,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }

  //
  authenticateUser = async () => {
    return (
      (await localStorage.getItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration") > Date.now()
    )
  }

  //
  deauthenticateUser = async () => {
    ; (await localStorage.removeItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration")
    window.location = window.location.origin + "/"
  }

  //
  saveToken = async (token) => {
    ; (await localStorage.setItem("x-access-token", token)) &&
      localStorage.getItem("x-access-token-expiration")
  }

  //
  getToken = (async) => {
    return localStorage.getItem("x-access-token")
  }

  //
  retriveToken = (async) => {
    return this.getToken()
  }

  //
  retriveEmployeeId = (async) => {
    return this.getEmployeeId()
  }

  retriveRoleId = (async) => {
    return this.getRoleId()
  }

  getEmployeeId = (async) => {
    return localStorage.getItem("x-access-employeeId")
  }

  getRoleId = (async) => {
    return localStorage.getItem("x-access-roleId")
  }

  getSellerProfileById = async (userId) => {
    //////debugger;
    return await http.get(`api/Seller/GetSellerById?sellerId=${userId}`)
  }

  //
  getBankAccountByShopId = async (shopId) => {
    return await http.get(
      `api/Seller/GetAllSellerBankAccount?shopId=${shopId}`
    )
  }

  getCommissionSellerByShopId = async (shopId) => {
    return await http.get(
      `/api/Seller/GetAllSellerCommission?shopId=${shopId}`
    )
  }

  //
  getAddressByShopId = async (shopId, addressTypeId) => {
    return await http.get(
      `/api/Seller/GetAllSellerAddress?shopId=${shopId}&addressTypeId=${addressTypeId}`
    )
  }

  //
  getShopDetailsBySellerId = async (userId) => {
    return await http.get(`api/Seller/GetShopDetails?sellerId=${userId}`)
  }

  //
  checkShopUrlAvailable = async (data) => {
    //////debugger;
    return await http
      .post("api/Seller/ShopUrlAvailable", {
        shopUrl: data.shopUrl,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }

  //Seller Commission Percentage
  createCommissionPercentage = async (data) => {

    return await http.post("/api/Seller/AddOrEditCommissionPercentage", {
      sellerCommissionId: data.sellerCommissionId,
      localCommissionPercentage: data.localCommissionPercentage,
      globalCommissionPercentage: data.globalCommissionPercentage,
      aggrementDocument: data.aggrementDocument,
      details: data.details,
      shopId: data.shopId,
      sellerId: data.sellerId,
      isActive: data.isActive,
      isApprove: data.isApprove,
      status: data.status,
    })
  }

  updateCommissionPercentage = async (data) => {

    return await http.post("/api/Seller/AddOrEditCommissionPercentage", {
      sellerCommissionId: data.sellerCommissionId,
      shopId: data.shopId,
      sellerId: data.sellerId,
      localCommissionPercentage: data.localCommissionPercentage,
      globalCommissionPercentage: data.globalCommissionPercentage,
      aggrementDocument: data.aggrementDocument,
      details: data.details,
      isActive: data.isActive,
      isApprove: data.isApprove,
      status: data.status,
    })
  }

  getCommissionPercentage = async (shopId) => {
    return await http.get(`/api/Seller/GetAllSellerCommission?shopId=${shopId}&getAll=Y`)
  }

  getAllSellerCommission = async () => {
    return await http.get(`/api/Seller/GetAllSellerCommission`)
  }

}
export default new sellerProfileService()
