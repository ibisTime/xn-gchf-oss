import React from 'react';
import { Form } from 'antd';
import { getUserId, getOrganizationCode } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectAttenceCreate extends DetailUtil {
  render() {
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      pageCode: '631615',
      keyName: 'code',
      valueName: 'name',
      searchName: 'name',
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
      view: this.view,
      addCode: 631715
    });
  }
}

export default ProjectAttenceCreate;
