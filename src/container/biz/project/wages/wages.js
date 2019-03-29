import React from 'react';
import moment from 'moment';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/project/wages';
import { listWrapper } from 'common/js/build-list';
import { isUndefined, showWarnMsg, dateTimeFormat, dateFormat, monthFormat } from 'common/js/util';
import { getProjectList, getParticipatingList, getClassList, getCompanyList } from 'api/general';

@listWrapper(
    state => ({
      ...state.projectWages,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ProjectWages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      projectCode: ''
    };
    this.nowMonth = moment(new Date(), 'YYYY-MM');
  }
  componentDidMount() {
    Promise.all([
      getProjectList(),
      getCompanyList()
    ]).then(([projects, companys]) => {
      if (!projects.length || !companys.list.length) {
        return Promise.reject();
      }
      this.projectCode = projects[0].projectCode;
      this.corpCode = companys.list[0].corpCode;
      this.corpName = companys.list[0].corpName;
      this.setState({
        projectCode: this.projectCode,
        corpCode: this.corpCode,
        corpName: this.corpName,
        payMonth: this.nowMonth
      });
      return getClassList(this.projectCode);
    }).then((data) => {
      if (!data.list.length) {
        return Promise.reject();
      }
      // 防止访问过快，接口返回同一接口并发访问的错误
      setTimeout(() => {
        this.setState({
          isLoaded: true,
          teamSysNo: data.list[0].teamSysNo
        });
      }, 100);
    }).catch(() => {
      this.setState({ isLoaded: true });
    });
  }
  render() {
    const { isLoaded, projectCode, teamSysNo, corpCode, corpName } = this.state;
    const fields = [{
      title: '工人姓名',
      field: 'workerName',
      search: true
    }, {
      title: '证件号',
      field: 'idCardNumber'
    }, {
      title: '发放工资的月份',
      field: 'payMonth',
      type: 'month',
      render: (v, d) => d ? monthFormat(d.balanceDate) : '',
      search: true
    }, {
      title: '出勤天数',
      field: 'days'
    }, {
      title: '总工时',
      field: 'workHours'
    }, {
      title: '应发金额',
      field: 'totalPayAmount',
      amount: true
    }, {
      title: '实发金额',
      field: 'actualAmount',
      amount: true
    }, {
      title: '是否为补发',
      field: 'isBackPay',
      type: 'select',
      key: 'is_not'
    }, {
      title: '对应项目',
      field: 'projectName'
    }, {
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'projectCode',
      valueName: 'projectName',
      onChange: (pCode) => {
        this.setState({ projectCode: pCode });
      },
      hidden: true,
      search: true,
      noClear: true
    }, {
      title: '所在企业',
      field: 'corpCode',
      pageCode: '631255',
      params: {
        uploadStatus: '2'
      },
      keyName: 'corpCode',
      valueName: 'corpName',
      onChange: (cCode, data) => {
        let cropInfo = data.find(v => v.corpCode == cCode);
        if (cropInfo) {
          this.setState({ corpName: cropInfo.corpName });
        }
        this.setState({ corpCode: cCode });
      },
      type: 'select',
      hidden: true,
      search: true
    }, {
      title: '所在企业',
      field: 'corpName'
    }, {
      title: '所在班组',
      field: 'teamName'
    }, {
      title: '所在班组',
      field: 'teamSysNo',
      type: 'select',
      pageCode: '631910',
      keyName: 'teamSysNo',
      valueName: 'teamName',
      params: { projectCode },
      pagination: {
        startKey: 'pageIndex',
        limitKey: 'pageSize',
        start: 0
      },
      search: true,
      noClear: true,
      hidden: true
    }];
    return isLoaded ? this.props.buildList({
      fields,
      pageCode: 631921,
      rowKey: ['idCardNumber', 'balanceDate'],
      pagination: {
        startKey: 'pageIndex',
        limitKey: 'pageSize',
        start: 0
      },
      exportLimit: 50,
      btnEvent: {
        add: () => {
          this.props.history.push('/project/wages/add');
        },
        detail: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            let item = items[0];
            let mon = monthFormat(item.balanceDate);
            let url = '/project/wages/addedit?v=1&code=' + item.idCardNumber +
              '&pcode=' + item.projectCode + '&mon=' + mon + '&team=' + item.teamSysNo +
              '&corp=' + item.corpCode + '&corpn=' + item.corpName;
            this.props.history.push(url);
          }
        }
      },
      beforeDetail: (params) => {
        if (isLoaded && projectCode && !this.isBefored) {
          this.isBefored = true;
          // 这个页面是第一次加载，并且redux里“对应项目”没有值
          if (isUndefined(this.props.searchParam.projectCode)) {
            params.projectCode = projectCode;
          }
          if (isUndefined(this.props.searchParam.payMonth)) {
            params.payMonth = this.nowMonth.format('YYYY-MM');
          }
          if (isUndefined(this.props.searchParam.teamSysNo)) {
            params.teamSysNo = teamSysNo;
          }
          if (isUndefined(this.props.searchParam.corpName)) {
            params.corpName = corpName;
          }if (isUndefined(this.props.searchParam.corpCode)) {
            params.corpCode = corpCode;
          }
        } else {
          if (params.corpCode === corpCode && params.corpName !== corpName) {
            params.corpName = corpName;
          }
        }
      },
      afterDetail: () => {
        if (isUndefined(this.props.searchParam.projectCode)) {
          this.props.form.setFieldsValue({
            projectCode,
            corpCode,
            corpName,
            teamSysNo,
            payMonth: this.nowMonth
          });
          let values = this.props.form.getFieldsValue();
          this.props.setSearchParam(values);
        }
      }
    }) : null;
  }
}

export default ProjectWages;
