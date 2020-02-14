const isEmpty = string => {
  if (string.trim()) {
    return false;
  }
  return true;
};

const isEmail = email => {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (email.match(regEx)) return true;
  return false;
};

exports.validateLogInData = data => {
  const { email, password } = data;
  let errors = {};

  if (isEmpty(email)) errors.email = "must not be empty";
  if (isEmpty(password)) errors.password = "must not be empty";

  return { errors, valid: Object.keys(errors).length === 0 };
};

exports.validateSignUpData = data => {
  const { email, password, confirmPassword, handle } = data;
  let errors = {};
  if (isEmpty(email)) errors.email = "must not be empty";
  if (!isEmail(email)) errors.email = "must be a valid emial address";
  if (isEmpty(password)) errors.password = "must not be empty";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords must match";
  if (isEmpty(handle)) errors.handle = "must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0
  };
};

exports.reduceUserDetails = data => {
  let userDetails = {};
  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http")
      userDetails.website = `http://${data.website.trim()}`;
    else userDetails.website = data.website.trim();
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};
