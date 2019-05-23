import React from 'react';
import { Form } from 'antd';
import { getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';
import fetch from 'common/js/fetch';

@Form.create()
class ProjectWagesAdd extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      projectCode: '',
      corpCode: '',
      isBackPay: false,
      teamSysNo: '',
      businessUser: '',
      businessProject: ''
    };
  }
  render() {
    let _this = this;
    const fields = [{
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      title: '项目编码',
      field: 'projectCode',
      type: 'select',
      pageCode: '631615',
      keyName: 'code',
      valueName: 'name',
      searchName: 'name',
      onChange: (projectCode, data) => {
        this.setState({ projectCode });
      },
      required: true
    }, {
      title: '所属企业',
      field: 'corpCode',
      type: 'select',
      pageCode: 631645,
      params: {
        projectCode: this.state.projectCode,
        userId: getUserId()
      },
      keyName: 'corpCode',
      valueName: 'corpName',
      onChange: (corpCode, data) => {
        let filData = data.filter(item => item.corpCode === corpCode);
        _this.setState({ corpCode, businessProject: filData[0].code });
      },
      hidden: !this.state.projectCode,
      required: true
    }, {
      title: '所在班组',
      field: 'teamSysNo',
      type: 'select',
      keyName: 'code',
      valueName: 'teamName',
      searchName: 'teamName',
      pageCode: 631665,
      params: {
        projectCode: this.state.projectCode,
        corpCode: this.state.corpCode,
        userId: getUserId()
      },
      hidden: !this.state.corpCode,
      required: true,
      onChange(v) {
        _this.setState({
          teamSysNo: v
        });
      }
    }, {
      title: '发放工资的年月',
      field: 'payMonth',
      type: 'month',
      required: true
    }, {
      title: '明细列表',
      field: 'detailList',
      type: 'o2m',
      required: true,
      options: {
        add: true,
        edit: true,
        detail: true,
        delete: true,
        fields: [{
          title: '员工编号',
          field: 'workerCode',
          type: 'select',
          pageCode: 631605,
          keyName: 'code',
          searchName: 'workerName',
          valueName: '{{projectName.DATA}}-{{teamName.DATA}}-{{workerName.DATA}}-{{idcardNumber.DATA}}',
          params: {
            projectCode: this.state.projectCode,
            teamSysNo: _this.state.teamSysNo,
            userId: getUserId()
          },
          required: true,
          onChange(v) {
            _this.setState({
              workerCode: v,
              businessUser: v
            });
          },
          render(v) {
            return v;
          }
        }, {
          title: '工人工资银行',
          field: 'workerBankCard',
          type: 'select',
          required: true,
          pageCode: '631765',
          keyName: 'code',
          searchName: 'bankNumber',
          valueName: '{{bankName.DATA}}-{{bankNumber.DATA}}',
            params: {
              businessType: '002',
              businessSysNo: this.state.businessUser,
              userId: getUserId()
          },
          render(v) {
              return v;
          }
        }, {
          title: '所在参建单位银行',
          field: 'corpBankCard',
          type: 'select',
          required: true,
          pageCode: '631765',
          keyName: 'code',
          searchName: 'bankNumber',
          valueName: '{{bankName.DATA}}-{{bankNumber.DATA}}',
            params: {
              businessType: '001',
              businessSysNo: this.state.businessProject,
                userId: getUserId()
          },
          render(v) {
              return v;
          }
        }, {
          title: '应发金额',
          field: 'totalPayAmount',
          required: true
        }, {
          title: '实发金额',
          field: 'actualAmount',
          required: true
        }, {
          title: '发放日期',
          field: 'balanceDate',
          type: 'date',
          required: true
        }, {
          title: '是否为补发',
          field: 'isBackPay',
          type: 'select',
          key: 'is_not',
          required: true,
          onChange: (v) => {
            this.setState({ isBackPay: v === '1' });
          }
        }, {
          title: '补发月份',
          field: 'backPayMonth',
          type: 'month',
          required: this.state.isBackPay,
          hidden: !this.state.isBackPay,
          render(v) {
            if(!_this.state.isBackPay) {
              return '';
            }else {
              return v;
            }
          }
        }, {
          title: '出勤天数',
          field: 'days',
          natural: true
        }, {
          title: '总工时',
          field: 'workHours',
          number: true
        }, {
          title: '第三方工资单编号',
          field: 'thirdPayRollCode'
        }]
      }
    }];
    return this.buildDetail({
      fields,
      view: false,
      addCode: 631770
    });
  }
}

export default ProjectWagesAdd;
