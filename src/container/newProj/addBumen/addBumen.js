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
import { getBumen } from 'api/company';

@DetailWrapper(
  state => state.securityMenuAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class AddBumen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bumenStructure: []
    };
    this.companyCode = getQueryString('companyCode', this.props.location.search);
    this.bumenCode = getQueryString('bumenCode', this.props.location.search);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    getBumen(this.companyCode).then(data => {
      console.log(data);
      this.setState({ bumenStructure: data });
    });
  }
  render() {
    if (this.bumenCode.slice(0, 1) === 'C' || this.code.slice(0, 1) === 'D') {
      const fields = [{
        field: 'companyCode',
        value: this.companyCode,
        hidden: true
      }, {
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
      });
    } else {
      const fields = [{
        field: 'companyCode',
        value: this.companyCode,
        hidden: true
      }, {
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
        field: 'parentCode',
        title: '上级部门',
        type: 'select',
        listCode: '631036',
        params: {
          companyCode: this.companyCode
        },
        keyName: 'code',
        valueName: 'name',
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
      });
    }
  }
}

export default AddBumen;
