// Test credentials - In a real app, this would be handled by a proper auth system
export const TEST_CREDENTIALS = {
  email: 'demo@tribes.com',
  password: 'Demo123!',
};

export function validateCredentials(email: string, password: string): boolean {
  return email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password;
}