import React from 'react';
import fetch from 'common/js/fetch';
import { getQueryString, showWarnMsg, showSucMsg, formatDate, getUserName, isUndefined, getUserId } from 'common/js/util';
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
      backDownload: ''
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
        backDownload: data.backDownload
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
    downNum(this.code, backDownload, download).then((data) => {
      this.setState({
        download: data.download,
        backDownload: data.backDownload
      });
    });
  }
  handleExport() {
    this.downNum(true);
    downLoad(this.code).then((data) => {
      if (!data || !data.length) {
        showWarnMsg('没有工资条信息！');
        return;
      }
      console.log(data[0].companyCard.bankName);
      let payroll1 = [
        ['项目信息'],
        ['项目编号', data[0].projectCode],
        ['扣款账户', data[0].companyCard.bankcardNumber],
        ['代付工资信息'],
        ['序号', '工资条编号', '真实姓名', '开户行', '卡号', '应发金额', '已发金额', '发放时间']
      ];
      let payroll2 = data.map((d, i) => {
        return [i + 1, d.code, d.companyCard.staffName, d.companyCard.bankName, d.companyCard.bankcardNumber, (d.factAmount) / 1000, '', ''];
      });
      payroll1 = payroll1.concat(payroll2);
      const ws = XLSX.utils.aoa_to_sheet(payroll1);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
      XLSX.writeFile(wb, 'sheetjs.xlsx');
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
        <Card title={this.state.projectName + '123'} style={{ width: 500 }}>
          <p>请求时间：{formatDate(this.state.sendDatetime)}</p>
          <p>代发账户户名：{this.state.bankName}</p>
          <p>代发账户账号：{this.state.bankcardNumber}</p>
          <Button onClick={this.handleExport}>点击下载</Button>
          <p>下载次数{this.state.download}</p>
        </Card>
        <Card title={this.state.projectName + '工资反馈'} style={{ width: 500, marginTop: 20 }}>
          <p>反馈时间：{formatDate(this.state.handleDatetime)}</p>
          <p>上传文件</p>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 上传
            </Button>
          </Upload>
          <Button style={{ marginTop: 10 }} onClick={this.postRequest1}>提交反馈</Button>
        </Card>
        <Button onClick={this.goBack.bind(this)} style={{ marginTop: 20 }}>返回</Button>
      </div>
    );
  }
}

export default PostRequestAddedit;
