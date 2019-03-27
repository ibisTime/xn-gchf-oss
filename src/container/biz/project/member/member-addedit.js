import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/project/member-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.projectMemberAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectMemberAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.pCode = getQueryString('pcode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
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
      title: 'joinedTime',
      field: '加入公会时间',
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
    }];
    return this.props.buildDetail({
      fields,
      key: 'idCardNumber',
      code: this.code,
      view: this.view,
      detailCode: 631913,
      editCode: 631912,
      beforeDetail: (params) => {
        params.pageIndex = 0;
        params.pageSize = 1;
        params.projectCode = this.pCode;
      }
    });
  }
}

export default ProjectMemberAddEdit;
