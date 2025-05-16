
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer' | 'guest';
  firstName?: string;
  lastName?: string;
}
