import { getRandomTableData } from '../../func/getRandomTableData';
import { Button, Input, Table as TableAntd } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { TableItem } from '../../types/tableItem';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import './table.scss';
import { useModal } from 'hooks/useModal';
import { AddEditTableItemModal } from 'modals/addEditTableItemModal/addEditTableItemModal';

export function Table() {
  const [tableData, setTableData] = useState<TableItem[]>(getRandomTableData(8));
  const [choiseItemId, setChoiseItemId] = useState<string | null>();
  const [choiseItem, setChoiseItem] = useState<TableItem | null>();
  const [dataFromModal, setDataFromModal] = useState<TableItem | null>();
  const [searchText, setSearchText] = useState<string>('');
  const [filteredTableData, setFilteredTableData] = useState<TableItem[]>();

  const { switchModal, handleSwitchModal, handleCloseModal } = useModal();

  const columns: ColumnsType<TableItem> = [
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
      render: (date: Date) => date.toLocaleDateString(),
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Число',
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: 'Действие',
      key: 'action',
      render: (text, record) => (
        <>
          <button className="actionRow" onClick={() => handleEditTableItem(record.id)}>
            <EditTwoTone style={{ fontSize: '24px' }} />
          </button>
          <button className="actionRow" onClick={() => handleDeleteItem(record.id)}>
            <DeleteTwoTone twoToneColor="#52ca52" style={{ fontSize: '24px' }} />
          </button>
        </>
      ),
    },
  ];

  const handleAddNewTableItem = () => {
    setChoiseItemId(null);
    handleSwitchModal('AddNewItemToTable');
  };

  const handleEditTableItem = (itemId: string) => {
    setChoiseItemId(itemId);
    setChoiseItem(tableData.find((item) => item.id === itemId));
    handleSwitchModal('EditItemInTable');
  };

  const handleDeleteItem = (itemIdToDelete: string) => {
    setTableData((prev) => prev.filter((item) => item.id != itemIdToDelete));
  };

  useEffect(() => {
    if (searchText.length === 0) {
      setFilteredTableData(tableData);
    } else {
      setFilteredTableData(
        tableData.filter((item) => {
          console.log(item.date.toDateString());
          if (
            item.name.toLowerCase().includes(searchText.toLocaleLowerCase().trim()) ||
            item.value.toString().toLowerCase().includes(searchText.toLocaleLowerCase().trim()) ||
            item.date
              .toLocaleDateString()
              .toLowerCase()
              .includes(searchText.toLocaleLowerCase().trim())
          )
            return item;
        }),
      );
    }
  }, [searchText, tableData]);
  useEffect(() => {
    if (!dataFromModal) return;

    if (dataFromModal.id) {
      setTableData((prev) => [...prev, dataFromModal]);
    } else {
      setTableData((prev) =>
        prev.map((item) =>
          item.id === choiseItemId
            ? {
                id: item.id,
                name: dataFromModal.name,
                value: dataFromModal.value,
                date: dataFromModal.date,
              }
            : item,
        ),
      );
    }
  }, [dataFromModal]);

  return (
    <div className="tablePage">
      <div className="tableParamsContainer">
        <Input
          className="searchInput"
          placeholder="Введите текст"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          onClick={handleAddNewTableItem}
        >
          Добавить
        </Button>
      </div>
      <div className="tableContainer">
        <TableAntd
          className="table"
          columns={columns}
          dataSource={filteredTableData}
          rowKey="id"
          scroll={{ y: '60vh' }}
          pagination={false}
        ></TableAntd>
      </div>
      {switchModal === 'AddNewItemToTable' && (
        <AddEditTableItemModal
          handleCloseModal={handleCloseModal}
          setDataFromModal={setDataFromModal}
          actionType="AddNewItemToTable"
        />
      )}
      {switchModal === 'EditItemInTable' && (
        <AddEditTableItemModal
          handleCloseModal={handleCloseModal}
          setDataFromModal={setDataFromModal}
          oldItem={choiseItem}
          actionType="EditItemInTable"
        />
      )}
    </div>
  );
}
