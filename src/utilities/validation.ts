export const ReviewValidation = (payload: Record<string, any>) => {
  const { rate, short_review } = payload;
  const errorMessage = {
    rate: "",
    short_review: "",
  };
  let count = 0;
  if (rate <= 0) {
    errorMessage.rate = "Please select rating";
    count++;
  }
  if (short_review.length <= 0) {
    errorMessage.short_review = "Short review is require";
    count++;
  }
  return { error: errorMessage, isValid: count === 0 };
};

export const loginValidation = (payload: Record<string, any>) => {
  try {
    const { email, password } = payload;
    let count = 0;
    const errorMessage = {
      email: "",
      password: "",
    };
    if (email.length <= 0) {
      errorMessage.email = "Email is required.";
      count++;
    }
    if (password.length <= 0) {
      errorMessage.password = "Password is required.";
      count++;
    }
    return { error: errorMessage, isValid: count === 0 };
  } catch (e) {
    console.error(e);
  }
};

export const AddToCartValidation = (payload: Record<string, any>) => {
  const { size } = payload;
  const errorMessage = {
    size: "",
  };
  let count = 0;
  if (size <= 0) {
    errorMessage.size = "Please select a size";
    count++;
  }

  return { error: errorMessage, isValid: count === 0 };
};

export const AddOrderValidation = (payload: Record<string, any>) => {
  const { firstName, lastName, province, district, municipality, phone } =
    payload;
  const errorMessage = {
    firstName: "",
    lastName: "",
    province: "",
    district: "",
    municipality: "",
    phone: "",
  };
  let count = 0;
  if (firstName.length <= 0) {
    errorMessage.firstName = "Firstname is required!!!";
    count++;
  }
  if (lastName.length <= 0) {
    errorMessage.lastName = "Lastname is required!!!";
    count++;
  }
  if (province.length <= 0) {
    errorMessage.province = "Province is required!!!";
    count++;
  }
  if (district.length <= 0) {
    errorMessage.district = "District is required!!!";
    count++;
  }
  if (municipality.length <= 0) {
    errorMessage.municipality = "Municipality is required!!!";
    count++;
  }
  if (phone.length <= 0) {
    errorMessage.phone = "Phone number is required!!!";
    count++;
  }

  return { error: errorMessage, isValid: count === 0 };
};
