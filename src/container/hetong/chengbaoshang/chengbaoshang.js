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
      companyCodeList: '',
      companyCode: ''
    };
  }
  componentDidMount() {
    if (cookies.get('loginKind') === 'S') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({ 'companyCodeList': data.companyCodeList });
      });
    };
    if (cookies.get('loginKind') === 'O') {
      getUserDetail(cookies.get('userId')).then((data) => {
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
      field: 'projectName',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: '',
        kind: 'O',
        companyCode: this.state.companyCode
      },
      keyName: 'name',
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
      hidden: true,
      title: '关键字'
    }];
    const fields = [{
      field: 'companyName',
      title: '所属公司',
      hidden: true
    }, {
      field: 'projectName',
      title: '所属工程'
    }, {
      field: 'projectName',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: ''
      },
      keyName: 'name',
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
      hidden: true,
      title: '关键字'
    }];
    if (cookies.get('loginKind') === 'P') {
      return this.props.buildList({
        fields: fieldso,
        searchParams: {
          companyCode: ''
        },
        pageCode: 631375
      });
    }
    if (cookies.get('loginKind') === 'O') {
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
      return this.state.companyCodeList ? this.props.buildList({
        fields,
        pageCode: 631375,
        rowKey: 'code',
        searchParams: {
          companyCodeList: this.state.companyCodeList
        }
      }) : null;
    }
  }
}

export default Chengbaoshang;
