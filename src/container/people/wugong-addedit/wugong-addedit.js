import React from 'react';
import cookies from 'browser-cookies';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/people/wugong-addedit';
import { getQueryString, getUserKind, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getUserDetail } from 'api/user';

@DetailWrapper(
  state => state.peopleWugongAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class PWugongAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentCode: '',
      companyCode: ''
    };
    // if(cookies.get('loginKind') === 'O') {
    //   getUserDetail(cookies.get('userId')).then((data) => {
    //     this.setState({'companyCode': data.companyCode, 'departmentCode': data.departmentCode});
    //   });
    // }
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.break = !!getQueryString('break', this.props.location.search);
    this.leave = !!getQueryString('leave', this.props.location.search);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
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
    const fieldso = [{
      field: 'projectCode',
      title: '项目编号',
      value: this.projectCode,
      hidden: true
    }, {
      field: 'staffCode',
      title: '员工姓名',
      type: 'select',
      listCode: '631416',
      params: {
        projectCode: this.projectCode,
        updater: '',
        companyCode: '',
        kind: 'O'
      },
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      field: 'type',
      title: '员工类别',
      type: 'select',
      key: 'staff_type',
      required: true
    }, {
      field: 'position',
      title: '职位',
      required: true
    }, {
      field: 'salary',
      title: '薪酬',
      amount: true,
      required: true
    }, {
      field: 'joinDatetime',
      title: '入职时间',
      type: 'date',
      required: true
    }, {
      field: 'upUser',
      title: '上级',
      type: 'select',
      listCode: '631086',
      params: {
        type: cookies.get('loginKind'),
        companyCode: this.state.companyCode
      },
      keyName: 'userId',
      valueName: 'realName',
      required: true
    }, {
      field: 'cutAmount',
      title: '迟到/早退每小时扣款金额',
      amount: true,
      required: true
    }, {
      field: 'contractDatetime',
      title: '签约时间',
      type: 'date'
    }, {
      field: 'contentPic',
      title: '合同照片',
      type: 'img',
      single: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    const fields = [{
      field: 'projectCode',
      title: '项目编号',
      value: this.projectCode,
      hidden: true
    }, {
      field: 'staffCode',
      title: '员工',
      type: 'select',
      listCode: '631406',
      params: {
        projectCode: '',
        updater: ''
      },
      keyName: 'staffCode',
      valueName: 'staffName',
      required: true
    }, {
      field: 'type',
      title: '员工类别',
      type: 'select',
      key: 'staff_type',
      required: true
    }, {
      field: 'position',
      title: '职位',
      required: true
    }, {
      field: 'salary',
      title: '薪酬',
      required: true
    }, {
      field: 'joinDatetime',
      title: '入职时间',
      type: 'date',
      required: true
    }, {
      field: 'upUser',
      title: '上级',
      type: 'select',
      listCode: '631086',
      params: {
        type: cookies.get('loginKind'),
        companyCode: this.state.companyCode
      },
      keyName: 'userId',
      valueName: 'realName',
      required: true
    }, {
      field: 'couAmount',
      title: '迟到/早退每小时扣款金额',
      amount: true,
      required: true
    }];
    if (cookies.get('loginKind') === 'O') {
      return this.state.companyCode ? this.props.buildDetail({
        fields: fieldso,
        key: 'id',
        code: this.code,
        view: this.view,
        detailCode: 631417,
        addCode: 631460
      }) : null;
    } else {
      return this.props.buildDetail({
        fields,
        key: 'id',
        code: this.code,
        view: this.view,
        detailCode: 631417,
        addCode: 631460
      });
    }
  }
}

export default PWugongAddedit;
