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
      field: 'name',
      title: '部门名',
      required: true
    }, {
      field: 'leader',
      title: '负责人',
      type: 'select',
      listCode: '631086',
      params: {
        type: 'O',
        companyCode: this.companyCode
      },
      keyName: 'userId',
      valueName: 'loginName',
      required: true
    }, {
      field: 'leadeMobile',
      title: '负责人手机号',
      mobile: true,
      required: true
    }, {
      field: 'companyCode',
      title: '上级部门',
      type: 'select',
      listCode: '631036',
      params: {
        companyCode: this.companyCode
      },
      keyName: 'code',
      valueName: 'name'
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
