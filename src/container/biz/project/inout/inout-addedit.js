import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectInoutAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '员工编号',
      field: 'projectWorkerCode',
      type: 'select',
      pageCode: 631605,
      keyName: 'code',
      searchName: 'workerName',
      valueName: '{{workerName.DATA}}-{{idCardNumber.DATA}}',
      params: {
        userId: getUserId()
      },
      required: true
    }, {
      title: '进退场日期',
      field: 'date',
      type: 'datetime',
      required: true
    }, {
      title: '类型',
      field: 'type',
      type: 'select',
      key: 'entry_exit_type',
      required: true
    }, {
      field: 'userId',
      value: getUserId(),
      hidden: true
    }];
    if (this.view) {
      fields.push({
        title: '操作日志',
        field: 'operationLogs',
        type: 'o2m',
        listCode: 631137,
        params: {
          userId: getUserId(),
          refCode: this.code
        },
        options: {
          noSelect: true,
          fields: [{
            title: '操作人',
            field: 'operatorName'
          }, {
            title: '操作类型',
            field: 'operate'
          }, {
            title: '操作时间',
            field: 'operateDatetime',
            type: 'datetime'
          }, {
            title: '备注',
            field: 'remark'
          }]
        }
      });
    }
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631746,
      addCode: 631730,
      editCode: 631732,
      beforeDetail: (params) => {
        params.userId = getUserId();
      }
    });
  }
}

export default ProjectInoutAddEdit;
