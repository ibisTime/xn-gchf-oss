import React from 'react';
import fetch from 'common/js/fetch';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/staff/bankCard-addedit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId } from 'api/user';

@DetailWrapper(
  state => state.staffBankCardAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class BankCardAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'staffCode',
      title: '员工编号',
      readonly: true,
      hidden: true
    }, {
      field: 'staffName',
      title: '真实姓名',
      readonly: true
    }, {
      field: 'bankCode',
      title: '银行名称',
      type: 'select',
      listCode: '631116',
      keyName: 'bankCode',
      valueName: 'bankName',
      required: true
    }, {
      field: 'bankcardNumber',
      title: '银行卡号',
      required: true
    }, {
      field: 'subbranch',
      title: '开户支行',
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    const fieldos = [{
      field: 'staffCode',
      title: '员工编号',
      readonly: true,
      hidden: true
    }, {
      field: 'staffName',
      title: '真实姓名',
      readonly: true
    }, {
      field: 'bankName',
      title: '银行名称',
      formatter: (v, d) => {
        return d.bankName + '(' + d.bankcardNumber + ')';
      }
    }, {
      field: 'subbranch',
      title: '开户支行',
      required: true
    }, {
      field: 'updateDatetime',
      title: '更新时间',
      type: 'datetime',
      readonly: true
    }, {
      field: 'updateName',
      title: '更新人',
      readonly: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildDetail({
      fields: this.view ? fieldos : fields,
      code: this.code,
      view: this.view,
      detailCode: 631427,
      editCode: 631422,
      beforeSubmit: (param) => {
        // param.bankName = this.props.selectData.bankCode.filter(v => v.bankCode === param.bankCode)[0].bankName;
           this.props.selectData.bankCode.map((item) => {
            if(item.bankCode === param.bankCode) {
              param.bankName = item.bankName;
            }
          });
        return param;
      }
    });
  }
}

export default BankCardAddEdit;
