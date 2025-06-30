import { getRandomTableData } from '../../func/getRandomTableData';
import { Button, Table as TableAntd } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './table.scss';
import { useState } from 'react';
import { DataItem } from './types';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';

export function Table() {
  const [tableData, setTableData] = useState<DataItem[]>(getRandomTableData(200));

  
  const columns: ColumnsType<DataItem> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => date.toLocaleString(),
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Числовое значение',
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: 'Действие',
      key: 'action',
      render: (text, record) => (
        <>
          <button className="actionRow" onClick={() => alert(`Редактировать ${record.id}`)}>
            <EditTwoTone style={{ fontSize: '24px' }} />
          </button>
          <button className="actionRow" onClick={() => alert(`Удалить ${record.id}`)}>
            <DeleteTwoTone twoToneColor="#52ca52" style={{ fontSize: '24px' }} />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="tablePage">
      <div className="tableParamsContainer"><Button type='primary' shape='round' icon={<PlusOutlined />}>Добавить</Button></div>
      <div className="tableContainer">
        <TableAntd
          className="table"
          columns={columns}
          dataSource={tableData}
          rowKey="id"
          scroll={{ y: '60vh' }}
          pagination={false}
        ></TableAntd>
      </div>
    </div>
  );
}
