import React from 'react';
import cookies from 'browser-cookies';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-check';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import { getBankNameByCode } from 'api/project';
import { getUserDetail, getUserId } from 'api/user';
import { basename } from 'upath';

@DetailWrapper(
  state => state.newprojProjectCheck,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentCode: '',
      bankCode: '',
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
      getUserDetail(cookies.get('userId')).then(data => {
        this.getUserDetail(data.departmentCode, data.companyCode);
      });
  }
  getUserDetail(departmentCode, companyCode) {
    this.setState({ departmentCode, companyCode });
  }
  render() {
    const fields = [{
      field: 'name',
      title: '项目名称',
      required: true
    }, {
      field: 'chargeUser',
      title: '负责人',
      type: 'select',
      listCode: '631086',
      params: {
        departmentCode: this.state.departmentCode,
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
      _keys: ['companyCard', 'bankName'],
      listCode: '631093',
      keyName: 'bankCode',
      valueName: 'bankName',
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
      field: 'approveNote',
      title: '审核备注',
      required: true,
      readonly: false
    }];
    return this.state.departmentCode ? this.props.buildDetail({
      fields: fields,
      key: 'code',
      code: this.code,
      view: this.view,
      addCode: 631350,
      detailCode: 631358,
      editCode: 631352,
      buttons: [{
        title: '通过',
        handler: (param) => {
            param.result = '1';
            param.code = this.code;
            param.approver = getUserId();
            this.props.doFetching();
            fetch(631354, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
        },
        check: true,
        type: 'primary'
      }, {
        title: '不通过',
        handler: (param) => {
            param.result = '0';
            param.code = this.code;
            param.approver = getUserId();
            this.props.doFetching();
            fetch(631354, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
        },
        check: true
      }]
    }) : null;
  }
}

export default ProjectCheck;
