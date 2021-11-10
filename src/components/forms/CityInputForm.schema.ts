import * as Yup from "yup";

//Yup Validation for city input form
export const CityInputFormSchema = Yup.object().shape({
  city: Yup.string().required("A valid City is required!"),
});
