import {io} from 'socket.io-client';

export const BaseUrl = 'http://192.168.0.155:4000/api';
export const socket = io('http://192.168.0.155:4000');
