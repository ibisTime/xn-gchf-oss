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
      readonly: true
    }, {
      field: 'staffName',
      title: '真实姓名',
      readonly: true
    }, {
      field: 'bankName',
      title: '银行名称',
      type: this.view ? null : 'select',
      listCode: '631093',
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
      field: 'updateDatetime',
      title: '更新时间',
      type: 'datetime',
      readonly: true
    }, {
      field: 'updater',
      title: '更新人',
      readonly: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631427,
      editCode: 631422,
      buttons: this.view ? [] : [{
        title: '保存',
        check: true,
        handler: (param) => {
          getBankNameByCode(param.bankName).then(data => {
            param.bankCode = data[0].bankCode;
            param.bankName = data[0].bankName;
            param.updater = getUserId();
            this.props.doFetching();
            console.log(param);
            fetch(631410, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          });
        }
      }]
    });
  }
}

export default BankCardAddEdit;
