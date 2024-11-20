export const ReviewValidation = (payload: Record<string, any>) => {
    const {rate, short_review} = payload;
    const errorMessage = {
        rate: '',
        short_review: '',
    }
    let count = 0;
    if(rate <= 0) {
        errorMessage.rate = 'Please select rating';
        count++;
    }
    if(short_review.length <= 0){
        errorMessage.short_review = 'Short review is require'
        count++;
    }
    return {error: errorMessage, isValid: count === 0}
}

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
    const {size} = payload;
    const errorMessage = {
        size: '',
    }
    let count = 0;
    if(size <= 0) {
        errorMessage.size = 'Please select a size';
        count++;
    }
   
    return {error: errorMessage, isValid: count === 0}
}