import axios from "axios";
import { type User } from "../types/User";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const userService = {
  async getUserById(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },
};
