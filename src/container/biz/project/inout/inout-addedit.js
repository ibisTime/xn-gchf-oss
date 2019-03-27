import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/project/inout-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.projectInoutAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectInoutAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.idCardNumber = getQueryString('idcard', this.props.location.search);
    this.pCode = getQueryString('pcode', this.props.location.search);
    this.teamSysNo = getQueryString('teamno', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '工人姓名',
      field: 'workerName'
    }, {
      title: '证件号',
      field: 'idcardNumber'
    }, {
      title: '进退场日期',
      field: 'date',
      type: 'datetime'
    }, {
      title: '类型',
      field: 'type',
      type: 'select',
      key: 'entry_exit_type'
    }, {
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'projectCode',
      valueName: 'projectName',
      search: true,
      noClear: true
    }, {
      title: '所在企业',
      field: 'corpName'
    }, {
      title: '所在班组',
      field: 'teamSysNo'
    }];
    return this.props.buildDetail({
      fields,
      key: 'idCardNumber',
      code: this.idCardNumber,
      view: true,
      detailCode: 631915,
      beforeDetail: (params) => {
        params.pageIndex = 0;
        params.pageSize = 1;
        params.projectCode = this.pCode;
        params.teamSysNo = this.teamSysNo;
      }
    });
  }
}

export default ProjectInoutAddEdit;
