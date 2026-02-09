export interface User {
  id: string;
  firstName: string; 
  lastName: string;  
  email: string;    
  phone: string;    
}

export interface FormHandle {
  resetForm: () => void;
  setValues: (user: User) => void;
}