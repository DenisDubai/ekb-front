import "../App.less";
// подключение компонентов antd
import {Form,Row,Col,
  Input,Button,Select,Checkbox,Breadcrumb,InputNumber} from "antd";
import { useEffect, useState } from "react";


const { Option } = Select;

export function Filter(props) {
  //форма и переменные состояния
  const [form] = Form.useForm();
  const [extended, setExtended] = useState(false);

  console.log(props)
  //варианты значений перспективности компонента
  const [actuals, setActuals] = useState([
    {
      name: "Нет",
      key: "no",
      value: false,
    },
    {
      name: "Да",
      key: "yes",
      value: true,
    },
    // {
    //     name: 'Не важно',
    //     key: 'nm'
    // }
  ]);

  //варианты значений статуса компонентов
  const [statuses, setStatus] = useState([
    {
      name: "Включен в МОП",
      key: "ok",
    },
    {
      name: "Не производится",
      key: "notproduced",
    },
    {
      name: "Производится в СНГ",
      key: "notdomestic",
    },
    {
      name: "Исключён из МОП",
      key: "excommunicate",
    },
  ]);

//   useEffect(() => {
//     window.location.reload();
// }, []);

  //рендеринг сжатой формы
  const renderForm = () => {
    return (
      <div>
        <Row>
          <Col span={8}>
            <Form.Item label="Название" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Производитель" name="validMnf">
              <Select maxTagCount={"responsive"} mode="multiple" showArrow>
                {props?.filters?.mnfs?.map((tu) => (
                  <Option disabled={!tu.en} key={tu.item.Id} value={tu.item.Id}>
                    {tu.item.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {/* Отрисовка графы перспективность */}
          <Col span={8}>
            <Form.Item label="Перспективность" name="actual">
              <Select
                defaultValue={
                  props?.state?.actual &&
                  actuals.find((item) => item.value == !!props?.state?.actual)
                }
              >
                {actuals?.map((item) => (
                  <Option key={item.key} value={item.value}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          
        </Row>
      </div>
    );
  };

  //ренедеринг расширенной формы
  const renderExtendedForm = () => {
    var price = props?.state?.deliveryprice?.split('~');
    return (
      <>
        <Row>
          {/* Отрисовка графы статус */}
          <Col span={8}>
            <Form.Item label="Статус" name="mopstatus">
              <Select
                defaultValue={
                  props?.state?.mopstatus &&
                  statuses.find((item) => item.key == props?.state?.mopstatus)
                }
                maxTagCount={"responsive"}
                mode="multiple"
                showArrow
              >
                {statuses?.map((item) => (
                  <Option key={item.key} value={item.key}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Отрисовка графы ТУ */}
          <Col span={8}>
            <Form.Item label="ТУ" name="validTu">
              <Select
                defaultValue={
                  props?.state?.tus &&
                  props?.filters?.tus?.find(
                    (item) => item.item.Id == props?.state?.validTu
                  )
                }
                maxTagCount={"responsive"}
                mode="multiple"
                showArrow
              >
                {props?.filters?.tus?.map((tu) => (
                  <Option disabled={!tu.en} key={tu.item.Id} value={tu.item.Id}>
                    {tu.item.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Стоимость поставки" name="deliveryprice">
              <Input.Group style={{ display: "flex" }} compact>
                <Form.Item
                  style={{ textAlign: "center", width: "40%" }}
                  name={["deliveryprice", "min"]}
                >
                  <Input defaultValue={props?.state?.deliveryprice && price[0]} placeholder="от" />
                </Form.Item>

                <Form.Item
                  style={{
                    flexGrow: 1,
                    pointerEvents: "none",
                  }}
                >
                  <Input placeholder="~" disabled />
                </Form.Item>

                <Form.Item
                  className="site-input-right"
                  style={{
                    width: "40%",
                    textAlign: "center",
                  }}
                  name={["deliveryprice", "max"]}
                >
                  <Input defaultValue={props?.state?.deliveryprice && price[1]} placeholder="до" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
          
        </Row>
        <Row xs={3}>
          {renderDynamicFilters("optional")}
          {renderDynamicFilters("mesural")}
        </Row>
      </>
    );
  };

  const renderDynamicFilters = (type) => {
    const arr = [];
    const parvals = props?.filters?.ekbs
      .map((item) => Object.keys(item.parVals))
      .flat(1);

    const ids = parvals.filter((item, pos) => {
      return parvals.indexOf(item) == pos;
    });

    const filtersAv = props?.filters?.columns
      .filter((col) => {
        if (ids.includes(col.item["Id"].toString())) {
          if (col.en === true) {
            return col.item;
          }
        }
      })
      .map((item) => item.item);

    const optionalFilters = filtersAv.filter((item) => item["Values"]);
    const mesuralFilters = filtersAv.filter((item) => item["Units"]);

    let defaultVal = [];

    if(props?.state?.filter?.length > 0){
      const filter = props?.state?.filter;

      for(let i = 0; i < props?.state?.filter?.length; i++){
        const arr = filter[i].split(':');
        const obj = { [arr[0].substring(1)]: arr[1] }
        defaultVal.push(obj)
      }
    }



    if (type == "optional") {
      return (
        <>
          {optionalFilters.map((item) => {
            return (
              <Col span={8}>
                <Form.Item label={item["Short"]} name={`i${item["Id"]}`}>
                  <Select defaultValue={props?.state?.filter && defaultVal.find(({ key, value }) => [key] == item["Id"])} maxTagCount={"responsive"} showArrow>
                    {item["Values"]?.map((val) => (
                      <Option key={val.item.Id} value={val.item.Id}>
                        {val.item.Name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {mesuralFilters.map((item) => {
            const unit = item['Units'].find(un => un['Multiplier'] == item['DefaultMultiplier'])
            return (
              <Col span={8}>
                <Form.Item label={`${item["Short"]}, ${unit['Name']}`} name={`r${item["Id"]}`}>
                  <Input.Group style={{ display: "flex" }} compact>
                    {/* add default value */}
                    <Form.Item
                      name={[`r${item["Id"]}`, "min"]}
                      style={{ width: "40%", textAlign: "center" }}
                    >
                      <InputNumber min={item["MinVal"]} max={item["MaxVal"]}  placeholder={item["MinVal"]} />
                    </Form.Item>
                    <Form.Item
                      style={{
                        flexGrow: 1,
                        pointerEvents: "none",
                      }}
                    >
                      <Input placeholder="~" disabled />
                    </Form.Item>
                    <Form.Item
                      className="site-input-right"
                      style={{
                        width: "40%",
                        textAlign: "center",
                      }}
                      name={[`r${item["Id"]}`, "max"]}
                    >
                      <InputNumber min={item["MinVal"]} max={item["MaxVal"]} placeholder={item["MaxVal"]} />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </Col>
            );
          })}
        </>
      );
    }
  };

  const onExtend = () => {
    setExtended(!extended);
  };

  const onReset = () => {
    form.resetFields();
    props?.onReset();
  };

  const renderBreadcrumbs = () => {
    let path = [...props.breadcrumbs]
      .reverse()
      .map((item) => item["name"])
      .join(" - ");
    return <div class="crumbs">{path}</div>;
  };

  //Отрисовка верхней навигации и кнопок фильтра
  return (
    <div style={{ overflow: "hidden" }}>
      <span>{renderBreadcrumbs()}</span>
      {/* <div className="selectedCategory">
        <span>Отсортировано по категории:</span>{" "}
        <p>
          {props?.selectedCategory?.title
            ? props?.selectedCategory?.title
            : props?.selectedCategory?.name}
        </p>
      </div> */}
      <hr></hr>
      <Form
        form={form}
        labelCol={{ flex: "65px" }}
        labelAlign="left"
        labelWrap = 'true'
        wrapperCol={{ flex: 1 }}
        layout="vertical"
        className="searchBar"
        onFinish={props?.onSearch}
      >
          {renderForm()}
          {extended && renderExtendedForm("def")}
        {extended ? (
          <div>
            <Row>
              <Col span={8}>
                <Button onClick={onExtend} className="extendSearch" type="link">
                  Закрыть расширенный поиск
                </Button>
              </Col>
              <Col span={8} offset={8}>
                <div className="divBtn" style={{ float: "right" }}>
                  <Button className="resetBtn" onClick={onReset}>
                    Сбросить
                  </Button>
                  <Button className="findBtn" htmlType="submit">
                    Найти
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <Row>
            <Col span={8}>
              <Button onClick={onExtend} className="extendSearch" type="link">
                Открыть расширенный поиск
              </Button>
            </Col>
            <Col span={8} offset={8}>
              <div className="divBtn" style={{ float: "right" }}>
                <Button className="resetBtn" onClick={onReset}>
                  Сбросить
                </Button>
                <Button className="findBtn" htmlType="submit">
                  Найти
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  );
}
