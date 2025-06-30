import { TableItem } from '../../types/tableItem';

export interface Props {
  handleCloseModal: () => void;
  setDataFromModal: (item: TableItem) => void;
  oldItem?: TableItem | null;
  actionType: string;
}
