import axios from 'axios';

import { serverURL } from '@/constants';

export const axiosClient = axios.create({
  baseURL: serverURL,
});
