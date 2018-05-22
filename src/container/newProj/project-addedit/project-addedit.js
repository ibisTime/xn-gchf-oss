import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-addedit';
import { getQueryString, showSucMsg, getUserId, getUserKind } from 'common/js/util';
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
      projectCodeList: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then(data => {
        this.setState({ 'projectCodeList': data.projectCodeList });
      });
    } else {
      getUserDetail(getUserId()).then(data => {
        this.setState({ 'companyCode': data.companyCode });
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
      type: 'lnglat',
      lnglat: 'quyu',
      lnglatTo: ['longitude', 'latitude'],
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
      listCode: '631116',
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
    const fieldos = [{
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
      field: 'quyus',
      title: '详细地址',
      formatter: (v, d) => {
        return d.province + d.city + d.area + d.address + '';
      },
      required: true
    }, {
      field: 'attendanceStarttimes',
      title: '上下班时间',
      type: 'time',
      formatter: (v, d) => {
        return d.attendanceStarttime + '--' + d.attendanceEndtime;
      },
      required: true
    }, {
      field: 'bankCode',
      title: '银行名称',
      type: this.view ? null : 'select',
      listCode: '631116',
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
      field: 'salaryCreateDatetimes',
      title: '工资条形成时间',
      date28: true,
      formatter: (v, d) => {
        return '每月' + d.salaryCreateDatetime + '多少号';
      },
      required: true
    }, {
      field: 'salaryDatetimes',
      title: '薪资发放时间',
      date28: true,
      formatter: (v, d) => {
        return '每月' + d.salaryDatetime + '多少号';
      },
      required: true
    }];
    if (getUserKind() === 'O') {
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
    } else if (getUserKind() === 'S') {
      return this.state.projectCodeList ? this.props.buildDetail({
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
    } else {
      return this.props.buildDetail({
        fields: this.view ? fieldos : fields,
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
      });
    }
  }
}

export default ProjectAddedit;
