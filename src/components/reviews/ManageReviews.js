
import axios from 'axios';

export class ManageReviews {
    getReviews() {
        return axios.get('../../../public/assets/data/customers.json')
                .then(res => res.data.data);
    }
}