import React from 'react';
import { Form } from 'antd';
import { getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectMemberUp extends DetailUtil {
  render() {
    const fields = [{
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      title: '项目人员列表',
      field: 'codeList',
      listCode: 631607,
      params: {
        userId: getUserId(),
        uploadStatus: '0'
      },
      type: 'o2m',
      options: {
        detail: true,
        delete: true,
        fields: [{
          title: '工人姓名',
          field: 'workerName',
          search: true
        }, {
          title: '证件号',
          field: 'idCardNumber'
        }]
      }
    }];
    return this.buildDetail({
      fields,
      addCode: 631694,
      beforeSubmit: (params) => {
        let codeList = params.codeList.map(v => v.code);
        params.codeList = codeList;
        return true;
      }
    });
  }
}

export default ProjectMemberUp;
