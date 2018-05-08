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
} from '@redux/hetong/jindu';
import { listWrapper } from 'common/js/build-list';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.hetongJindu,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Jindu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    if(cookies.get('loginKind') === 'O') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({'companyCode': data.companyCode});
        console.log(this.state.companyCode);
      });
    }
  }
  render() {
    const fieldso = [{
      field: 'projectCode',
      title: '工程编号'
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
      valueName: 'name',
      hidden: true
    }, {
      field: 'projectName',
      title: '工程名称'
    }, {
      field: 'description',
      title: '工程进度描述'
    }, {
      field: 'datetime',
      title: '进度时间',
      type: 'date'
    }, {
      field: 'updater',
      title: '更新人'
    }, {
      field: 'updateDatetime',
      title: '更新时间',
      type: 'datetime'
    }, {
      field: 'keyword',
      search: true,
      hidden: true,
      title: '关键字'
    }];
    const fields = [{
      field: 'projectCode',
      title: '工程编号'
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
      valueName: 'name',
      hidden: true
    }, {
      field: 'projectName',
      title: '工程名称'
    }, {
      field: 'description',
      title: '工程进度描述'
    }, {
      field: 'datetime',
      title: '进度时间',
      type: 'date'
    }, {
      field: 'updater',
      title: '更新人'
    }, {
      field: 'updateDatetime',
      title: '更新时间',
      type: 'datetime'
    }, {
      field: 'keyword',
      search: true,
      hidden: true,
      title: '关键字'
    }];
    if(cookies.get('loginKind') === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields: fieldso,
        pageCode: 631385,
        searchParams: {
          updater: '',
          kind: 'O',
          companyCode: this.state.companyCode
        }
      }) : null;
    }else {
      return this.props.buildList({
        fields,
        pageCode: 631385,
        searchParams: {
          updater: ''
        }
      });
    }
  }
}

export default Jindu;
