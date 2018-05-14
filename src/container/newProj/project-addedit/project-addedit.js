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
      companyCode: '',
      companyCodeList: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    getUserDetail(cookies.get('userId')).then(data => {
      console.log(data.companyCode);
      this.setState({ 'companyCode': data.companyCode });
    });
    if (cookies.get('loginKind') === 'S') {
      getUserDetail(cookies.get('userId')).then(data => {
        console.log(data.companyCode);
        this.setState({ 'companyCodeList': data.companyCodeList });
      });
    }
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
      field: 'bankCode',
      title: '银行名称',
      type: this.view ? null : 'select',
      listCode: '631093',
      keyName: 'bankCode',
      valueName: 'bankName',
      _keys: ['companyCard', 'bankName'],
      required: true
    }, {
      field: 'companyCode',
      formatter: (v, d) => {
        return this.state.companyCode;
      },
      hidden: true
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
    if (cookies.get('loginKind') === 'O') {
      return this.state.companyCode ? this.props.buildDetail({
        fields,
        key: 'code',
        code: this.projectCode,
        view: this.view,
        beforeSubmit: (params) => {
          for (let i = 0; i < this.props.selectData.bankCode.length; i++) {
            if (params.bankCode === this.props.selectData.bankCode[i].bankCode) {
              params.bankName = this.props.selectData.bankCode[i].bankName;
            }
          }
          return params;
        },
        editCode: 631352,
        detailCode: 631358,
        addCode: 631350
      }) : null;
    } else if (cookies.get('loginKind') === 'S') {
      return this.state.companyCodeList ? this.props.buildDetail({
        fields,
        key: 'code',
        code: this.projectCode,
        view: this.view,
        beforeSubmit: (params) => {
          for (let i = 0; i < this.props.selectData.bankCode.length; i++) {
            if (params.bankCode === this.props.selectData.bankCode[i].bankCode) {
              params.bankName = this.props.selectData.bankCode[i].bankName;
            }
          }
          return params;
        },
        editCode: 631352,
        detailCode: 631358,
        addCode: 631350
      }) : null;
    }
  }
}

export default ProjectAddedit;
