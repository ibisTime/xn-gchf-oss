import React from 'react';
import cookies from 'browser-cookies';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/hetong/jindu';
import { listWrapper } from 'common/js/build-list';
import { getUserDetail, getjinduO, getjindu } from 'api/user';
import { getUserKind, getUserId, formatImg, formatDate, getQueryString } from 'common/js/util';
import { Timeline, Button } from 'antd';

@listWrapper(
  state => ({
    ...state.hetongJindu
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Jindu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.projectCode = getQueryString('projectCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        getjinduO(data.companyCode, this.projectCode).then(data => {
          this.setState({
            data: data
          });
        });
      });
    } else {
      getUserDetail(getUserId()).then((data) => {
        getjindu(data.companyCode, this.projectCode).then(data => {
          this.setState({
            data: data
          });
        });
      });
    }
  }
  goBack() {
    this.props.history.go(-1);
  };
  addjindu() {
    this.props.history.push(`/hetong/jindu/addedit?code=${this.projectCode}`);
  }
  render() {
    var list = (length) => {
      var res = [];
      if (!length) {
        res.push(<Timeline key={0}>
          <Timeline.Item>该项目没有录入进度</Timeline.Item>
        </Timeline>);
      }
      for (let i = 0; i < length; i++) {
        res.push(<Timeline key={i}>
          <Timeline.Item>时间： {formatDate(this.state.data[i].datetime)}</Timeline.Item>
          <Timeline.Item>工程名字: {this.state.data[i].projectName}</Timeline.Item>
          <Timeline.Item>公司名字: {this.state.data[i].companyName}</Timeline.Item>
          <Timeline.Item>工程进度: {this.state.data[i].description}</Timeline.Item>
          <Timeline.Item>进度图片：<img src={formatImg(this.state.data[i].picture)} style={{ width: 100, verticalAlign: 'text-top' }} /> </Timeline.Item>
          <Timeline.Item>更新人： {this.state.data[i].updateName}</Timeline.Item>
        </Timeline>);
      };
      return res;
    };

    return (
      <div>
        {list(this.state.data.length)}
        <Button onClick={this.goBack.bind(this)}>返回</Button>
      </div>
    );
  }
}

export default Jindu;
