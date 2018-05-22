import React from 'react';
import fetch from 'common/js/fetch';
import { getQueryString, showSucMsg, formatDate } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId, getUserDetail, getUserErrorInfo, getUserWagesInfo, senderrInfo } from 'api/user';
import { Timeline, Button, Card, Input } from 'antd';
const { TextArea } = Input;

class AllStaffAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      staffName: '',
      handleName: '',
      handleNote: '',
      handleDatetime: '',
      rizicode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    getUserErrorInfo(this.code).then(data => {
      console.log(data);
      this.setState({
        // projectName: data[0].projectName ? data[0].projectName : '',
        // staffName: data[0].staffName ? data[0].staffName : '',
        // handleName: data[0].handleName ? data[0].handleName : '',
        // handleNote: data[0].handleNote ? data[0].handleNote : '',
        // handleDatetime: data[0].handleDatetime ? data[0].handleDatetime : '',
        // rizicode: data[0].code ? data[0].code : ''
      });
    });
    getUserWagesInfo(this.code).then(data => {
      console.log(data);
    });
  };
  goBack() {
    this.props.history.go(-1);
  };
  sendInfo() {
    var info = document.getElementById('info');
    senderrInfo(this.state.rizicode, info.value, getUserId()).then(() => {
      showSucMsg('发送成功！');
    });
  };
  render() {
    return (
      <div>
        <Card title="信息描述">
          <p>工程名字：{this.state.projectName}</p>
          <p>员工姓名：{this.state.staffName}</p>
          <p>{this.state.cutNote}</p>
        </Card>
        <Card title="异常处理报告" style={{ marginTop: 10, marginBottom: 10 }}>
          <p>处理人：{this.state.handleName}</p>
          <p>处理信息：{this.state.handleNote}</p>
          <p>处理时间: {formatDate(this.state.handleDatetime)}</p>
        </Card>
        <div style={{ marginBottom: 10 }}>
          <TextArea id='info' placeholder="输入最新沟通情况" autosize={{ minRows: 2, maxRows: 6 }} />
        </div>
        <Button onClick={this.sendInfo.bind(this)} type="danger" ghost style={{ marginRight: 10 }}>处理异常</Button>
        <Button onClick={this.goBack.bind(this)}>返回</Button>
      </div>
    );
  }
}

export default AllStaffAddEdit;
