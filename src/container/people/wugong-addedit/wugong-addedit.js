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
import { getQueryString } from 'common/js/util';
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
      departmentCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.break = !!getQueryString('break', this.props.location.search);
    this.leave = !!getQueryString('leave', this.props.location.search);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
  }
  componentDidMount() {
    getUserDetail(cookies.get('userId')).then(data => {
      this.getUserDetail(data.departmentCode);
    });
  }
  getUserDetail(departmentCode) {
    this.setState({ departmentCode: departmentCode });
  }
  render() {
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
        projectCode: this.projectCode,
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
        departmentCode: this.state.departmentCode
      },
      keyName: 'userId',
      valueName: 'realName',
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    const break1 = [{
      field: 'startDatetime',
      title: '开始时间',
      type: 'date',
      required: true
    }, {
      field: 'endDatetime',
      title: '结束时间',
      type: 'date',
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    const leave1 = [{
      field: 'leavingDatetime',
      title: '离职时间',
      type: 'date',
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.state.departmentCode ? this.props.buildDetail({
      fields: this.break ? this.break1 : this.leave ? this.leave1 : this.field,
      key: 'id',
      code: this.code,
      view: this.view,
      detailCode: 631417,
      addCode: 631460
    }) : null;
  }
}

export default PWugongAddedit;
