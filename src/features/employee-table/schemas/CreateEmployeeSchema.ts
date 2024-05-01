import * as Yup from "yup";

export const CreateEmployeeSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email('Invalid email format').required("Required"),
});
