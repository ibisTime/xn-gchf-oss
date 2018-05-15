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
} from '@redux/staff/allStaff-addeditAdd';
import { getQueryString, showSucMsg, getUserKind, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserDetail } from 'api/user';

@DetailWrapper(
  state => state.staffAllStaffAddEditAdd,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class AllStaffAddEditAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.code = getQueryString('staffCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'companyCodeList': data.companyCodeList });
      });
    };
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        console.log(data.companyCode);
        this.setState({ companyCode: data.companyCode });
      });
    };
  }
  render() {
    const fields = [{
      field: 'name',
      title: '姓名',
      required: true,
      readonly: true
    }, {
      field: 'sex',
      title: '性别',
      required: true,
      readonly: true
    }, {
      field: 'idAddress',
      title: '身份证地址',
      required: true,
      readonly: true
    }, {
      field: 'idKind',
      title: '证件类型',
      type: 'select',
      key: 'id_type',
      required: true
    }, {
      field: 'idNo',
      title: '证件号',
      required: true,
      listCode: '631416',
      readonly: true
    }, {
      field: 'birthday',
      title: '出生年月日',
      readonly: true,
      type: 'datetime'
    }, {
      field: 'idEndDate',
      title: '证件有效结束时间',
      readonly: true
    }, {
      field: 'idNation',
      title: '民族',
      readonly: true
    }, {
      field: 'idPic',
      title: '身份证上头像',
      type: 'img',
      single: true
    }, {
      field: 'idPolice',
      title: '签发机关',
      readonly: true
    }, {
      field: 'isStartDate',
      title: '证件有效开始时间'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631417,
      buttons: [{
        title: '保存',
        check: true,
        handler: (param) => {
          getBankNameByCode(param.bankName).then(data => {
            param.bankCode = data[0].bankCode;
            param.bankName = data[0].bankName;
            param.updater = getUserId();
            this.props.doFetching();
            var code = this.staffCode ? '631412' : '631410';
            fetch(code, param).then(() => {
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

export default AllStaffAddEditAdd;
