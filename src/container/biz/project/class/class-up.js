import React from 'react';
import { Form } from 'antd';
import { getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectClassUp extends DetailUtil {
  render() {
    const fields = [{
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      title: '项目班组列表',
      field: 'codeList',
      help: '上传时不需要勾选，会全部上传表格中的数据。若不想上传某项，直接删除即可。',
      listCode: 631667,
      params: {
        userId: getUserId(),
        uploadStatus: '0'
      },
      type: 'o2m',
      options: {
        detail: true,
        delete: true,
        fields: [{
          title: '班组编号',
          field: 'teamSysNo'
        }, {
          title: '班组名称',
          field: 'teamName'
        }]
      }
    }];
    return this.buildDetail({
      fields,
      addCode: 631654,
      beforeSubmit: (params) => {
        let codeList = params.codeList.map(v => v.code);
        params.codeList = codeList;
        return true;
      }
    });
  }
}

export default ProjectClassUp;
