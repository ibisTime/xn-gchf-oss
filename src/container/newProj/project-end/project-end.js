import React from 'react';
import cookies from 'browser-cookies';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-end';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import { getBankNameByCode } from 'api/project';
import { getUserDetail, getUserId } from 'api/user';

@DetailWrapper(
  state => state.newprojProjectEnd,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectEnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentCode: '',
      bankCode: '',
      companyCode: ''
    };
    this.code = getQueryString('projectCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  // componentDidMount() {
  //     getUserDetail(cookies.get('userId')).then(data => {
  //       this.getUserDetail(data.departmentCode, data.companyCode);
  //     });
  // }
  // getUserDetail(departmentCode, companyCode) {
  //   // let b = a;
  //   // this.departmentCode = de;
  //   this.setState({ departmentCode: departmentCode, companyCode: companyCode });
  //   console.log(this.state.departmentCode);
  // }
  render() {
    const fields = [
      {
      field: 'name',
      title: '项目名称',
      required: true
    }, {
      field: 'chargeUser',
      title: '负责人'
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
      type: 'select',
      listCode: '631116',
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
      required: true
      // render: (v) => {
      //   console.log(v);
      //   // v.companyCard.bankcardNumber
      // }
    }, {
      field: 'endDatetime',
      title: '项目结束时间',
      type: 'date',
      required: true,
      readonly: false
    }, {
      field: 'remark',
      title: '备注',
      required: true,
      readonly: false
    }];
    return this.props.buildDetail({
      fields,
      key: 'code',
      code: this.code,
      view: this.view,
      addCode: 631350,
      detailCode: 631358,
      editCode: 631352,
      buttons: [{
        title: '保存',
        check: true,
        handler: (param) => {
            param.code = this.code;
            param.updater = getUserId();
            this.props.doFetching();
            fetch(631355, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
        }
      },
      {
        title: '返回',
        handler: (param) => {
          this.props.history.go(-1);
        }
      }]
    });
  }
}

export default ProjectEnd;
