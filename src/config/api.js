import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3001/api/v1';

axios.defaults.baseURL = 'https://api.eathouse.mx/api/v1/';

const api = {
  user: {
    async authentication(email, password) {
      try {
        const response = await axios.post(`/users/login`, { email, password });
        return response.data;
      } catch (error) {
        console.log("Error--->", error);
        return {
          ok: false,
        }
      }
    },
    async authenticationFacebook(token) {
      try {
        const response = await axios.post(`/users/login-facebook`, { access_token: token });
        return response.data;
      } catch (error) {
        return {
          ok: false,
        }
      }
    },
    async create(userData) {
      const response = await axios.post(`/users/signup`, userData);
      return response.data;
    },
    async get(id) {
      const response = await axios.get(`/users/${id}`);
      return response.data;
    },
    async createAddress(data) {
      const response = await axios.post(`/users/address`, data);
      return response.data;
    },
    async createAddressWithBusiness(data) {
      const response = await axios.post(`/users/link-business`, data);
      return response.data;
    },
    async getAddress() {
      const response = await axios.get(`/address`);
      return response.data;
    },
  },
  creditCard: {
    async create(data) {
      const response = await axios.post(`/credit-cards`, data);
      return response.data;
    },
    async getAll() {
      const response = await axios.get(`/credit-cards`);
      return response.data;
    }
  },
  dish: {
    async getAll() {
      const response = await axios.get(`/dishes`);
      return response.data;
    },
    async get(id) {
      const response = await axios.get(`/dishes/${id}`);
      return response.data;
    }
  },
  orders: {
    async getAll() {
      const response = await axios.get(`/orders`);
      return response.data;
    },
    async create(order) {
      const response = await axios.post('/orders', order);
      return response.data;
    },
    async estimateOrder(order) {
      // Calcula el costo de la orden
      const response = await axios.post('/orders/estimate-order', order);
      return response.data;
    },
    async getDetail(id) {
      const response = await axios.get(`/orders/order-detail/${id}`);
      return response.data;
    },
    async getSchedules() {
      const response = await axios.get('/orders/schedules');
      return response.data;
    }
  },
  business: {
    async getAll() {
      const response = await axios.get('/bussines');
      return response.data;
    }
  }
};

export default api;
