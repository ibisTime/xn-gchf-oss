import React from 'react';
import { Form } from 'antd';
import { getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectAttenceUp extends DetailUtil {
  render() {
    const fields = [{
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      title: '项目班组列表',
      field: 'codeList',
      help: '上传时不需要勾选，会全部上传表格中的数据。若不想上传某项，直接删除即可。',
      listCode: 631727,
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
        }, {
          title: '刷卡时间',
          field: 'date',
          type: 'datetime'
        }, {
          title: '刷卡进出方向',
          field: 'direction',
          type: 'select',
          key: 'direction'
        }]
      }
    }];
    return this.buildDetail({
      fields,
      addCode: 631714,
      beforeSubmit: (params) => {
        let codeList = params.codeList.map(v => v.code);
        params.codeList = codeList;
        return true;
      }
    });
  }
}

export default ProjectAttenceUp;
