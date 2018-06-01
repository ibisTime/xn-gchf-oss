import React from 'react';
import cookies from 'browser-cookies';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/hetong/chengbaoshang';
import { listWrapper } from 'common/js/build-list';
import { getUserDetail } from 'api/user';
import { getQueryString, showSucMsg, getUserId, getUserKind } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.hetongChengbaoshang,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Chengbaoshang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectCodeList: '',
      companyCode: ''
    };
  }
  componentDidMount() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
      });
    };
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'companyCode': data.companyCode });
      });
    };
  }
  render() {
    const fieldso = [{
      field: 'companyName',
      title: '所属公司',
      hidden: true
    }, {
      field: 'projectCode',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: '',
        kind: 'O',
        companyCode: this.state.companyCode
      },
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'bname',
      title: '承包商名称'
    }, {
      field: 'bmobile',
      title: '承包商手机号'
    }, {
      field: 'contractDatetime',
      title: '签约时间',
      type: 'date'
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      search: true,
      title: '关键字',
      placeholder: '承包商名字/手机号',
      hidden: true
    }];
    const fields = [{
      field: 'companyName',
      title: '所属公司',
      hidden: true
    }, {
      field: 'projectCode',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: '',
        companyCode: this.state.companyCode
      },
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'bname',
      title: '承包商名称'
    }, {
      field: 'bmobile',
      title: '承包商手机号'
    }, {
      field: 'contractDatetime',
      title: '签约时间',
      type: 'date'
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      search: true,
      title: '关键字',
      placeholder: '承包商名字/手机号',
      hidden: true
    }];
    if (getUserKind() === 'P') {
      return this.props.buildList({
        fields,
        searchParams: {
          companyCode: ''
        },
        pageCode: 631375
      });
    }
    if (getUserKind() === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields: fieldso,
        searchParams: {
          updater: '',
          kind: 'O',
          companyCode: this.state.companyCode
        },
        pageCode: 631375,
        rowKey: 'code'
      }) : null;
    } else {
      return this.state.projectCodeList ? this.props.buildList({
        fields,
        pageCode: 631375,
        rowKey: 'code',
        searchParams: {
          projectCodeList: this.state.projectCodeList
        }
      }) : null;
    }
  }
}

export default Chengbaoshang;
