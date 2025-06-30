import { useForm } from 'react-hook-form';
import { Props } from './types';
import { TableItem, TableItemForForm } from '../../types/tableItem';
import { yupResolver } from '@hookform/resolvers/yup';
import { tableItemSchema } from 'yup/tableItemSchema.yup';
import './addEditTableItemModal.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getStringDateByDateObj } from 'func/getStingDateByDateObj';

export function AddEditTableItemModal(props: Props) {
  const [shake, setShake] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<TableItemForForm, 'id'>>({
    resolver: yupResolver(tableItemSchema),
    defaultValues: props.oldItem
      ? {
          name: props.oldItem.name,
          value: props.oldItem.value,
          date: getStringDateByDateObj(props.oldItem.date),
        }
      : undefined,
  });

  const onSubmit = (data: Omit<TableItemForForm, 'id'>) => {
    if (props.actionType === 'AddNewItemToTable') {
      const item: TableItem = {
        ...data,
        date: new Date(data.date),
        id: crypto.randomUUID(),
      };
      props.setDataFromModal(item);
    } else if (props.actionType === 'EditItemInTable') {
      const item: TableItem = {
        ...data,
        date: new Date(data.date),
        id: '',
      };
      props.setDataFromModal(item);
    } else {
      alert('Неизвестное действие');
    }
    props.handleCloseModal();
  };

  useEffect(() => {
    if (errors.name || errors.value || errors.date) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 800);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <div
      className="modalWindow"
      onClick={() => {
        props.handleCloseModal();
      }}
    >
      <div
        className="modalContainer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modalHeader">
          <h3 className="modalName">
            {props.actionType === 'AddNewItemToTable' ? 'Новый элемент' : 'Редактирование элемента'}
          </h3>
          <button className="closeModal" onClick={() => props.handleCloseModal()}>
            <CloseCircleOutlined style={{ color: 'white', fontSize: '26px' }} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.name ? (
            <label className="labelError">* {errors.name.message}</label>
          ) : (
            <label className="label">Имя</label>
          )}
          <input type="text" {...register('name')} placeholder="Имя" className="input" />

          {errors.date ? (
            <label className="labelError">* {errors.date.message}</label>
          ) : (
            <label className="label">Дата</label>
          )}
          <input type="date" {...register('date')} placeholder="Дата" className="input" />

          {errors.value ? (
            <label className="labelError">* {errors.value?.message}</label>
          ) : (
            <label className="label">Число</label>
          )}
          <input
            type="number"
            {...register('value')}
            placeholder="Числовое значение"
            className="input"
          />
          <button className={`submitButton ${shake ? 'shake-horizontal' : ''}`} type="submit">
            Подтвердить
          </button>
        </form>
      </div>
    </div>
  );
}
