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
} from '@redux/hetong/wugong-addedit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId, getUserDetail } from 'api/user';

@DetailWrapper(
  state => state.hetongWugongAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class WugongAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.staffCode = getQueryString('staffCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
    this.updater = cookies.get('userId');
    console.log(this.updater);
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
      field: 'contentPic',
      title: '合同照片',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'projectCode',
      title: '所属工程',
      value: this.projectCode,
      hidden: true
    }, {
      field: 'staffName',
      title: '工人姓名',
      _keys: ['staff', 'name'],
      hidden: !this.view
    }, {
      field: 'staffCode',
      title: '工人编号',
      value: this.staffCode,
      hidden: true
    }, {
      field: 'contractDatetime',
      title: '签约时间',
      type: 'date',
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 631400,
      detailCode: 631407,
      editCode: 631402
      // beforeSubmit: (param) => {
      //   param.updater = this;
      //   return param;
      // }
    });
  }
}

export default WugongAddEdit;
