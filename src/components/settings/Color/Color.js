import http from "../../utils/httpClient";

export class Color {
    getColor = async () => {
        return await http.get("/api/Color")
        .then(res => res.data);
    }
}