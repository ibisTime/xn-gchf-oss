import React from 'react';
import { Input, Select } from 'antd';
import { getProjectListForO } from 'api/project';
import { getUserDetail, getUserId } from 'api/user';
import './ruzhiInfo.css';

const InputGroup = Input.Group;
const Option = Select.Option;

class RuzhiInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [
        // {code: 'P201806041022008788520', name: '5号工地'},
        // {code: 'P201806031929336331551', name: '1号工地'}
      ]
    };
    // this.openVideo = this.openVideo.bind(this);
  }
componentDidMount() {
  getUserDetail(getUserId()).then((res) => {
    this.companyCode = res.companyCode;
    getProjectListForO(res.companyCode).then((data) => {
      console.log(data);
      this.state.projectList = data.map((item) => {
        let temp = {
          code: item.code,
          name: item.name
        };
        return temp;
      });
    });
  });
  setTimeout(() => {
    // console.log(this.state.projectList);
    const projectOptions = this.state.projectList.map((item) => <Option key={item.code}>{item.name}</Option>);
    console.log(projectOptions);
  }, 300);
  // getProjectList()
}

  render() {
    const projectOptions = this.state.projectList.map((item) => <Option key={item.code}>{item.name}</Option>);
    return this.state.projectList ? (
      <div className='SectionContainer' style={{ border: '2px solid #096dd9' }}>
        <div className='section'>
          <div style={{ display: 'table-cell', verticalAlign: 'middle', width: '100%' }}>
              <div className="comparison-main comparison-mains">
                <div className="head-wrap"><i></i>入职信息</div>
                  <div style={{ border: '1xp solid red', width: 300, height: 800, paddingTop: '10%', margin: '0 auto' }}>
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>入职信息</div>
                    <InputGroup compact style={{ marginBottom: 20 }}>
                    <Select defaultValue={this.state.projectList[0]} style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 24 }}>
                      {projectOptions}
                    </Select>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                  </InputGroup>
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>员工来源</div>
                  <InputGroup compact>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                    <Select defaultValue="Zhejiang" style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 20 }}>
                      <Option value="Zhejiang">Zhejiang</Option>
                      <Option value="Jiangsu">Jiangsu</Option>
                    </Select>
                  </InputGroup>
                  </div>
                  </div>
              </div>
          </div>
      </div>
    ) : null;
  }
}

export default RuzhiInfo;