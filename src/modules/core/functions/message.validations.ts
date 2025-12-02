export const langMessages: {
  [key: string]: {
    required: string;
    email: string;
    min: (min: number) => string;
    max: (max: number) => string;
  };
} = {
  en: {
    required: 'this field is required.',
    email: 'invalid email address.',
    min: (min: number) => `must be at least ${min} characters.`,
    max: (max: number) => `must be less than ${max} characters.`,
  },
  es: {
    required: 'este campo es requerido.',
    email: 'el correo electrónico no es válido.',
    min: (min: number) => `debe contener al menos ${min} caracteres.`,
    max: (max: number) => `debe contener menos de ${max} caracteres.`,
  },
};
