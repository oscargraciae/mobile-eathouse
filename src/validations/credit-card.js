import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default (data) => {
  const errors = {};

  if(Validator.isEmpty(data.name)) {
    errors.name = "Nombre de tarjetahabiente inválido";
  }

  if(Validator.isEmpty(data.creditCardNumber)) {
    errors.creditCardNumber = "Número de tarjeta inválido";
  }

  if(Validator.isEmpty(data.monthEx)) {
    errors.monthEx = "Mes de vencimiento inválido";
  }

  if(Validator.isEmpty(data.yearEx)) {
    errors.yearEx = "Año de vencimiento inválido";
  }

  if(Validator.isEmpty(data.cvv)) {
    errors.cvv = "CVV debe tener de 3 o 4 dígitos";
  }
  
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
}