import * as yup from 'yup';

export default yup.object().shape({
  email: yup.string().required().email().max(30),
  password: yup.string().trim().required().min(6).max(30),
});
