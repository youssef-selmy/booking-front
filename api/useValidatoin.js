import { useState } from "react";

const useValidation = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const validate = (key, invalidCondition, msg) => {
    if (invalidCondition) {
      setValidationErrors((prev) => ({
        ...prev,
        [key]: msg,
      }));
      return false;
    }

    setValidationErrors((prev) => {
      const temp = { ...prev };
      delete temp[key];
      return temp;
    });
    return true;
  };

  const validatePassword = (password) =>
    validate(
      "password",
      password.length < 6,
      "Password must be at least 6 characters",
    );

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validate("email", !emailRegex.test(email), "Please enter a valid email");
  };

  const clearErrors = () => setValidationErrors({});

  return {
    validationErrors,
    validate,
    clearErrors,
    validatePassword,
    validateEmail,
  };
};

export default useValidation;
