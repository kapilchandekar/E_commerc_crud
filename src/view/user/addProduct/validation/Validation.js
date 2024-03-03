import * as Yup from "yup";
import { FIRST_NAME_MAX_VALIDATION_ERR, FIRST_NAME_MIN_VALIDATION_ERR, REQUIRED_ERR } from "../../../../constant/validationErrorConstant";

export const addProductValidation = Yup.object({
  name: Yup.string()
    .min(2, FIRST_NAME_MIN_VALIDATION_ERR)
    .max(20, FIRST_NAME_MAX_VALIDATION_ERR)
    .required(REQUIRED_ERR),
  price: Yup.string().required(REQUIRED_ERR),
  category: Yup.string().required(REQUIRED_ERR),
  company: Yup.string().required(REQUIRED_ERR),
});
