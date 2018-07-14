import React from 'react';
import fetch from 'common/js/fetch';
import { getQueryString, showWarnMsg, showSucMsg, formatDate, getUserName, isUndefined, getUserId, moneyFormat } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import XLSX from 'xlsx';
import { Button, Card, Upload, Icon } from 'antd';
import { downLoad, downNum, detailDate } from 'api/downLoad';

function makeCols(refstr) {
  var o = [];
  var range = XLSX.utils.decode_range(refstr);
  for (var i = 0; i <= range.e.c; ++i) {
    o.push({ name: XLSX.utils.encode_col(i), key: i });
  }
  return o;
}

class PostRequestAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.fankui = getQueryString('status', this.props.location.search) === '2';
    this.handleExport = this.handleExport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postRequest1 = this.postRequest1.bind(this);
    this.state = {
      data: [],
      cols: [],
      bankcardNumber: '',
      handleDatetime: '',
      bankName: '',
      download: '',
      projectName: '',
      sendDatetime: '',
      fileList: [],
      backDownload: '',
      title: '',
      companyName: ''
    };
  }
  componentDidMount() {
    detailDate(this.code).then((data) => {
      this.setState({
        bankcardNumber: data.bankcardNumber,
        handleDatetime: data.handleDatetime,
        bankName: data.bankName,
        projectName: data.projectName,
        sendDatetime: data.sendDatetime,
        download: data.download,
        backDownload: data.backDownload,
        title: data.title,
        accountName: data.companyCard.accountName,
        companyName: data.companyCard.companyName
      });
    });
  }
  downNum(flag) {
    let { backDownload, download } = this.state;
    if (flag) {
      backDownload += 1;
    } else {
      download += 1;
    }
    downNum(this.code, download, backDownload).then((data) => {
      this.setState({
        download: data.download,
        backDownload: data.backDownload
      });
    });
  }
  handleExport() {
    this.downNum(true);
    downLoad(this.code).then((data) => {
      console.log(data);
      if (!data || !data.length) {
        showWarnMsg('没有工资条信息！');
        return;
      }
      let payroll1 = [
        ['项目信息'],
        ['项目编号', data[0].projectCode],
        ['扣款帐户户名', data[0].companyCard.accountName],
        ['扣款账户', data[0].companyCard.bankcardNumber],
        ['代付工资信息'],
        ['序号', '工资条编号', '真实姓名', '身份证号', '开户行', '支行', '卡号', '应发金额', '已发金额', '发放时间']
      ];
      let payroll2 = data.map((d, i) => {
        return [i + 1, d.code, d.staffName, d.staffIdNo, d.bankCard.bankName, d.bankCard.subbranch, d.bankCard.bankcardNumber, d.status === '4' ? moneyFormat(d.supplyAmount) : moneyFormat(d.factAmount), '', ''];
      });
      payroll1 = payroll1.concat(payroll2);
      const ws = XLSX.utils.aoa_to_sheet(payroll1);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
      XLSX.writeFile(wb, this.state.projectName + '-' + this.state.title + '.xlsx');
    }, () => { });
  }
  goBack() {
    this.props.history.go(-1);
  }
  handleChange(file) {
    try {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        let data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        this.setState({ data: data, cols: makeCols(ws['!ref']) });
        let statusNum;
        for (let i = 5; i < data.length; i++) {
          data[i][7] = formatDate(data[i][7]);
          if (isUndefined(data[i][6]) || isUndefined(data[i][7])) {
            showWarnMsg('请确定已发工资或发放日期填写完整填写！');
            statusNum = true;
            return;
          }
        }
        if (!statusNum) {
          this.setState({
            data: data,
            cols: makeCols(ws['!ref']),
            fileList: [{
              uid: file.uid,
              name: file.name,
              status: 'done'
            }]
          });
        }
      };
      if (rABS) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    } catch (error) {
      showWarnMsg('请上传正确的文件！');
    }
  }
  postRequest1() {
    let param = {};
    let payList = [];
    this.state.data.forEach((d, i) => {
      if (i > 4 && d.length) {
        payList.push({
          bankcardNumber: d[4],
          latePayDatetime: formatDate(d[7]),
          payAmount: d[6] * 1000,
          code: d[1]
        });
      }
    });
    if (!payList || !payList.length) {
      showWarnMsg('请上传工资信息！');
      return;
    };
    console.log(payList);
    param.payList = payList;
    param.handler = getUserId();
    param.code = this.code;
    console.log(param);
    fetch(631432, param).then(() => {
      showSucMsg('操作成功');
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    }).catch();
  }
  render() {
    const props = {
      fileList: this.state.fileList,
      beforeUpload: (file, fileList) => {
        this.handleChange(file, fileList);
        return false;
      },
      onRemove: () => {
        this.setState({
          fileList: []
        });
      }
    };
    return (
      <div>
        <Card style={{ width: '100%', borderColor: 'rgba(153,212,255,0.6)', boxShadow: '0px 0px 30px rgba(153,212,255,0.6) inset' }}>
          <p style={{ fontSize: '16px' }}>{this.state.title}</p>
          <p>公司名称：{this.state.companyName}</p>
          <p>项目名称：{this.state.projectName}</p>
          <p>请求时间：{formatDate(this.state.sendDatetime)}</p>
          <p>代发账户户名：{this.state.accountName}</p>
          <p>代发账户账号：{this.state.bankcardNumber}</p>
          <div style={{ width: '92px', height: '92px', border: '1px solid #99d4ff', borderRadius: '4px', display: 'inline-block', padding: '22px 25px', margin: '0 26px 26px 0' }}>
           <img src={require('./gongzidan.png')} ></img>
          </div>
          <Button onClick={this.handleExport} type="primary" style={{ marginBottom: '12px', position: 'relative', top: '-20px', left: '0px' }}>点击下载</Button>
          <span style={{ position: 'relative', left: '-70px', top: '20px', fontSize: '12px', color: '#999' }}>下载次数{this.state.backDownload}</span>
        </Card>
        <Button onClick={this.goBack.bind(this)} style={{ marginTop: 40 }}>返回</Button>
      </div>
    );
  }
}

export default PostRequestAddedit;
