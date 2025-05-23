const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const fetchDisasters = async () => {
  const response = await fetch(`${API_BASE_URL}/disasters`);
  if (!response.ok) throw new Error('Failed to fetch disasters');
  return await response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) throw new Error('Login failed');
  
  const data = await response.json();
  
  // Store the token in localStorage
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  
  return data;
};

// Add a function to check token validity
export const validateToken = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }
  
  const response = await fetch(`${API_BASE_URL}/auth/validate`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    localStorage.removeItem('token');
    throw new Error('Invalid token');
  }
  
  return await response.json();
};
