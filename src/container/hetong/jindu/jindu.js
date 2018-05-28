import React from 'react';
import { Timeline, Button, Divider, List, Avatar } from 'antd';
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
import { getUserDetail, getjinduO, getjinduList, getjindu } from 'api/user';
import { getUserKind, getUserId, formatImg, formatDate, getQueryString } from 'common/js/util';
import { relative } from 'path';

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
      data: [],
      proList: []
    };
    this.projectCode = getQueryString('projectCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        console.log(data);
        getjinduO(data.companyCode, this.projectCode).then(data => {
          console.log(data);
          this.setState({
            data: data
          });
        });
        getjinduList(data.projectCodeList, data.companyCode).then(data => {
          console.log(data);
          this.setState({
            proList: data
          });
        });
      });
    } else {
      getUserDetail(getUserId()).then((data) => {
        console.log(data);
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
    const { data } = this.state;
    var dataProList = [];
    for (let i = 0; i < this.state.proList.length; i++) {
      dataProList[i] = { name: this.state.proList[i].name };
    };
    return (
      <div>
        <div style={{ display: 'inline-block' }}>
          <Button type='primary' onClick={this.addjindu.bind(this)}>新增进度</Button>
        </div>
        <Divider />
        <div style={{ float: 'right', width: 100, maxHeight: 900 }}>
          <List
            header={<div>项目列表</div>}
            itemLayout="horizontal"
            dataSource={dataProList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                />
              </List.Item>
            )}
          />
        </div>
        <div style={{ paddingLeft: 200, paddingTop: 60, display: 'inline-block' }}>
          <Timeline key={0}>
            {data.length
              ? data.map(v => <Timeline.Item key={v.code} style={{ borderColor: 'red' }}>{formatDate(v.datetime)}<img src={formatImg(v.picture)} style={{ width: 100, height: 90, display: 'inlineBlock', verticalAlign: 'text-top', position: 'relative', left: -200, top: -40 }} />{v.projectName} </Timeline.Item>)
              : <Timeline.Item>该项目没有录入进度</Timeline.Item>}
          </Timeline>
          <Button onClick={this.goBack.bind(this)}>返回</Button>
        </div>
      </div>
    );
  }
}

export default Jindu;
