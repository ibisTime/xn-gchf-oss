import React from 'react';
import { Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import './idInfoRead.css';
const InputGroup = Input.Group;
const Option = Select.Option;

class idInfoRead extends React.Component {
  render() {
    return (
      <div className='SectionContainer'>
        <div className='section'>
          <div style={{ display: 'table-cell', verticalAlign: 'middle', width: '100%' }}>
              <div className="comparison-main">
                  <div className="head-wrap"><i></i>入职信息</div>
                  <div style={{ border: '1xp solid red', width: 300, height: 800, paddingTop: '10%', margin: '0 auto' }}>
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>入职信息</div>
                    <InputGroup compact style={{ marginBottom: 20 }}>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid blue', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid blue', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid blue', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid blue', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                  </InputGroup>
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>员工来源</div>
                  <InputGroup compact>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid blue', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid blue', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                  </InputGroup>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default idInfoRead;