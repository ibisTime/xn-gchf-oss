import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/project/participating-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.projectParticipatingAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ParticipatingAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.pCode = getQueryString('pcode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
      const fields = [{
        title: '企业名称',
        field: 'corpName',
        required: true
      }, {
        title: '社会信用代码',
        field: 'corpCode',
        required: true
      }, {
        title: '对应项目',
        field: 'projectCode',
        type: 'select',
        listCode: '631626',
        keyName: 'projectCode',
        valueName: 'projectName',
        required: true
      }, {
        title: '企业类型',
        field: 'corpType',
        type: 'select',
        key: 'project_corp_type',
        required: true
      }, {
        title: '进场时间',
        field: 'entryTime',
        type: 'datetime'
      }, {
        title: '退场时间',
        field: 'exitTime',
        type: 'datetime'
      }, {
        title: '项目经理',
        field: 'pmName'
      }, {
        title: '项目经理电话',
        field: 'pmPhone',
        mobile: true
      }, {
        title: '项目经理证件类型',
        field: 'pmIdcardType',
        type: 'select',
        key: 'legal_manid_card_type'
      }, {
        title: '项目经理证件号码',
        field: 'pmIdcardNumber'
      }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      key: 'corpCode',
      detailCode: 631907,
      editCode: 631906,
      addCode: 631905,
      params: {
        pageIndex: 0,
        pageSize: 1,
        projectCode: this.pCode
      }
    });
  }
}

export default ParticipatingAddEdit;
