import {io} from 'socket.io-client';

export const BaseUrl = 'https://foodappserver-1t4a.onrender.com/api';
export const socket = io('https://foodappserver-1t4a.onrender.com');
// export const BaseUrl = 'http://192.168.0.155:4000/api';
// export const socket = io('http://192.168.0.155:4000');

export const updateUserApi = (id: string) => BaseUrl + `/customer/update/${id}`;
export const PlaceOrderApi = BaseUrl + '/customer/placeOrder';
export const GetAllOrdersApi = BaseUrl + '/common/getAllOrders';
export const updataOrderApi = (orderId: string) =>
  BaseUrl + `/common/updateOrder/${orderId}`;
