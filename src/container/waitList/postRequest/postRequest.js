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

class PostRequest extends React.Component {
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
        handle(data.bankName, data.subbranch, 1).then(data => {
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
    this.props.history.push(`/waitList/postRequest/addedit?code=${code}`);
  };
  render() {
    const { data, statusDict } = this.state;
    return (
      <div style={{ width: '100%', padding: '38px' }}>
      { data.length
         ? data.map((v, i) =>
            <Card key={v.code} style={{ width: '100%', padding: '0px', borderColor: 'rgb(206,234,252)', boxShadow: '0px 0px 30px rgba(51,204,504,0.9) inset' }}>
                <div style={{ marginBottom: '18px' }}>
                  <span>发件人：</span>
                  <i style={{ fontStyle: 'normal' }}>{ v.sendName }</i>
                  <i style={{ fontStyle: 'normal', marginLeft: 20 }}>{ dateTimeFormat(v.sendDatetime) }</i>
                </div>
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <i style={{ display: 'inline-block', whiteSpace: 'nowrap', fontStyle: 'normal' }}>{ v.title }</i>
                  <Button type="primary" style={{ float: 'right', borderRadius: '15px', width: '82px', height: '31px' }} onClick={ () => { this.lookDetail(v.code); } }>查看</Button>
                </div>
                <p style={{ display: 'inline-block', color: 'red' }}>{ statusDict[v.status] || '' }</p>
            </Card>)
          : <Card key={1} style={{ width: '80%' }}><p>暂时没有待处理信息</p></Card>
      }</div>
    );
  }
}

export default PostRequest;