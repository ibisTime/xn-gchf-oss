import React from 'react';
import { Form } from 'antd';
import { getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ParticipatingUp extends DetailUtil {
  render() {
    const fields = [{
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      title: '参建单位列表',
      field: 'codeList',
      listCode: 631647,
      params: {
        userId: getUserId(),
        uploadStatus: '0'
      },
      type: 'o2m',
      options: {
        detail: true,
        delete: true,
        fields: [{
          title: '企业名称',
          field: 'corpName'
        }, {
          title: '统一社会信用代码',
          field: 'corpCode'
        }]
      }
    }];
    return this.buildDetail({
      fields,
      addCode: 631634,
      beforeSubmit: (params) => {
        let codeList = params.codeList.map(v => v.code);
        params.codeList = codeList;
        return true;
      }
    });
  }
}

export default ParticipatingUp;
