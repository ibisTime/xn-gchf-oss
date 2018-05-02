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
} from '@redux/hetong/jindu-addedit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId, getUserDetail } from 'api/user';

@DetailWrapper(
  state => state.hetongJinduAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class JinduAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
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
      field: 'projectCode',
      title: '所属工程',
      type: 'select',
      listCode: '631357',
      params: {
        companyCode: this.state.companyCode
      },
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      field: 'description',
      title: '工程进度描述',
      required: true
    }, {
      field: 'picture',
      title: '工程进度图片',
      type: 'img',
      required: true
    }, {
      field: 'datetime',
      title: '进度时间',
      type: 'datetime',
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.state.companyCode ? this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 631380,
      detailCode: 631387,
      editCode: 631382
    }) : null;
  }
}

export default JinduAddEdit;
