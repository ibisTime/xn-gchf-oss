import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/menu-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.securityMenuAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class AddBumen extends React.Component {
  constructor(props) {
    super(props);
    this.companyCode = getQueryString('companyCode', this.props.location.search);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'companyCode',
      title: '公司名',
      value: this.companyCode,
      hidden: true
    }, {
      field: 'parentCode',
      title: '上级部门编号',
      type: 'select',
      listCode: '631036',
      params: {
        companyCode: this.code ? this.companyCode : this.code
      },
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      field: 'name',
      title: '部门名',
      required: true
    }, {
      field: 'leader',
      title: '负责人',
      required: true
    }, {
      field: 'leadeMobile',
      title: '负责人手机号',
      mobile: true,
      required: true
    }];
    return this.props.buildDetail({
      fields,
      key: 'code',
      code: this.code,
      view: this.view,
      addCode: 631030,
      editCode: 631032,
      detailCode: 631037,
      beforeSubmit: (param) => {
        param.companyCode = this.companyCode;
        return param;
      }
      // editCode: 631022,
      // detailCode: 631037
    });
  }
}

export default AddBumen;
