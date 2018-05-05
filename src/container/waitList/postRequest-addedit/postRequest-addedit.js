import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/waitList/postRequest-addedit';
import { getQueryString, showWarnMsg, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import XLSX from 'xlsx';
import { Button } from 'antd';
import { downLoad } from 'api/downLoad';

function makeCols(refstr) {
  var o = [];
  var range = XLSX.utils.decode_range(refstr);
  for (var i = 0; i <= range.e.c; ++i) {
    o.push({ name: XLSX.utils.encode_col(i), key: i });
  }
  return o;
}

@DetailWrapper(
  state => state.waitListPostReauestAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)

class PostRequestAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.handleExport = this.handleExport.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: [],
      cols: []
    };
  };
  handleExport() {
    downLoad().then((data) => {
      console.log(data, this.state.data);
      let payroll1 = [
        ['项目信息'],
        ['项目编号', data[1].projectCode],
        ['扣款账户', data[1].bankCard.bankName],
        ['代付工资信息'],
        ['序号', '工资条编号', '真实姓名', '开户行', '卡号', '应发金额', '已发金额', '发放时间']
      ];
      let payroll2 = data.map((d, i) => {
        return [i + 1, d.code, d.bankCard.staffName, d.bankCard.bankName, d.bankCard.bankcardNumber, d.shouldAmount, d.factAmount, new Date(d.createDatetime)];
      });
      payroll1 = payroll1.concat(payroll2);
      const ws = XLSX.utils.aoa_to_sheet(payroll1);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
      XLSX.writeFile(wb, 'sheetjs.xlsx');
    }, () => { });
  }
  handleChange(files) {
    files = files.target.files;
    if (!files || !files.length) {
      return;
    }
    let file = files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.setState({ data: data, cols: makeCols(ws['!ref']) });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }
  render() {
    const fields = [{
      field: 'handler',
      hidden: true
    }, {
      title: '请求时间',
      field: 'sendDatetime',
      readonly: true,
      type: 'datetime'
    }, {
      title: '代发账户户名',
      field: 'staffName',
      readonly: true
    }, {
      title: '代发账户账号',
      field: 'bankcardNumber',
      readonly: true
    }, {
      title: '下载次数',
      field: 'download',
      readonly: true
    }, {
      title: '备注',
      field: 'handleNote'
    }];
    return (
      <div>
        <div>
          <input type="file" onChange={this.handleChange} />
          <Button onClick={this.handleExport}>下载</Button>
        </div>
        {this.props.buildDetail({
          fields,
          code: this.code,
          detailCode: 631437,
          editCode: 631431,
          beforeSubmit: (params) => {
            let payList = [];
            this.state.data.forEach((d, i) => {
              if (i > 4 && d.length) {
                payList.push({
                  bankcardNumber: d[4],
                  latePayDatetime: d[7],
                  payAmount: d[6],
                  code: d[1]
                });
              }
            });
            params.payList = payList;
            return params;
          }
        })}
      </div>
    );
  }
}

export default PostRequestAddedit;
