import { DataItem } from '../components/table/types';

export function getRandomTableData(count: number): DataItem[] {
  const DataItems: DataItem[] = [];

  for (let i = 1; i <= count; i++) {
    DataItems.push({
      id: crypto.randomUUID(),
      name: 'item ' + i,
      date: getRandomDate(new Date('2025-01-01'), new Date('2025-06-030')),
      value: Math.floor(Math.random() * 100),
    });
  }

  return DataItems;
}

function getRandomDate(dateStart: Date, dateEnd: Date): Date {
  return new Date(dateStart.getTime() + Math.random() * (dateEnd.getTime() - dateStart.getTime()));
}
