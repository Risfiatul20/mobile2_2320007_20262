// IP Wi-Fi Laptop: 192.168.43.208
// Pastikan HP dan Laptop terhubung ke Wi-Fi yang sama (192.168.43.x)
// Jika pakai emulator Android Studio, ganti dengan: http://10.0.2.2:8000/api
export const API_BASE_URL = "http://192.168.43.208:8000/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  PROFILE: `${API_BASE_URL}/profile`,
  LOGOUT: `${API_BASE_URL}/logout`,
};
