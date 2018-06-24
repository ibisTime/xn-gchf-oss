import React from 'react';
import { Input, Select, Button } from 'antd';
import { getProjectListForO, getBumen } from 'api/project';
import { getUserDetail, getUserId, ruzhi } from 'api/user';
import { getDict } from 'api/dict';
import { getQueryString, showWarnMsg, showSucMsg } from 'common/js/util';
import './ruzhiInfo.css';

const InputGroup = Input.Group;
const Option = Select.Option;

class RuzhiInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      department1: {},
      department2: {},
      department3: {},
      selectProj: '',
      selectDepart: '',
      selectSource: '',
      source: {},
      type: ''
    };
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.handleDepartmentChange1 = this.handleDepartmentChange1.bind(this);
    this.handleDepartmentChange2 = this.handleDepartmentChange2.bind(this);
    this.handleDepartmentChange3 = this.handleDepartmentChange3.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.code = getQueryString('code', this.props.location.search);
  }
  componentDidMount() {
    getUserDetail(getUserId()).then((res) => {
      this.companyCode = res.companyCode;
      getProjectListForO(res.companyCode).then((data) => {
        this.projectList = data.map((item) => ({
          code: item.code,
          name: item.name
        }));
        this.setState({
          projectList: this.projectList,
          selectProj: this.projectList[0].code
        });
        // getBumen({projectCode: this.state.projectList[0].code || ''}).then((res1) => {
        //   let data = [];
        //   res1.map((item) => {
        //     if(!item.parentCode) {
        //       data.push(item);
        //     }
        //   });
        //   this.department1 = data.map((item1) => ({
        //     code: item1.code,
        //     name: item1.name
        //   }));
        //   this.setState({
        //     department1: this.department1
        //   });
        //   getBumen({parentCode: this.department1[0].code || ''}).then((res2) => {
        //   if(!res2.length) {
        //     this.department2 = res2.map((item2) => ({
        //       code: item2.code,
        //       name: item2.name
        //     }));
        //     this.setState({
        //       department2: this.department2
        //     });
        //     getBumen({parentCode: this.department2[0].code || ''}).then((res3) => {
        //   if(!res.length) {
        //     this.department3 = res3.map((item3) => ({
        //     code: item3.code,
        //     name: item3.name
        //   }));
        //   this.setState({
        //     department3: this.department3
        //   });
        //   }
        // });
        //   }
        // });
        // });
      });
    });
    getDict('staff_type').then((res) => {
      console.log(res);
      this.source = res.map((item) => ({
        type: item.dkey,
        name: item.dvalue
      }));
      this.setState({
        source: this.source
      });
    });
    // setTimeout(() => {
    //   const projectOptions = this.state.projectList.map((item) => <Option key={item.code}>{item.name}</Option>);
    // }, 300);
    // getProjectList()
  }
  // 项目change事件
  handleProjectChange(value) {
    // value = 选中的项目code
    this.setState({
      department1: {},
      department2: {},
      department3: {},
      selectProj: value
    });
    getBumen({projectCode: value}).then((res) => {
      let data = [];
      res.map((item) => {
        if(!item.parentCode) {
          data.push(item);
        }
      });
      this.department1 = data.map((item) => ({
        code: item.code,
        name: item.name
      }));
      this.setState({
        department1: this.department1
      });
    });
  }
  // 一级部门change事件
  handleDepartmentChange1(value) {
    // value = 选中的项目code
    this.setState({
      department2: {},
      department3: {}
    });
    getBumen({parentCode: value}).then((res) => {
      if(!res.length) {
        this.setState({
          selectDepart: value
        });
      }
      this.department2 = res.map((item) => ({
        code: item.code,
        name: item.name
      }));
      this.setState({
        department2: this.department2
      });
    });
  }
  // 二级部门change事件
  handleDepartmentChange2(value) {
    this.setState({
      department3: {}
    });
    // value = 选中的项目code
    getBumen({parentCode: value}).then((res) => {
      if(!res.length) {
        this.setState({
          selectDepart: value
        });
      }
      this.department3 = res.map((item) => ({
        code: item.code,
        name: item.name
      }));
      this.setState({
        department3: this.department3
      });
    });
  }
  // 三级部门change事件
  handleDepartmentChange3(value) {
    this.setState({
      selectDepart: value
    });
    // value = 选中的项目code
  }
  // 员工source change事件
  handleTypeChange(value) {
    this.setState({
      selectSource: value
    });
  }
  // 最终提交
  handleSubmit() {
    let info = {
      departmentCode: this.state.selectDepart,
      projectCode: this.state.selectProj,
      staffCode: this.code,
      type: this.state.selectSource || '1'
    };
    ruzhi(info).then((res) => {
      if(res.code) {
        showSucMsg('入职成功！');
      } else {
        showWarnMsg('入职失败！');
      }
    });
  }
  render() {
    return this.state.projectList.length ? (
      <div className='SectionContainer' style={{ border: '2px solid #096dd9' }}>
        <div className='section'>
          <div style={{ display: 'table-cell', verticalAlign: 'middle', width: '100%' }}>
              <div className="comparison-main comparison-mains">
                <div className="head-wrap"><i></i>入职信息</div>
                  <div style={{ border: '1xp solid red', width: 300, height: 800, paddingTop: '10%', margin: '0 auto' }}>
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>入职信息</div>
                    <InputGroup compact style={{ marginBottom: 20 }}>
                    <Select style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 24 }} onChange={this.handleProjectChange}>
                      {this.state.projectList.map((item) => <Option key={item.code} value={item.code}>{item.name}</Option>)}
                    </Select>
                    <Select style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 20 }} onChange={ this.handleDepartmentChange1 }>
                      {this.state.department1.length ? this.state.department1.map((item) => <Option key={item.code} value={item.code}>{item.name}</Option>) : ''}
                    </Select>
                    <Select style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 20 }} onChange={ this.handleDepartmentChange2 }>
                      {this.state.department2.length ? this.state.department2.map((item) => <Option key={item.code} value={item.code}>{item.name}</Option>) : ''}
                    </Select>
                    <Select style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 20 }} onChange={ this.handleDepartmentChange3 }>
                      {this.state.department3.length ? this.state.department3.map((item) => <Option key={item.code} value={item.code}>{item.name}</Option>) : ''}
                    </Select>
                  </InputGroup>
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>员工来源</div>
                  <InputGroup compact>
                    <Select defaultValue={this.state.source[0].type || ''} style={{ width: 300, display: 'block', margin: '0 auto', border: '1px solid #509CFA', borderRadius: 5, marginBottom: 20 }} onChange={ this.handleTypeChange }>
                      {this.state.source.length ? this.state.source.map((item) => <Option key={item.type} value={item.type}>{item.name}</Option>) : ''}
                    </Select>
                  </InputGroup>
                  <div>
                    <Button type="primary" style={{ width: 300 }} onClick={ this.handleSubmit }>完成</Button>
                  </div>
                  </div>
                  </div>
              </div>
          </div>
      </div>
    ) : null;
  }
}

export default RuzhiInfo;