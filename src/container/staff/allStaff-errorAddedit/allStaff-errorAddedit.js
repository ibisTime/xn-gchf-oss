import React from 'react';
import fetch from 'common/js/fetch';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId, getUserDetail, getUserErrorInfo } from 'api/user';
import { Timeline, Button } from 'antd';

class AllStaffAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: '',
      name: '',
      projectName: '',
      factAmount: '',
      payAmount: '',
      cutNote: '',
      status: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    getUserErrorInfo(this.code).then(data => {
      this.setState({
        name: data.staffName,
        month: data.month,
        projectName: data.projectName,
        factAmount: data.factAmount,
        payAmount: data.payAmount,
        status: data.status,
        cutNote: data.cutNote
      });
    });
  }
  goBack() {
    this.props.history.go(-1);
  };
  render() {
    return (
      <div>
        <Timeline>
          <Timeline.Item>工程名字: {this.state.projectName}</Timeline.Item>
          <Timeline.Item>工程所属月份: {this.state.month}</Timeline.Item>
          <Timeline.Item>工人姓名: {this.state.name}</Timeline.Item>
          <Timeline.Item>应发工资： {this.state.payAmount}</Timeline.Item>
          <Timeline.Item>实发工资： {this.state.factAmount}</Timeline.Item>
          <Timeline.Item>考勤记录： {this.state.cutNote}</Timeline.Item>
          <Timeline.Item>状态： {this.state.status}</Timeline.Item>
        </Timeline>
        <Button onClick={this.goBack.bind(this)}>返回</Button>
      </div>
    );
  }
}

export default AllStaffAddEdit;
