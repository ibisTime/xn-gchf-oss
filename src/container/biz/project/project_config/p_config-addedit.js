import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectBasicConfig extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = getQueryString('v', this.props.location.search);
    this.isSend = true;
  }
  render() {
    const fields = [{
      field: 'localProjectCode',
      title: '项目名称',
      required: true,
      type: 'select',
      listCode: '631617',
      keyName: 'code',
      valueName: 'name',
      searchName: 'name'
    }, {
      field: 'projectCode',
      title: '国家平台项目编码',
      required: true
    }, {
      field: 'password',
      title: '密码',
      required: true
    }, {
      field: 'secret',
      title: '国家平台项目秘钥',
      required: true
    }];
    return this.buildDetail({
      view: this.view,
      fields,
      code: this.code,
      detailCode: 631627,
      editCode: 631622,
      addCode: 631622
    });
  }
}

export default ProjectBasicConfig;
