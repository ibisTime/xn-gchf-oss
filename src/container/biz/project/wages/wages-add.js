import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectWagesAdd extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      projectCode: '',
      corpCode: ''
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
      title: '所属企业',
      field: 'corpCode',
      type: 'select',
      pageCode: this.state.projectCode ? 631907 : '',
      params: {
        projectCode: this.state.projectCode
      },
      pagination: {
        startKey: 'pageIndex',
        start: 0,
        limitKey: 'pageSize'
      },
      keyName: 'corpCode',
      valueName: 'corpName',
      onChange: (corpCode, data) => {
        let cropInfo = data.find(v => (v.corpCode + '') === corpCode);
        if (cropInfo) {
          let pageData = _this.state.pageData || {};
          _this.setState({
            pageData: {
              ...pageData,
              corpName: cropInfo.corpName
            }
          });
        }
        this.setState({ corpCode });
      },
      hidden: !this.state.projectCode,
      required: true
    }, {
      title: '所在班组',
      field: 'teamSysNo',
      type: 'select',
      keyName: 'teamSysNo',
      valueName: 'teamName',
      searchName: 'teamName',
      pageCode: this.state.corpCode ? 631910 : '',
      params: {
        projectCode: this.state.projectCode,
        corpCode: this.state.corpCode
      },
      pagination: {
        startKey: 'pageIndex',
        start: 0,
        limitKey: 'pageSize'
      },
      hidden: !this.state.corpCode,
      required: true
    }, {
      field: 'corpName',
      hidden: true,
      required: true
    }, {
      title: '发放工资的年月',
      field: 'payMonth',
      type: 'month',
      required: true
    }, {
      title: '明细列表',
      field: 'detailList',
      type: 'o2m',
      options: {
        rowKey: 'idCardNumber',
        add: true,
        edit: true,
        detail: true,
        delete: true,
        fields: [{
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
          title: '出勤天数',
          field: 'days',
          natural: true
        }, {
          title: '总工时',
          field: 'workHours',
          number: true
        }, {
          title: '发放工资银行卡号',
          field: 'payRollBankCardNumber',
          bankCard: true,
          required: true
        }, {
          title: '发放工资银行名称',
          field: 'payRollBankName',
          required: true
        }, {
          title: '发放工资银行代码',
          field: 'payRollBankCode',
          key: 'bank_code',
          type: 'select',
          required: true
        }, {
          title: '工资代发银行卡号',
          field: 'payBankCardNumber',
          bankCard: true,
          required: true
        }, {
          title: '工资代发银行名称',
          field: 'payBankName',
          required: true
        }, {
          title: '工资代发银行代码',
          field: 'payBankCode',
          key: 'bank_code',
          type: 'select',
          required: true
        }, {
          title: '应发金额',
          field: 'totalPayAmount',
          amount: true,
          required: true
        }, {
          title: '实发金额',
          field: 'actualAmount',
          amount: true,
          required: true
        }, {
          title: '是否为补发',
          field: 'isBackPay',
          type: 'select',
          key: 'is_not',
          required: true
        }, {
          title: '发放日期',
          field: 'balanceDate',
          type: 'date',
          required: true
        }, {
          title: '第三方工资单编号',
          field: 'thirdPayRollCode',
          required: true
        }]
      }
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 631920
    });
  }
}

export default ProjectWagesAdd;
