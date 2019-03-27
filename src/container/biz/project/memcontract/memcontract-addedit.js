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
class ProjectContractAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.pCode = getQueryString('pcode', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'projectCode',
      valueName: 'projectName',
      search: true,
      noClear: true
    }, {
      title: '所属企业名称',
      field: 'corpName',
      required: true
    }, {
      title: '所属企业统一社会信用代码',
      field: 'corpCode',
      required: true
    }, {
      title: '证件类型',
      field: 'idcardType',
      type: 'select',
      key: 'legal_manid_card_type',
      required: true
    }, {
      title: '证件号',
      field: 'idcardNumber',
      required: true
    }, {
      title: '合同期限类型',
      field: 'contractPeriodType',
      type: 'select',
      key: 'contract_period_type',
      required: true
    }, {
      title: '开始日期',
      field: 'startDate',
      type: 'date',
      required: true
    }, {
      title: '结束时期',
      field: 'endDate',
      type: 'date',
      required: true
    }, {
      title: '计量单位',
      field: 'unit'
    }, {
      title: '计量单价',
      field: 'unitPrice'
    }];
    return this.props.buildDetail({
      fields,
      key: 'idCardNumber',
      code: this.code,
      view: true,
      detailCode: 631917,
      beforeDetail: (params) => {
        params.pageIndex = 0;
        params.pageSize = 1;
        params.projectCode = this.pCode;
      }
    });
  }
}

export default ProjectContractAddEdit;
