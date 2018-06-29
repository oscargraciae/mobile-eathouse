import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
  const errors = {};

  if(Validator.isEmpty(data.street)) {
    errors.street = "La calle y el Nº es obligatorio. ";
  }

  if(Validator.isEmpty(data.area)) {
    errors.area = "La colonia es obligatoria. "
  }

  if(Validator.isEmpty(data.phone)) {
    errors.phone = "El teléfono es obligatorio. "
  }

  // if(Validator.isEmpty(data.zipcode)) {
  //   errors.zipcode = "El codigo postal es obligatorio. "
  // }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
}