import React from 'react';
import { Form, Spin } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { getUserId, findAndchangeInfo, isUndefined } from 'common/js/util';
import { getDictList } from 'api/dict';

@Form.create()
class ExportImport extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      isNotList: [],
      cardTypeList: [],
      workTypeList: [],
      workRoleList: [],
      bankCodeList: [],
      politicsTypeList: [],
      levelTypeList: [],
      maritalstatusList: [],
      isLoading: true
    };
  }
  componentDidMount() {
    Promise.all([
      getDictList({ parentKey: 'is_not' }),
      getDictList({ parentKey: 'legal_manid_card_type' }),
      getDictList({ parentKey: 'work_type' }),
      getDictList({ parentKey: 'work_role' }),
      getDictList({ parentKey: 'bank_code' }),
      getDictList({ parentKey: 'politics_type' }),
      getDictList({ parentKey: 'culture_level_type' }),
      getDictList({ parentKey: 'marital_status' })
    ]).then(([isNotList, cardTypeList, workTypeList, workRoleList,
    bankCodeList, politicsTypeList, levelTypeList, maritalstatusList]) => {
      this.setState({
        isNotList,
        cardTypeList,
        workTypeList,
        workRoleList,
        bankCodeList,
        politicsTypeList,
        levelTypeList,
        maritalstatusList,
        isLoading: false
      });
    }).catch(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { isNotList, cardTypeList, workTypeList, workRoleList, bankCodeList,
      politicsTypeList, levelTypeList, maritalstatusList, isLoading } = this.state;
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'localProjectCode',
      valueName: 'projectName',
      required: true
    }, {
      title: '参建单位列表',
      field: 'workerList',
      type: 'import',
      required: true,
      options: {
        fields: [{
          title: '企业统一社会信用代码',
          field: 'corpCode'
        }, {
          title: '企业名称',
          field: 'corpName'
        }, {
          title: '班组名称',
          field: 'teamName'
        }, {
          title: '工人姓名',
          field: 'workerName'
        }, {
          title: '是否为班组长',
          field: 'isTeamLeader'
        }, {
          title: '证件类型',
          field: 'idCardType'
        }, {
          title: '证件号码',
          field: 'idCardNumber'
        }, {
          title: '当前工种',
          field: 'workType'
        }, {
          title: '工人类型',
          field: 'workRole'
        }, {
          title: '发放工资银行卡号',
          field: 'payRollBankCardNumber'
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
          field: 'payRollTopBankCode'
        }, {
          title: '是否购买保险',
          field: 'hasBuyInsurance'
        }, {
          title: '民族',
          field: 'nation'
        }, {
          title: '地址',
          field: 'address'
        }, {
          title: '政治面貌',
          field: 'politicsType'
        }, {
          title: '加入公会时间',
          field: 'joinedTime',
          type: 'datetime'
        }, {
          title: '手机号码',
          field: 'cellPhone'
        }, {
          title: '文化程度',
          field: 'cultureLevelType'
        }, {
          title: '特长',
          field: 'specialty'
        }, {
          title: '是否有重大病史',
          field: 'hasBadMedicalHistory'
        }, {
          title: '紧急联系人姓名',
          field: 'urgentLinkMan'
        }, {
          title: '紧急联系方式',
          field: 'urgentLinkManPhone'
        }, {
          title: '开始工作日期',
          field: 'workDate',
          type: 'date'
        }, {
          title: '婚姻状况',
          field: 'maritalStatus'
        }, {
          title: '发证机关',
          field: 'grantOrg'
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
    return isLoading ? (
      <Spin spinning={true}></Spin>
    ) : this.buildDetail({
      fields,
      addCode: 631693,
      beforeSubmit: (params) => {
        for (let i = 0; i < params.workerList.length; i++) {
          let item = params.workerList[i];
          findAndchangeInfo(isNotList, item, 'isTeamLeader', i);
          findAndchangeInfo(cardTypeList, item, 'idCardType', i);
          findAndchangeInfo(workTypeList, item, 'workType', i);
          findAndchangeInfo(workRoleList, item, 'workRole', i);
          findAndchangeInfo(politicsTypeList, item, 'politicsType', i);
          findAndchangeInfo(levelTypeList, item, 'cultureLevelType', i);
          if (!isUndefined(item.payRollTopBankCode)) {
            findAndchangeInfo(bankCodeList, item, 'payRollTopBankCode', i);
          }
          if (!isUndefined(item.hasBuyInsurance)) {
            findAndchangeInfo(isNotList, item, 'hasBuyInsurance', i);
          }
          if (!isUndefined(item.hasBadMedicalHistory)) {
            findAndchangeInfo(isNotList, item, 'hasBadMedicalHistory', i);
          }
          if (!isUndefined(item.maritalStatus)) {
            findAndchangeInfo(maritalstatusList, item, 'maritalStatus', i);
          }
        }
        return true;
      }
    });
  }
}

export default ExportImport;
