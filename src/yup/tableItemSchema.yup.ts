import * as yup from 'yup';

export const tableItemSchema = yup.object().shape({
  name: yup.string().required('Имя обязательно'),
  date: yup.date().typeError('Введите дату').required('Дата обязательна.'),
  value: yup
    .number()
    .typeError('Введите число')
    .required('Числовое значение обязательно'),
});
