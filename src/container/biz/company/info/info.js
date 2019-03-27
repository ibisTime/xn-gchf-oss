import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/company/info';
import { listWrapper } from 'common/js/build-list';
import { getUserId, showWarnMsg } from 'common/js/util';

@listWrapper(
    state => ({
      ...state.companyInfo,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class CompanyInfo extends React.Component {
  render() {
    const fields = [{
      title: '企业名称',
      field: 'corpName',
      search: true
    }, {
      title: '统一社会信用代码',
      field: 'corpCode',
      search: true
    }, {
      title: '注册地区编码',
      field: 'areaCode'
    }, {
      title: '状态',
      field: 'uploadStatus',
      type: 'select',
      key: 'upload_status',
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 631255,
      deleteCode: 631252,
      btnEvent: {
        edit: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].uploadStatus == '2') {
            showWarnMsg('当前状态下不可修改');
          } else {
            this.props.history.push(`/company/info/addedit?code=${keys[0]}`);
          }
        },
        up: () => this.props.history.push('/company/info/up')
      },
      beforeDetail: (params) => {
        params.userId = getUserId();
      }
    });
  }
}

export default CompanyInfo;
