import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-quit';
import { getQueryString, getUserKind, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getUserDetail } from 'api/user';
@DetailWrapper(
  state => state.newProjProjectQuit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectQuit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
  }
  componentDidMount() {
    getUserDetail(getUserId()).then((data) => {
      this.setState({ companyCode: data.companyCode });
    });
  };
  render() {
    const fields = [{
      title: '项目名称',
      field: 'projectCode',
      listCode: '631357',
      params: {
        companyCode: this.state.companyCode,
        kind: 'O'
      },
      keyName: 'code',
      valueName: 'name',
      search: true,
      type: 'select',
      required: true

    }, {
      field: 'staffCode',
      value: this.code,
      hidden: true
    }, {
      title: '离职时间',
      field: 'leavingDatetime',
      required: true,
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      addCode: 631462
    });
  }
}

export default ProjectQuit;
