import { getRandomTableData } from '../../func/getRandomTableData';
import { Table as TableAntd } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './table.scss';
import { useState } from 'react';
import { DataItem } from './types';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

export function Table() {
  const [tableData, setTableData] = useState<DataItem[]>(getRandomTableData(200));

  const columns: ColumnsType<DataItem> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => date.toLocaleString(),
    },
    {
      title: 'Числовое значение',
      dataIndex: 'value',
      key: 'value',
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
      <div className="tableParamsContainer"></div>
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
