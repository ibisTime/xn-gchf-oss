import React from 'react';
import { Form } from 'antd';
import { getQueryString, formatImg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectMemberAdd extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      projectCode: ''
    };
  }
  render() {
    let _this = this;
    const fields = [{
      title: '项目编码',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'projectCode',
      valueName: 'projectName',
      onChange: (projectCode, data) => {
        this.setState({ projectCode });
      },
      required: true
    }, {
      title: '所在班组',
      field: 'teamSysNo',
      type: 'select',
      keyName: 'teamSysNo',
      valueName: 'teamName',
      searchName: 'teamName',
      pageCode: this.state.projectCode ? 631910 : '',
      params: {
        projectCode: this.state.projectCode
      },
      pagination: {
        startKey: 'pageIndex',
        start: 0,
        limitKey: 'pageSize'
      },
      onChange: (code, data) => {
        let classInfo = data.find(v => (v.teamSysNo + '') === code);
        if (classInfo) {
          let pageData = _this.state.pageData || {};
          _this.setState({
            pageData: {
              ...pageData,
              corpCode: classInfo.corpCode,
              corpName: classInfo.corpName,
              teamName: classInfo.teamName
            }
          });
        }
      },
      hidden: !this.state.projectCode,
      required: true
    }, {
      field: 'corpCode',
      hidden: true,
      required: true
    }, {
      field: 'corpName',
      hidden: true,
      required: true
    }, {
      field: 'teamName',
      hidden: true,
      required: true
    }, {
      title: '工人列表',
      field: 'workerList',
      type: 'o2m',
      options: {
        rowKey: 'idCardNumber',
        add: true,
        edit: true,
        detail: true,
        delete: true,
        fields: [{
          title: '工人姓名',
          field: 'workerName',
          required: true
        }, {
          title: '证件类型',
          field: 'idCardType',
          type: 'select',
          key: 'legal_manid_card_type',
          required: true
        }, {
          title: '证件号',
          field: 'idCardNumber',
          required: true
        }, {
          title: '工种',
          field: 'workType',
          type: 'select',
          key: 'work_type',
          required: true
        }, {
          title: '工人类型',
          field: 'workRole',
          type: 'select',
          key: 'work_role',
          required: true
        }, {
          title: '是否班长',
          field: 'isTeamLeader',
          type: 'select',
          key: 'is_not',
          required: true
        }, {
          title: '制卡时间',
          field: 'issueCardDate',
          type: 'datetime'
        }, {
          title: '制卡采集照片',
          field: 'issueCardPicUrl',
          type: 'img'
        }, {
          title: '考勤卡号',
          field: 'cardNumber'
        }, {
          title: '发放工资银行卡号',
          field: 'payRollBankCardNumber',
          bankCard: true
        }, {
          title: '发放工资银行名称',
          field: 'payRollBankName'
        }, {
          title: '发放工资总行名称',
          field: 'payRollTopBankName'
        }, {
          title: '工资卡银行联号',
          field: 'bankLinkNumber'
        }, {
          title: '工资卡银行代码',
          field: 'payRollTopBankCode',
          key: 'bank_code',
          type: 'select'
        }, {
          title: '是否购买保险',
          field: 'hasBuyInsurance',
          type: 'select',
          key: 'is_not'
        }, {
          title: '民族',
          field: 'nation',
          required: true
        }, {
          title: '地址',
          field: 'address',
          required: true
        }, {
          title: '头像',
          field: 'headImage',
          type: 'img',
          single: true,
          required: true
        }, {
          title: '政治面貌',
          field: 'politicsType',
          type: 'select',
          key: 'politics_type',
          required: true
        }, {
          title: '加入公会时间',
          field: 'joinedTime',
          type: 'datetime'
        }, {
          title: '手机号码',
          field: 'cellPhone',
          mobile: true,
          required: true
        }, {
          title: '文化程度',
          field: 'cultureLevelType',
          type: 'select',
          key: 'culture_level_type',
          required: true
        }, {
          title: '特长',
          field: 'Specialty'
        }, {
          title: '是否有重大病史',
          field: 'hasBadMedicalHistory',
          type: 'select',
          key: 'is_not'
        }, {
          title: '紧急联系人姓名',
          field: 'urgentLinkMan'
        }, {
          title: '紧急联系方式',
          field: 'urgentLinkManPhone',
          mobile: true
        }, {
          title: '开始工作日期',
          field: 'workDate',
          type: 'date'
        }, {
          title: '婚姻状况',
          field: 'maritalStatus',
          key: 'marital_status',
          type: 'select'
        }, {
          title: '发证机关',
          field: 'grantOrg',
          required: true
        }, {
          title: '正面照',
          field: 'positiveIDCardImage',
          type: 'img',
          single: true
        }, {
          title: '反面照',
          field: 'negativeIDCardImage',
          type: 'img',
          single: true
        }, {
          title: '证件有效期开始日期',
          field: 'startDate',
          type: 'date'
        }, {
          title: '证件有效期结束日期',
          field: 'expiryDate',
          type: 'date'
        }]
      }
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 631911,
      beforeSubmit: (params) => {
        if (params.workerList && params.workerList) {
          params.workerList.forEach(worker => {
            worker.issueCardPicUrl = formatImg(worker.issueCardPicUrl);
            worker.headImage = formatImg(worker.headImage);
            worker.positiveIDCardImage = formatImg(worker.positiveIDCardImage);
            worker.negativeIDCardImage = formatImg(worker.negativeIDCardImage);
          });
        }
        return true;
      }
    });
  }
}

export default ProjectMemberAdd;
