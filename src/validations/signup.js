import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'Nombre obligatorio.';
  }
  
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Apellido obligatorio.';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Debes indicar un correo electrónico.';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Introduce un correo electronico valido.';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Contraseña obligatoria.';
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
