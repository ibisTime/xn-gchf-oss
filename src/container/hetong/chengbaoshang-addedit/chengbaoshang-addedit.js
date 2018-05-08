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
} from '@redux/hetong/chengbaoshang-addedit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId, getUserDetail } from 'api/user';

@DetailWrapper(
  state => state.hetongChengbaoshangAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ChengbaoshangAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    if(cookies.get('loginKind') === 'O') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({'companyCode': data.companyCode});
      });
    }
  }

  render() {
    const fieldso = [{
      field: 'companyCode',
      title: '所属公司',
      value: this.state.companyCode,
      hidden: true
    }, {
      field: 'projectCode',
      title: '所属工程',
      type: 'select',
      listCode: '631357',
      params: {
        companyCode: this.state.companyCode,
        updater: '',
        kind: 'O'
      },
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      field: 'bname',
      title: '承包商名称',
      required: true
    }, {
      field: 'bmobile',
      title: '承包商手机号',
      mobile: true,
      required: true
    }, {
      field: 'contractDatetime',
      title: '签约时间',
      type: 'date',
      required: true
    }, {
      field: 'contentPic',
      title: '合同照片',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'pict1',
      title: '免冠照片',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'pict2',
      title: '手持身份证照片',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'pict3',
      title: '身份证正反面照片',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    const fields = [{
      field: 'companyCode',
      title: '所属公司',
      value: this.state.companyCode,
      hidden: true
    }, {
      field: 'projectCode',
      title: '所属工程',
      type: 'select',
      listCode: '631357',
      params: {
        updater: ''
      },
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      field: 'bname',
      title: '承包商名称',
      required: true
    }, {
      field: 'bmobile',
      title: '承包商手机号',
      mobile: true,
      required: true
    }, {
      field: 'contractDatetime',
      title: '签约时间',
      type: 'date',
      required: true
    }, {
      field: 'contentPic',
      title: '合同照片',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'pict1',
      title: '免冠照片',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'pict2',
      title: '手持身份证照片',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'pict3',
      title: '身份证正反面照片',
      type: 'img',
      single: true,
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    if(cookies.get('loginKind') === 'O') {
      return this.state.companyCode ? this.props.buildDetail({
        fields: fieldso,
        code: this.code,
        view: this.view,
        addCode: 631370,
        detailCode: 631377,
        editCode: 631372
      }) : null;
    }else {
      return this.props.buildDetail({
        fields,
        code: this.code,
        view: this.view,
        addCode: 631370,
        detailCode: 631377,
        editCode: 631372
      });
    }
  }
}

export default ChengbaoshangAddEdit;
