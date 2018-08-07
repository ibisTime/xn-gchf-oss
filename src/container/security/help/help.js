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
} from '@redux/security/menu';
import { listWrapper } from 'common/js/build-list';
import { getUserKind } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.securityMenu,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userKind: ''
    };
  }
  componentDidMount() {
  }
  render() {
    const fields = [{
      title: '标题',
      field: 'title',
      search: true
    }, {
      title: '适用端',
      field: 'systemCode',
      formatter: (v, d) => {
        return d.systemCode === 'O'
        ? '业主端'
            : d.systemCode === 'S'
        ? '监管端'
                : d.systemCode === 'B'
        ? '银行端'
                        : '平台端';
      }
    }, {
      title: '适用端',
      field: 'systemCode',
      hidden: true,
      type: 'select',
      search: true,
      data: [{
        dkey: 'O',
        dvalue: '业主端'
      }, {
        dkey: 'P',
        dvalue: '平台端'
      }, {
        dkey: 'S',
        dvalue: '监管端'
      }, {
        dkey: 'B',
        dvalue: '银行端'
      }],
      keyName: 'dkey',
      valueName: 'dvalue'
    }, {
      title: '次序',
      field: 'orderNo'
    }];
    return this.props.buildList({
      fields,
      pageCode: 631125,
      deleteCode: 631121
    });
  }
}

export default Help;
