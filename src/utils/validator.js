const validator = require('validator');

exports.sellerRegister = function (input) {
  const errors = {};
  if (validator.isEmpty(input.first_name.trim())) {
    errors.first_name = 'First name required';
  }
  if (validator.isEmpty(input.last_name.trim())) {
    errors.last_name = 'Last name required';
  }
  if (validator.isEmpty(input.email.trim())) {
    errors.email = 'Email required';
  }
  if (validator.isEmpty(input.cpf.trim())) {
    errors.cpf = 'CPF required';
  }
  if (validator.isEmpty(input.gender.trim())) {
    errors.gender = 'Gender required';
  }
  if (validator.isEmpty(input.date_of_birth.trim())) {
    errors.date_of_birth = 'Date of Birth required';
  }
  if (validator.isEmpty(input.mobile.trim())) {
    errors.mobile = 'Mobile number required';
  }
  if (!validator.isLength(input.mobile, 10, 10)) {
    errors.mobile = 'Mobile number length should be 9 digits';
  }
  if (validator.isEmpty(input.password.trim())) {
    errors.password = 'Password required';
  }
  if (!validator.equals(input.password, input.confirm_password)) {
    errors.confirm_password = 'Passwords are not equal';
  }
  return errors;
};

exports.sellerLogin = function (input) {
  const errors = {};
  if (validator.isEmpty(input.mobile.trim())) {
    errors.mobile = 'Mobile number required';
  }
  if (validator.isEmpty(input.password.trim())) {
    errors.password = 'Password required';
  }

  return errors;
};

exports.selleradd_Product = function (input) {
  const errors = {};

  if (validator.isEmpty(input.category.trim())) {
    errors.category = 'category required';
  }
  if (validator.isEmpty(input.brand.trim())) {
    errors.brand = 'brand required';
  }
  if (validator.isEmpty(input.model.trim())) {
    errors.model = 'model required';
  }
  if (validator.isEmpty(input.actual_price.trim())) {
    errors.actual_price = 'actual_price required';
  }
  if (validator.isEmpty(input.offer_price.trim())) {
    errors.offer_price = 'offer_price required';
  }
  if (validator.isEmpty(input.productImage.trim())) {
    errors.productImage = 'productImage required';
  }
  if (validator.isEmpty(input.quantity.trim())) {
    errors.quantity = 'quantity required';
  }
  if (validator.isEmpty(input.description.trim())) {
    errors.description = 'description required';
  }

  return errors;
};

exports.sellerDelete_Product = function (input) {
  const errors = {};
  if (validator.isEmpty(input.id.trim())) {
    errors.id = 'Product Id required';
  }

  return errors;
};
