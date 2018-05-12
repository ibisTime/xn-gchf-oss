import React from 'react';
import cookies from 'browser-cookies';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-addedit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import { getBankNameByCode, getBankCodeByName } from 'api/project';
import { getUserDetail } from 'api/user';
import { basename } from 'upath';

@DetailWrapper(
  state => state.newprojProjectAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentCode: '',
      bankCode: '',
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    getUserDetail(cookies.get('userId')).then(data => {
      this.getUserDetail(data.companyCode);
    });
  }
  getUserDetail(companyCode) {
    this.setState({ companyCode: companyCode });
  }
  render() {
    const fields = [{
      field: 'name',
      title: '项目名称',
      required: true
    }, {
      field: this.view ? 'chargeName' : 'chargeUser',
      title: '负责人',
      type: this.view ? '' : 'select',
      listCode: '631086',
      params: {
        companyCode: this.state.companyCode,
        type: 'O'
      },
      keyName: 'userId',
      valueName: 'loginName',
      required: true
    }, {
      field: 'quyu',
      title: '地区',
      type: 'citySelect',
      required: true
    }, {
      field: 'address',
      title: '详细地址',
      required: true
    }, {
      field: 'longitude',
      title: '经度',
      required: true
    }, {
      field: 'latitude',
      title: '纬度',
      required: true
    }, {
      field: 'attendanceStarttime',
      title: '上班时间',
      type: 'time',
      required: true
    }, {
      field: 'attendanceEndtime',
      title: '下班时间',
      type: 'time',
      required: true
    }, {
      field: 'bankName',
      title: '银行名称',
      type: this.view ? null : 'select',
      listCode: '631093',
      keyName: 'bankCode',
      valueName: 'bankName',
      _keys: ['companyCard', 'bankName'],
      required: true
    }, {
      field: 'subbranch',
      title: '开户行',
      _keys: ['companyCard', 'subbranch'],
      required: true
    }, {
      field: 'bankcardNumber',
      title: '账户号',
      _keys: ['companyCard', 'bankcardNumber'],
      required: true
    }, {
      field: 'startDatetime',
      title: '项目开始时间',
      type: 'date',
      required: true
    }, {
      field: 'salaryCreateDatetime',
      title: '工资条形成时间(每月多少号)',
      date28: true,
      required: true
    }, {
      field: 'salaryDatetime',
      title: '薪资发放时间(每月多少号)',
      date28: true,
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildDetail({
      fields,
      key: 'code',
      code: this.projectCode,
      view: this.view,
      detailCode: 631358
    });
  }
}

export default ProjectAddedit;
