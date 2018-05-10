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
    if(cookies.get('loginKind') === 'O') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({'companyCode': data.companyCode});
      });
    }
    this.code = getQueryString('code', this.props.location.search);
    this.staffCode = getQueryString('staffCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
    this.updater = cookies.get('userId');
  }
  render() {
    const fields = [{
      field: 'contentPic',
      title: '合同照片',
      type: 'img',
      single: true,
      required: true
    },
     {
      field: 'projectCode',
      title: '所属工程',
      type: 'select',
      listCode: '631357',
      params: {
        companyCode: this.state.companyCode,
        kind: 'O',
        updater: ''
      },
      keyName: 'code',
      valueName: 'name',
      required: true
    },
    {
      field: 'staffName',
      title: '工人姓名',
      _keys: ['Staff', 'name'],
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
    return this.state.companyCode ? this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 631400,
      detailCode: 631407,
      editCode: 631402,
      onOk: () => {
        this.props.cancelFetching();
        setTimeout(() => {
          this.props.history.go(-2);
        }, 1000);
      }
    }) : null;
  }
}

export default WugongAddEdit;
