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
    this.idCardNumber = getQueryString('code', this.props.location.search);
    this.pCode = getQueryString('pcode', this.props.location.search);
    this.date = getQueryString('date', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '工人姓名',
      field: 'workerName'
    }, {
      title: '证件号',
      field: 'idCardNumber'
    }, {
      title: '刷卡时间',
      field: 'date',
      type: 'datetime'
    }, {
      title: '刷卡进出方向',
      field: 'direction',
      type: 'select',
      key: 'direction'
    }, {
      title: '刷卡近照',
      field: 'image',
      type: 'img',
      single: true
    }, {
      title: '通道',
      field: 'channel'
    }, {
      title: '通行方式',
      field: 'attendType',
      type: 'select',
      key: 'attend_type'
    }, {
      title: '经度',
      field: 'lng'
    }, {
      title: '纬度',
      field: 'lat'
    }, {
      title: '通道的名称',
      field: 'channel'
    }, {
      title: '通行方式',
      field: 'attendType',
      type: 'select',
      key: 'attend_type'
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
      field: 'corpName',
      search: true
    }, {
      title: '所在班组',
      field: 'teamName'
    }];
    return this.props.buildDetail({
      fields,
      key: 'idcardNumber',
      code: this.idCardNumber,
      view: true,
      detailCode: 631919,
      beforeDetail: (params) => {
        params.pageIndex = 0;
        params.pageSize = 1;
        params.projectCode = this.pCode;
        params.date = this.date;
      }
    });
  }
}

export default ProjectInoutAddEdit;
