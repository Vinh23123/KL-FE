export const VALIDATOR = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  tenDigits: /^\d{10}$/,
};
