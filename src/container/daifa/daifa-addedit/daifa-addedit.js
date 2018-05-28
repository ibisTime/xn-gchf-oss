import React from 'react';
import fetch from 'common/js/fetch';
import cookies from 'browser-cookies';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/daifa/daifa-addedit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId, getUserDetail } from 'api/user';

@DetailWrapper(
  state => state.daifaDaifaAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class DaifaAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'code',
      title: '编号',
      hidden: true
    }, {
      field: 'projectCode',
      title: '项目编号',
      hidden: true
    }, {
      field: 'projectName',
      title: '项目名称'
    }, {
      field: 'bankNames',
      title: '开户行',
      formatter: (v, d) => {
        return d.bankName + d.subbranch;
      }
    }, {
      field: 'bankcardNumber',
      title: '账户'
    }, {
      field: 'totalAmounts',
      title: '本月累计发薪',
      formatter: (v, d) => {
        return d.totalAmount / 1000;
      }
    }, {
      title: '共计扣款',
      field: 'totalCutAmounts',
      formatter: (v, d) => {
        return d.totalCutAmount / 1000;
      }
    }, {
      title: '共计税费',
      field: 'totalTaxs',
      formatter: (v, d) => {
        return d.totalTax / 1000;
      }
    }, {
      title: '领薪人数',
      field: 'number'
    }, {
      title: '所属月份',
      field: 'month'
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      key: 'message_status'
    }, {
      field: 'createDatetime',
      title: '创建时间',
      type: 'datetime'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631437
    });
  }
}

export default DaifaAddEdit;
