import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectClassAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      projectCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.pCode = getQueryString('pcode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    let _this = this;
    const fields = [{
      title: '班组编号',
      field: 'teamSysNo',
      readonly: true,
      hidden: !this.view
    }, {
      title: '班组名称',
      field: 'teamName',
      required: true
    }, {
      title: '班组长姓名',
      field: 'teamLeaderName'
    }, {
      title: '班组长联系方式',
      field: 'teamLeaderPhone',
      mobile: true
    }, {
      title: '班组长证件类型',
      field: 'teamLeaderIdcardType',
      type: 'select',
      key: 'legal_manid_card_type'
    }, {
      title: '班组长证件号码',
      field: 'teamLeaderIdNumber'
    }, {
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'projectCode',
      valueName: 'projectName',
      onChange: (projectCode, data) => {
        if (!this.view) {
          this.setState({ projectCode });
        }
      },
      required: true
    }, {
      title: '所在企业',
      field: 'corpCode',
      type: 'select',
      pageCode: this.state.projectCode ? 631907 : '',
      params: {
        projectCode: this.state.projectCode
      },
      keyName: 'corpCode',
      valueName: 'corpName',
      searchName: 'corpName',
      pagination: {
        startKey: 'pageIndex',
        start: 0,
        limitKey: 'pageSize'
      },
      onChange: (code, data) => {
        if (data) {
          let company = data.find(v => v.corpCode === code);
          if (company) {
            let pageData = _this.state.pageData || {};
            _this.setState({
              pageData: {
                ...pageData,
                corpName: company.corpName
              }
            });
          }
        }
      },
      hidden: this.view || !this.state.projectCode,
      required: true
    }, {
      title: '所在企业',
      field: 'corpName',
      required: true,
      hidden: !this.view
    }, {
      title: '所在企业统一社会信用代码',
      field: 'corpCode1',
      _keys: ['corpCode'],
      hidden: !this.view,
      required: true
    }, {
      title: '责任人姓名',
      field: 'responsiblePersonName'
    }, {
      title: '责任人联系电话',
      field: 'responsiblePersonPhone',
      mobile: true
    }, {
      title: '责任人证件类型',
      field: 'responsiblePersonIdcardType',
      type: 'select',
      key: 'legal_manid_card_type'
    }, {
      title: '责任人证件号码',
      field: 'responsiblePersonIdNumber'
    }, {
      title: '进场时间',
      field: 'entryTime',
      type: 'datetime'
    }, {
      title: '退场时间',
      field: 'exitTime',
      type: 'datetime'
    }, {
      title: '备注',
      field: 'remark',
      type: 'textarea',
      normalArea: true
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      key: 'teamSysNo',
      detailCode: 631910,
      editCode: 631909,
      addCode: 631908,
      beforeDetail: (params) => {
        params.pageIndex = 0;
        params.pageSize = 1;
        params.projectCode = this.pCode;
      }
    });
  }
}

export default ProjectClassAddEdit;
