import axios, { AxiosResponse } from 'axios';
import { Result } from '../interfaces/result.interface';
const instance = axios.create({
	baseURL: 'https://dummyjson.com/',
	timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody)
};

export const Produts = {
	getProducts: (limit: number = 10, skip: number = 0): Promise<Result> => requests.get(`products?limit=${limit}&skip=${skip}`),
	searchProducts: (search: string, limit: number = 10, skip: number = 0): Promise<Result> => requests.get(`products/search?q=${search}&limit=${limit}&skip=${skip}`)
};