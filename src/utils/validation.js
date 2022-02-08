import { useCallback, useState } from "react";

function validateEmptyInput(value) {
  let isValidated = false;
  if (value !== null && value !== '') {
    isValidated = true;
  }
  return isValidated;
};

function useForm() {
  const [values, setValues] = useState({});
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues}
};

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage});
    setIsValid(target.closest('form').checkValidity());
  };
  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);
  return { values, handleChange, errors, isValid, resetForm };
}

export { validateEmptyInput, useForm, useFormWithValidation };
