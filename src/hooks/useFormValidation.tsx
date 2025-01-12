import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { validationProps } from "../types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//create schema for each input
const customValidationSchema = (fields: Record<string, string>) => {
  const schemaFields: Record<string, Yup.StringSchema>  = {};

  Object.keys(fields).forEach((field) => {
    switch (field) {
      case "email":
        schemaFields[field] = Yup.string()
          .email("ایمیل نامعتبر است")
          .required("ایمیل الزامی است")
          .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "فقط حروف انگلیسی و اعداد مجاز است"
          );
        break;
      case "password":
        schemaFields[field] = Yup.string()
          .required("وارد کردن رمز عبور  الزامی است")
          .matches(
            /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]+$/,
            "(حاوی حروف انگلیسی- حاوی اعداد- حداقل ۸ کاراکتر)"
          )
          .min(8, "پسورد باید حداقل ۸ کاراکتر باشد");
        break;

      case "fullname":
        schemaFields[field] = Yup.string()
          .required("وارد کردن نام الزامی است")
          .matches(/^[a-zA-z]+$/, "فقط حروف انگلیسی مجاز است");
        break;

      case "number":
        schemaFields[field] = Yup.string().required(
          "وارد کردن شماره تلفن الزامی است"
        ).min(10,'وارد کردن شماره تلفن الزامی است');
        break;

      default:
        schemaFields[field] = Yup.string().required(`${field} الزامی است.`);
        break;
    }
  });
  return Yup.object().shape(schemaFields);
};

const useFormValidation = (fields:  Record<string, string>) => {
  const validationSchema = customValidationSchema(fields);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<validationProps>({ resolver: yupResolver(validationSchema) });

  const onSubmit = () => {
    toast.success("فرم با موفقیت ارسال شد");
  };

  const onError = () => {
    toast.error("لطفا فرم را کامل پر کنید");
  };
  return { register, handleSubmit, errors, onError, onSubmit };
};

export default useFormValidation;
