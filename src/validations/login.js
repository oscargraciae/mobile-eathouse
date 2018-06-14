import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
  const errors = {};

  if(Validator.isEmpty(data.email)) {
    errors.email = "El correo eletrónico es obligatorio. ";
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = "La dirección de correo electrónico es invalida. "
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = "La contraseña es obligatoria. ";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}