import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/waitList/alreadyQuest-addedit';
import { getQueryString, showSucMsg, formatDate, showWarnMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { Button } from 'antd';
import { downLoad } from 'api/downLoad';
import XLSX from 'xlsx';

@DetailWrapper(
  state => state.waitListAlreadyQuestAddedit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)

class AlreadyQuestAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.handleExport = this.handleExport.bind(this);
    this.state = {
      data: [],
      cols: []
    };
  };
  handleExport() {
    downLoad(this.code).then((data) => {
      let payroll1 = [
        ['项目信息'],
        ['项目编号', data[1].projectCode],
        ['扣款账户', data[1].bankCard.bankName],
        ['代付工资信息'],
        ['序号', '工资条编号', '真实姓名', '开户行', '卡号', '应发金额', '已发金额', '发放时间']
      ];
      let payroll2 = data.map((d, i) => {
        return [i + 1, d.code, d.bankCard.staffName, d.bankCard.bankName, d.bankCard.bankcardNumber, d.shouldAmount, d.factAmount, formatDate(d.latePayDatetime)];
      });
      payroll1 = payroll1.concat(payroll2);
      const ws = XLSX.utils.aoa_to_sheet(payroll1);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
      XLSX.writeFile(wb, 'sheetjs.xlsx');
    }, () => { });
  }
  render() {
    const fields = [{
      field: 'handler',
      hidden: true
    }, {
      title: '请求时间',
      field: 'sendDatetime',
      type: 'datetime'
    }, {
      title: '标题',
      field: 'title'
    }, {
      title: '代发账户户名',
      field: 'bankName'
    }, {
      title: '代发账户账号',
      field: 'bankcardNumber'
    }, {
      title: '代发工资条下载',
      field: 'download1',
      type: 'download',
      handler: this.handleExport
    }, {
      title: '下载次数',
      field: 'download'
    }, {
      title: '标题',
      field: 'title1',
      _keys: ['title'],
      formatter: (v, d) => {
        return v + '反馈';
      }
    }, {
      title: '反馈时间',
      field: 'handleDatetime',
      type: 'datetime'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      searchParams: {
        status: 3
      },
      detailCode: 631437
    });
  }
}

export default AlreadyQuestAddedit;
