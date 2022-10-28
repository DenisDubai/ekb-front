import '../App.less';
// подключение компонентов antd
import { Form, Row, Col, Input, Button, Select, Checkbox, Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';


const { Option } = Select;

export function Filter(props) {
    
    //форма и переменные состояния
    const [form] = Form.useForm();
    const [extended, setExtended] = useState(false);
    
    //варианты значений перспективности компонента
    const [actuals, setActuals] = useState([
        {
            name: 'Нет',
            key: 'no'
        },
        {
            name: 'Да',
            key: 'yes'
        },
        {
            name: 'Не важно',
            key: 'nm'
        }
    ]);

    //варианты значений статуса компонентов
    const [statuses, setStatus] = useState([
        {
            name: 'Включен в МОП',
            key: 'ok'
        },
        {
            name: 'Не производится',
            key: 'notproduced'
        },
        {
            name: 'Производится в СНГ',
            key: 'notdomestic'
        },
        {
            name: 'Исключён из МОП',
            key: 'excommunicate'
        }
    ]);

    //рендеринг сжатой формы
    const renderForm = () => {
        return (
            <div>
                <Row>

                    {/* Отрисовка графы перспективность */}
                    <Col span={8}>
                        <Form.Item
                            label="Перспективность"
                            name="actual"
                        >
                            <Select>
                                {actuals?.map(item => (
                                    <Option key={item.key} value={item.key}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    
                    {/* Отрисовка графы статус */}                  
                    <Col span={8}>
                        <Form.Item
                            label="Статус"
                            name="mopstatus"
                        >
                            <Select maxTagCount={'responsive'} mode="multiple" showArrow>
                                {statuses?.map(item => (
                                    <Option key={item.key} value={item.key}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    {/* Отрисовка графы ТУ */}
                    <Col span={8}>
                        <Form.Item
                            label="ТУ"
                            name="validTu"
                        >
                            <Select maxTagCount={'responsive'} mode="multiple" showArrow>
                                {props?.filters?.tus?.map(tu => (
                                    <Option disabled={!tu.en} key={tu.item.Id} value={tu.item.Id}>{tu.item.Name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

            </div>
        )
    }

    //ренедеринг расширенной формы
    const renderExtendedForm = () => {
        return (
            <>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="Производитель"
                            name="validMnf"
                        >
                            <Select maxTagCount={'responsive'} mode="multiple" showArrow>
                                {props?.filters?.mnfs?.map(tu => (
                                    <Option disabled={!tu.en} key={tu.item.Id} value={tu.item.Id}>{tu.item.Name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Отличительный знак А"
                            name="columnsA"
                            disabled={!props?.filters?.columns[0].item.en}
                        >
                            {props?.filters?.columns[0].item.Values.map(signA => (
                                <Checkbox value={signA.item.Id}>{signA.item.Name}</Checkbox>
                            ))}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Отличительный знак Г"
                            name="columnsG"
                            disabled={!props?.filters?.columns[1].item.en}
                        >
                            {props?.filters?.columns[1].item.Values.map(signG => (
                                <Checkbox value={signG.item.Id}>{signG.item.Name}</Checkbox>
                            ))}
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Row>
                    <Col span={8}>
                        <Form.Item
                            label="Применяемость"
                            name="popularity"
                        >
                            <Input.Group compact>

                                <Input style={{ width: "40%", textAlign: 'center', margin: '0px 0.5px 0px 0px'}} placeholder="от" />
                                <Input
                                    className="site-input-split"
                                    style={{
                                        width: "20%",
                                        borderLeft: 0,
                                        borderRight: 0,
                                        pointerEvents: 'none',
                                        
                                    }}
                                    placeholder="~"
                                    disabled
                                    
                                />
                                <Input
                                    className="site-input-right"
                                    style={{
                                        width: "40%",
                                        textAlign: 'center',
                                    }}
                                    placeholder="до"
                                />
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Наличие"
                            name="priceinstock"
                        >
                            <Input.Group compact>

                                <Input style={{ width: "40%", textAlign: 'center', margin: '0px 0.5px 0px 0px' }} placeholder="от" />
                                <Input
                                    className="site-input-split"
                                    style={{
                                        width: "20%",
                                        borderLeft: 0,
                                        borderRight: 0,
                                        pointerEvents: 'none',
                                    }}
                                    placeholder="~"
                                    disabled
                                />
                                <Input
                                    className="site-input-right"
                                    style={{
                                        width: "40%",
                                        textAlign: 'center',
                                    }}
                                    placeholder="до"
                                />
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Сроки поставки"
                            name="deliverytime"
                        >
                            <Input.Group compact>

                                <Input style={{ width: "40%", textAlign: 'center', margin: '0px 0.5px 0px 0px' }} placeholder="от" />
                                <Input
                                    className="site-input-split"
                                    style={{
                                        width: "20%",
                                        borderLeft: 0,
                                        borderRight: 0,
                                        pointerEvents: 'none',
                                    }}
                                    placeholder="~"
                                    disabled
                                />
                                <Input
                                    className="site-input-right"
                                    style={{
                                        width: "40%",
                                        textAlign: 'center',
                                    }}
                                    placeholder="до"
                                />
                            </Input.Group>
                        </Form.Item>
                    </Col>
                </Row> */}
                <Row>
                    <Col span={8}>
                        <Form.Item
                            label="Стоимость поставки"
                            name="deliveryprice"
                        >
                            <Input.Group compact>

                                <Input style={{ width: "40%", textAlign: 'center', margin: '0px 0.5px 0px 0px' }} placeholder="от" />
                                <Input
                                    className="site-input-split"
                                    style={{
                                        width: "20%",
                                        borderLeft: 0,
                                        borderRight: 0,
                                        pointerEvents: 'none',
                                    }}
                                    placeholder="~"
                                    disabled
                                />
                                <Input
                                    className="site-input-right"
                                    style={{
                                        width: "40%",
                                        textAlign: 'center',
                                    }}
                                    placeholder="до"
                                />
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Название"
                            name="name"
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            </>
        )
    }

    const onExtend = () => { setExtended(!extended) }

    const onReset = () => {
        form.resetFields();
        props?.onReset();
    }

    const renderBreadcrumbs = () => {
        let path = [...props.breadcrumbs].reverse().map(item=> item['title']).join('/');
        return path;
         
    }

    //Отрисовка верхней навигации и кнопок фильтра
    return (
        <div>
            <span>{renderBreadcrumbs()}</span>
            <div className='selectedCategory' >
                <span>Отсортировано по категории:</span> <p>{props?.selectedCategory?.title}</p>
            </div>
            {/* <hr style={{ borderTop: '2px solid #353232', marginBottom: '2px' }} /> */}
                <Form form={form} layout="vertical" className='searchBar' onFinish={props?.onSearch}>
                    {renderForm()}
                    {extended ?
                        <div>
                            {renderExtendedForm('def')}
                            <Row>
                                <Col span={8}>
                                    <Button onClick={onExtend} className='extendSearch' type="link">
                                        Закрыть расширенный поиск
                                    </Button>
                                </Col>
                                <Col span={8} offset={8}>
                                    <div className='divBtn' style={{ float: 'right' }}>
                                            <Button className='resetBtn' onClick={onReset}>Сбросить</Button>
                                            <Button className='findBtn' htmlType="submit">Найти</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        :
                        <Row>
                            <Col span={8}>
                                <Button onClick={onExtend} className='extendSearch' type="link">
                                    Открыть расширенный поиск
                                </Button>
                            </Col>
                            <Col span={8} offset={8}>
                                <div className='divBtn' style={{ float: 'right' }}>
                                    <Button className='resetBtn'  onClick={onReset}>Сбросить</Button>
                                    <Button className='findBtn'  htmlType="submit">Найти</Button>
                                </div>
                            </Col>
                        </Row>
                    }
                </Form>
        </div>
    )
}