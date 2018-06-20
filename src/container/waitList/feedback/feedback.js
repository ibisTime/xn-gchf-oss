import React from 'react';
import { Card, Button } from 'antd';
import listWrapper from 'common/js/build-list';
import {
  getUserId,
  getUserKind,
  dateTimeFormat
} from 'common/js/util';
import { getUserDetail } from 'api/user';
import { handle } from 'api/downLoad';
import { getDictList } from 'api/dict';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      statusDict: {}
    };
    this.lookDetail = this.lookDetail.bind(this);
  };
  componentDidMount() {
    if (getUserKind() === 'B') {
      getUserDetail(getUserId()).then((data) => {
        handle(data.bankName, data.subbranch, 2).then(data => {
          this.setState({
            data: data
          });
        });
      });
      getDictList({ parentKey: 'message_status' }).then(data => {
        let dict = {};
        data.forEach(d => {
          dict[d.dkey] = d.dvalue;
        });
        this.setState({ statusDict: dict });
      });
    };
  }
  lookDetail(code) {
    this.props.history.push(`/waitList/feedback/addedit?code=${code}`);
  };
  render() {
    const { data, statusDict } = this.state;
    return (
      <div>
      { data.length
         ? data.map((v, i) =>
            <Card key={v.code} style={{ width: '80%', padding: 0 }}>
                <span>发件人：</span>
                <i style={{ fontStyle: 'normal' }}>{ v.sendName }</i>
                <i style={{ fontStyle: 'normal', marginLeft: 20 }}>{ dateTimeFormat(v.sendDatetime) }</i>
                <div style={{ width: '100%' }}>
                <i style={{ display: 'inline-block', whiteSpace: 'nowrap', fontStyle: 'normal' }}>{ v.title }</i>
                <Button type="primary" style={{ marginLeft: '70%' }} onClick={ () => { this.lookDetail(v.code); } }>查看</Button>
                </div>
                <p style={{ display: 'inline-block', color: 'red' }}>{ statusDict[v.status] || '' }</p>
            </Card>)
          : <Card key={1} style={{ width: '80%' }}><p>暂时没有待反馈信息</p></Card>
      }</div>
    );
  }
}

export default FeedBack;