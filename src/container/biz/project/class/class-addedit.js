import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectClassAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.isShowTeam = false;
    this.projectCode = '';
    this.project = '';
    this.corpCode = '';
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
      onChange: (projectCode, data) => {
        if (!this.view) {
          this.projectCode = projectCode;
        }
      },
      required: true,
      readonly: !!this.code,
      formatter: (v, d) => {
        if(!this.project) {
          this.project = v;
        }
        return d.projectName;
      }
    }, {
      title: '所在企业',
      field: 'corpCode',
      type: 'select',
      pageCode: 631645,
      params: {
        projectCode: this.projectCode,
        userId: getUserId()
      },
      keyName: 'corpCode',
      valueName: 'corpName',
      searchName: 'corpName',
      required: true,
      readonly: !!this.code,
      formatter: (v) => {
        if(!this.corpCode) {
          this.corpCode = v;
        }
        return v;
      }
    }, {
      title: '班组编号',
      field: 'teamSysNo',
      readonly: true,
      hidden: !this.view || !this.state.pageData || !this.state.pageData.teamSysNo
    }, {
      title: '班组名称',
      field: 'teamName',
      required: true
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
      type: 'date'
    }, {
      title: '退场时间',
      field: 'exitTime',
      type: 'date'
    }, {
      title: '班组长姓名',
      field: 'teamLeaderName',
      onChange: (v) => {
        if(v) {
          this.isShowTeam = false;
        }else {
          this.isShowTeam = true;
        }
      }
    }, {
      title: '班组长联系电话',
      field: 'teamLeaderPhone',
      mobile: true,
      hidden: this.isShowTeam
    }, {
      title: '班组长证件类型',
      field: 'teamLeaderIdcardType',
      key: 'legal_manid_card_type',
      type: 'select',
      hidden: this.isShowTeam
    }, {
      title: '班组长证件号码',
      field: 'teamLeaderIdNumber',
      hidden: this.isShowTeam
    }, {
      title: '备注',
      field: 'remark',
      type: 'textarea',
      normalArea: true
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
      detailCode: 631666,
      editCode: 631652,
      addCode: 631650,
      beforeDetail: (params) => {
        params.userId = getUserId();
      },
      beforeSubmit: (params) => {
        if(!params.teamLeaderName) {
          delete params.teamLeaderPhone;
          delete params.teamLeaderIdcardType;
          delete params.teamLeaderIdNumber;
        }
        if(!params.corpCode) {
          params.corpCode = this.corpCode;
        }
        if(!params.projectCode) {
          params.projectCode = this.project;
        }
        return params;
      }
    });
  }
}

export default ProjectClassAddEdit;
