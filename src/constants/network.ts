export const serverURL = import.meta.env.VITE_SERVER_URL;

if (!serverURL) {
  throw new Error('Server URL is not set');
}
