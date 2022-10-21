import { SideMenu } from './SideMenu';
import { Filter } from './Filter';
import { Results } from './Results';
import { Row, Col, Spin } from 'antd';
import { useState } from 'react';
import { getFilters } from '../services/main';

export function Main() {
    // переменные состояния
    const [selectedCategory, setSelectedCategory ] = useState();
    const [filters, setFilters] = useState();
    const [mnfsList, setMnfsList] = useState();
    const [spinning, setSpinning] = useState(true);
    const [spinningRes, setSpinningRes] = useState(true);
    const [searchParams, setSearchParams] = useState();


    const onSelectCategory = item => {
        setSpinning(true);
        setSelectedCategory(item);
        getFilters({ categoryId: item?.key, page: 0 }).then(resp=> {setFilters(resp); setSpinning(false); setSpinningRes(false); console.log(resp.columns)} )
    }

    const onSearch = (data, page) => {
        const params = data ? {
            validMnf: data.validMnf,
            validTu: data.validTu,
            page: page,
            categoryId: selectedCategory.key,
            popularity: data.popularity,
            actual: data.actual === 'no' ? 0 : 1,
            mopStatus: data.mopstatus,
            name: data.name,
        } : {
            page: page,
            categoryId: selectedCategory.key,
        }
        if(data){
            setSearchParams(data);
        }
        setSpinningRes(true);
        getFilters(params).then(resp=>{ setFilters(resp); setSpinningRes(false)})
    }

    const onReset = () => {
        setSpinningRes(true);
        getFilters({ categoryId: selectedCategory.key }).then(resp => { setFilters(resp); setSpinningRes(false)})
    }

    //вывод всех компонентов на страницу
    return(
        <Row gutter={[8, 16]}>
            <Col span={4} className='sideMenu'>
                <div>
                    <SideMenu onSelectCategory={onSelectCategory}/>
                </div>
            </Col>
            {selectedCategory && <Col span={18}>
                <Row>
                    <Col span={24} className='filter'>
                        <div>
                            <Spin spinning={spinning}>
                                <Filter selectedCategory={selectedCategory} filters={filters} onSearch={data=>onSearch(data, 1)} onReset={onReset}/>
                            </Spin>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className='results'>
                        <div>
                            <Spin spinning={spinningRes}>
                                <Results mnfsList={filters?.mnfs} tusList={filters?.tus} dataSource={filters?.ekbs} onTblChng={page=> onSearch(searchParams, page)}/>
                            </Spin>
                        </div>
                    </Col>
                </Row>
            </Col>}
        </Row>
    )
}