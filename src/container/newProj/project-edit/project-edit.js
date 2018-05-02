import React from 'react';
import cookies from 'browser-cookies';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-edit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import { getBankNameByCode } from 'api/project';
import { getUserDetail } from 'api/user';
import { basename } from 'upath';

@DetailWrapper(
  state => state.newprojProjectEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectEdit extends React.Component {
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
    // let b = a;
    // this.departmentCode = de;
    this.setState({ departmentCode: departmentCode, companyCode: companyCode });
    console.log(this.state.departmentCode);
  }
  render() {
    const edit = [{
      field: 'name',
      title: '项目名称',
      required: true
    }, {
      field: 'chargeUser',
      title: '负责人',
      type: 'select',
      listCode: '631086',
      params: {
        departmentCode: this.departmentCode,
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
      field: 'startDatetime',
      title: '项目开始时间',
      type: 'date',
      required: true
    }, {
      field: 'salaryDatetime',
      title: '薪资发放时间(每月多少号)',
      required: true
    }, {
      field: 'salaryCreateDatetime',
      title: '工资条形成时间(每月多少号)',
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.state.departmentCode ? this.props.buildDetail({
      fields: edit,
      key: 'code',
      code: this.code,
      view: this.view,
      detailCode: 631358,
      editCode: 631352,
      beforeSubmit: (param) => {
        param.companyCode = this.state.companyCode;
        getBankNameByCode(param.bankName).then(data => {
            param.bankCode = data.bankCode;
        });
        return param;
      },
      buttons: [{
        title: '保存',
        check: true,
        handler: (param) => {
          param.companyCode = this.state.companyCode;
          getBankNameByCode(param.bankName).then(data => {
            param.bankCode = data[0].bankCode;
            param.bankName = data[0].bankName;
            this.props.doFetching();
            console.log(param);
            fetch(631352, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          });
        }
      }, {
        title: '提请审核项目',
        check: true,
        handler: (param) => {
          param.companyCode = this.state.companyCode;
          getBankNameByCode(param.bankName).then(data => {
            param.bankCode = data[0].bankCode;
            param.bankName = data[0].bankName;
            this.props.doFetching();
            console.log(param);
            fetch(631353, param).then(() => {
              showSucMsg('操作成功');
              this.props.cancelFetching();
              setTimeout(() => {
                this.props.history.go(-1);
              }, 1000);
            }).catch(this.props.cancelFetching);
          });
        }
      }]
    }) : null;
  }
}
export default ProjectEdit;
