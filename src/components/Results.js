import '../App.less';
import { Table } from 'antd';
import { useState } from 'react';


//функция вывода результирующей таблицы
export function Results(props) {

  const [page, setPage] = useState(1);
  const  [pageSize, setPageSize]= useState(10);

  //столбцы таблицы
  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ТУ',
      key: 'tuIdList',
      render: record => {
        return record.tuIdList.map(i => { return props?.tusList.find(tu => tu.item.Id === i).item.Name }).join(' ')
      }
    },
    {
      title: 'Производитель',
      key: 'mnfs',
      render: record => {
        return props?.mnfsList?.find(mn => mn.item.Id === record.mnfId).item.Name
      }
    },
    {
      title: 'Применяемость',
      key: 'popularity',
      render: record => { return record.popularity.UsedInProducts === 0 ? 'Не применяется' : record.popularity.UsedInProducts }
    },
    {
      title: 'Отличительный знак А',
      key: 'signA',
      render: record => {
        const [, signA] = Object.entries(record.parVals)[0]
        return signA[0].Val.Id === 2 ? 'Нет' : 'Да'
      }
    },
    {
      title: 'Отличительный знак Г',
      key: 'signG',
      render: record => {
        const [, signG] = Object.entries(record.parVals)[1]
        return signG[0].Val.Id === 2 ? 'Нет' : 'Да'
      }
    },
    {
      title: 'Наличие, сроки и стоимость поставки',
      key: 'availability',
      render: record => {
        const stock = record.availability.PiecesInStock === 0 ? 'Склад: нет в наличии;' : record.availability.PiecesInStock;
        const time = record.availability.DeliveryTime == null ? '--' : record.availability.DeliveryTime;
        const price = record.availability.DeliveryPrice == null ? '--' : record.availability.DeliveryPrice;
        return `${stock} ${time} ${price}`
      }
    },
  ];

  const handleTableChange = (newPagination, filters, sorter) => {
    props?.onTblChng(newPagination?.current);
    setPage(newPagination.current)
    console.log('Page')
  };

  //отрисовка таблицы
  return (
    <div>
      <Table 
      rowClassName={(record, index) => index % 2 === 0 ? 'rowLight' : 'rowDark'} 
      pagination={{
        current: page,
        pageSize: pageSize,
      }} 
      className='resultTbl'
      dataSource={props?.dataSource} 
      onChange={handleTableChange}
      columns={columns} />
    </div>
  )
}