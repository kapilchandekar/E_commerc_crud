import * as Yup from "yup";
import {
  EMAIL_VALLATION_ERR,
  FIRST_NAME_MAX_VALIDATION_ERR,
  FIRST_NAME_MIN_VALIDATION_ERR,
  PASSWORD_REGEXP,
  PASSWORD_VALIDATION_ERR,
  REQUIRED_ERR,
} from "../../../constant/validationErrorConstant";

export const signUpValidation = Yup.object({
  name: Yup.string()
    .min(2, FIRST_NAME_MIN_VALIDATION_ERR)
    .max(20, FIRST_NAME_MAX_VALIDATION_ERR)
    .required(REQUIRED_ERR),
  emailId: Yup.string().email(EMAIL_VALLATION_ERR).required(REQUIRED_ERR),
  password: Yup.string()
    .matches(PASSWORD_REGEXP, PASSWORD_VALIDATION_ERR)
    .required(REQUIRED_ERR),
});
export const signInValidation = Yup.object({
  emailId: Yup.string().email(EMAIL_VALLATION_ERR).required(REQUIRED_ERR),
  password: Yup.string()
    .matches(PASSWORD_REGEXP, PASSWORD_VALIDATION_ERR)
    .required(REQUIRED_ERR),
});
