export const authService = {
  login: async (email: string, password: string):Promise<{token: string, user: {name: string, email: string}}> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          resolve({
            token: 'mock-jwt-token-12345',
            user: { name: 'SOC Analyst', email }
          });
        } else {
          reject(new Error('Invalid credentials. Password must be at least 6 characters.'));
        }
      }, 800); // simulate network delay
    });
  },

  register: async (name: string, email: string, password: string):Promise<{token: string, user: {name: string, email: string}}> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          resolve({
            token: 'mock-jwt-token-12345',
            user: { name, email }
          });
        } else {
          reject(new Error('Invalid registration details.'));
        }
      }, 1000);
    });
  }
};
