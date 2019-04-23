import React from 'react';
import { Form } from 'antd';
import { getUserId, getOrganizationCode } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectAttenceCreate extends DetailUtil {
  constructor(props) {
    super(props);
    this.projectCode = '';
  }
  render() {
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      pageCode: '631615',
      keyName: 'code',
      valueName: 'name',
      searchName: 'name',
      required: true,
      onChange: (projectCode) => {
        this.projectCode = projectCode;
      }
    }, {
      title: '所在班组',
      field: 'teamSysNo',
      type: 'select',
      keyName: 'code',
      valueName: 'teamName',
      searchName: 'teamName',
      pageCode: 631665,
      params: {
        projectCode: this.projectCode,
        userId: getUserId()
      },
      required: true
    }, {
      title: '刷卡进出方向',
      field: 'direction',
      type: 'select',
      key: 'direction',
      required: true
    }, {
      title: '开始时间',
      field: 'startDatetime',
      type: 'datetime',
      required: true
    }, {
      title: '结束时间',
      field: 'endDatetime',
      type: 'datetime',
      required: true
    }, {
      field: 'userId',
      value: getUserId(),
      hidden: true
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      addCode: 631715,
      detailCode: 631726
    });
  }
}

export default ProjectAttenceCreate;
