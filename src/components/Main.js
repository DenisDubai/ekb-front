import { SideMenu } from './SideMenu';
import { Filter } from './Filter';
import { Results } from './Results';
import { Row, Col, Spin, Button, Image } from 'antd';
import { useEffect, useState } from 'react';
import { getFilters } from '../services/main';
import useUrlState from '@ahooksjs/use-url-state';

export function Main() {
    // переменные состояния
    const [selectedCategory, setSelectedCategory ] = useState();
    const [filters, setFilters] = useState();
    const [mnfsList, setMnfsList] = useState();
    const [spinning, setSpinning] = useState(true);
    const [spinningRes, setSpinningRes] = useState(true);
    const [searchParams, setSearchParams] = useState();
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [state, setState] = useUrlState();

    const initialState = {
        actual: undefined,
        validMnf:undefined,
        name: undefined,
        mopstatus: undefined,
        page: undefined,
        validTu: undefined,
        deliveryprice: undefined,
        filter: undefined
    };

    useEffect(() => {

        setSpinning(true);
        setSpinningRes(true);
        
        if(state){
            getFilters(state).then(resp=>{setBreadcrumbs(resp.categorypath); setFilters(resp); setSelectedCategory(resp.categorypath[0]); setSpinning(false); setSpinningRes(false); })
            
        } else {
            getFilters({ categoryId: state?.categoryId, page: -1 })
            .then(resp => {
                setFilters(resp); 
                setSelectedCategory(resp.categorypath[0]);
                setBreadcrumbs(resp.categorypath);
                setSpinning(false);
                setSpinningRes(false);
            });
        }
    }, []);

    const onSelectCategory = (item, parent) => {
        setState(initialState);
        setSpinning(true);
        setSelectedCategory(item);
        getFilters({ categoryId: item?.key, page: -1 })
        .then(resp => {
            setBreadcrumbs(resp.categorypath);
            setFilters(resp); 
            setSpinning(false); 
            setSpinningRes(false); 
            setState({ categoryId: item?.key, page: -1 })
        })
    }

    const onSearch = (data) => {

        console.log(data)
        var rest = {};
        var main = {};
        
        const filter = [];
        for(var key in data){
            if(key.toString().charAt(0) == "i" ){
                if(data[key]){
                    filter.push(`${key}:${data[key]}`)
                    rest = {...rest, filter: filter}
                }
            } else if(key.toString().charAt(0) == "r") {
                if(data[key]){
                    
                    filter.push(`${key}:${data[key].min}~${data[key].max}`)
                    rest = {...rest, filter: filter}
                }
            } else {
                if(key == "deliveryprice" && data[key]){
                    main[key] = `${data.deliveryprice.min}~${data.deliveryprice.max}`
                } else {
                    main[key] = data[key]
                }
            }

        }

        console.log(rest)
        const params = data ? {
            ...main,
            ...rest,
            categoryId: selectedCategory.key ? selectedCategory.key : state?.categoryId
        } : {
            page: -1,
            categoryId: selectedCategory.key ? selectedCategory.key : state?.categoryId,
        }

        console.log(params)
        setState(params);


        if(data){
            setSearchParams(data);
        }
        setSpinningRes(true);
        getFilters(params).then(resp=>{ setFilters(resp); setSpinningRes(false)})
    }

    const onReset = () => {
        setState(initialState);
        setSpinningRes(true);
        getFilters({ categoryId: selectedCategory.key ? selectedCategory.key : state?.categoryId, page: -1 })
        .then(resp => { 
            setFilters(resp); 
            setSpinningRes(false)
        })
    }

    //вывод всех компонентов на страницу
    return(
        <Row gutter={[8, 16]}>
            <Col span={4} className='sideMenu'>
                <div>
                    <SideMenu onSelectCategory={(item, parent) => onSelectCategory(item, parent)}/>
                </div>
            </Col>
            {selectedCategory && <Col span={18}>
                <Row>
                    <Col span={24} className='filter'>
                        <div>
                            <Spin spinning={spinning}>
                                <Filter breadcrumbs={breadcrumbs} selectedCategory={selectedCategory} filters={filters} onSearch={data=>onSearch(data, 1)} onReset={onReset} state={state}/>
                            </Spin>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className='results'>
                        <div>
                            <Spin spinning={spinningRes}>
                                <Results mnfsList={filters?.mnfs} tusList={filters?.tus} columns={filters?.columns} dataSource={filters?.ekbs} onTblChng={page=> onSearch(searchParams, page)}/>
                            </Spin>
                        </div>
                    </Col>
                </Row>
            </Col>}
        </Row>
    )
}