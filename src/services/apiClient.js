/**
 * Multi-Tenant SaaS API Client
 * Note: hospital_id received from login API is passed in all APIs as the Bearer token.
 */

class ApiClient {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1';
  }

  getHeaders(customHeaders = {}) {
    // Retrieve stored hospital_id from login API response
    const hospitalId = localStorage.getItem('hospital_id') || '';
    const authDataRaw = localStorage.getItem('hospital_saas_auth_data');
    let token = '';

    if (authDataRaw) {
      try {
        const parsed = JSON.parse(authDataRaw);
        token = parsed.token || '';
      } catch (e) {
        console.error('Failed to parse auth token', e);
      }
    }

    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders
    };

    // Pass hospital_id as Bearer token as requested
    if (hospitalId) {
      headers['Authorization'] = `Bearer ${hospitalId}`;
      headers['X-Hospital-ID'] = hospitalId;
    } else if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = `${this.baseUrl}${endpoint}${query ? `?${query}` : ''}`;
    console.info(`[API GET] ${url}`, { headers: this.getHeaders() });
    return { success: true };
  }

  async post(endpoint, data = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    console.info(`[API POST] ${url}`, { headers: this.getHeaders(), payload: data });
    return { success: true, data };
  }
}

export const apiClient = new ApiClient();
export default apiClient;
