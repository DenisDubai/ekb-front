import '../App.less';
import { Table, Tooltip  } from 'antd';
import { useState } from 'react';

//функция вывода результирующей таблицы
export function Results(props) {

  const [page, setPage] = useState(1);

  const dynamicColumns = props?.columns?.map(item=> {
    let unit = item?.item['Units']?.find(un => un['Multiplier'] == item?.item['DefaultMultiplier']);

    let obj = {
      title: unit ? `${item?.item['Short']}, ${unit['Name']}` : item?.item['Short'],
      ellipsis: true,
      width: 150,
      render: element => 
      { 
        let rootEl = element.parVals;
        let key = item?.item['Id']; //2. 450, 3
        let res = rootEl[key];

        if(res?.length > 0){
          if(key == 2 || key == 3){
            let val = item?.item['Values'][0]
            return <a href='https://chipinfo.pro/package/chip/201.14-1,2,12.gif' target="_blank">{val['item']['Name']}</a> 
          }
          if(key == 450 
            || key == 451 
            || key == 456 
            || key == 242 
            || key == 79 
            || key == 328 
            || key == 329 
            || key == 332
            || key == 415
            || key == 56) {
            let minval = 0;
            let maxval = 0;

            item?.item['Units'].map(item => {
              if(item['MinValue'] <= res[0]['MinVal'] && item['MaxValue'] >= res[0]['MinVal']){
                minval = res[0]['MinVal'] / item['Multiplier'] + ' ' + item['Name']
              }
              if(item['MinValue'] <= res[0]['MaxVal'] && item['MaxValue'] >= res[0]['MaxVal']){
                maxval = res[0]['MaxVal'] / item['Multiplier'] + ' ' + item['Name']
              }
            })
            //take care of Units
            return minval + '-' + maxval
          }
          if(key == 452 
            || key == 453 
            || key == 455 
            || key == 457
            || key == 459 
            || key == 460 
            || key == 461
            || key == 462 
            || key == 463 
            || key == 464
            ){
            let arr = []
            res?.map(res =>{arr.push(res['Val'] + ';')})
            return arr
          }
          if(key == 454 || key == 219 || key == 220 || key == 4 || key == 58){
            let val = ''

            item?.item['Values'].map(item => {if(res[0]['Val']['Id'] == item?.item['Id']){ val = item?.item['Name'] }})
            return val
          }

          if(key == 240 
            || key == 244 
            || key == 245 
            || key == 247 
            || key == 249 
            || key == 250 
            || key == 159 
            || key == 283 
            || key == 323 
            || key == 327 
            || key == 326
            || key == 334
            || key == 336
            || key == 341
            || key == 5
            || key == 215
            || key == 417
            || key == 157
            || key == 25
            || key == 221
            || key == 73
            || key == 223
            || key == 224
            || key == 59
            || key == 61
            || key == 62
            || key == 60
            || key == 63
            || key == 64
            || key == 66
            || key == 5
            || key == 26
            || key == 27
            
            ) {
            let val = 0;

            item?.item['Units'].map(item => {
              if(item['MinValue'] <= res[0]['Val'] && item['MaxValue'] >= res[0]['Val']){
                val = res[0]['Val'] / item['Multiplier'] + ' ' + item['Name']
              }
            })
            
            return val
          }



         
          //return res[0]['MinVal'] + '-' + res[0]['MaxVal']
        }
      return null
}   
 }
    return obj;
    });
  //столбцы таблицы
  const staticColumns = [
    {
      title: 'Название',
      key: 'name',
      className: 'names',
      ellipsis: true,
      width: 150,
      render: element => {
        const text = `${element.status['Actual'] ? 'Перспективный' : 'Неперспективный'}; ${element.status['MopStatus'] == 0 ? 'Включен в МОП' : 'Не включен в МОП'}`
        return (<Tooltip placement="topLeft" title={text}>
          <span disabled={element?.status['Actual']}>{element.name}</span>
        </Tooltip>)
        }
    },
    {
      title: 'ТУ',
      key: 'tuIdList',
      className: 'tus',
      render: record => {
        return record.tuIdList.map(i => { return props?.tusList.find(tu => tu.item.Id === i).item.Name }).join(' ')
      },
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Производитель',
      key: 'mnfs',
      render: record => {
        return props?.mnfsList?.find(mn => mn.item.Id === record.mnfId).item.Name
      },
      ellipsis: true,
      width: 350,
    },
  ];

  const columns = dynamicColumns ? staticColumns.concat(dynamicColumns) : staticColumns;


  const handleTableChange = (newPagination, filters, sorter) => {
    props?.onTblChng(newPagination?.current);
    setPage(newPagination.current)
  };

  //отрисовка таблицы
  return (
    <div>
      <div class='CountElements'>Найдено элементов: {props?.dataSource?.length}</div>
      <Table 
      rowClassName='rowDark'
      expandable={{
        expandIconAsCell: false,
        expandIconColumnIndex: -1,
        expandedRowRender: record => <p>{record.description}</p>,
        defaultExpandAllRows: true
      }}
      pagination={{
        current: page,
      }} 
      className='resultTbl'
      // scroll={{x: 'calc(600px + 50%)'}}
      dataSource={props?.dataSource} 
      onChange={handleTableChange}
      columns={columns} />
    </div>
  )
}