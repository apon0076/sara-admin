import http from "../../utils/httpClient";

class addressService {
    getAddressById = async (id) => {
        return await http.get(`/api/Customer/GetAddress?customerAddressId=${id}`);
    };

    getAllCountry = async () => {
        return await http.get("/api/DivisionCitiesArea/AllCountries?getAll=Y");
    };

    getAllCity = async (countryId) => {
        return await http.get(`/api/DivisionCitiesArea/AllCities?countryId=${countryId}&getAll=Y`);
    };

    getAllArea = async (cityId) => {
        return await http.get(`/api/DivisionCitiesArea/AllAreas?cityId=${cityId}&getAll=Y`);
    };
}

export default new addressService();
