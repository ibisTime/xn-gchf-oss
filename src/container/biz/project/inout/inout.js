import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/biz/project/inout';
import { listWrapper } from 'common/js/build-list';
import { isUndefined, showWarnMsg } from 'common/js/util';
import { getProjectList } from 'api/general';

@listWrapper(
    state => ({
      ...state.projectInout,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ProjectInout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      projectCode: ''
    };
  }
  componentDidMount() {
    getProjectList().then((data) => {
      if (data.length) {
        this.setState({ projectCode: data[0].projectCode });
      }
      this.setState({ isLoaded: true });
    }).catch(() => {
      this.setState({ isLoaded: true });
    });
  }
  render() {
    const { isLoaded, projectCode } = this.state;
    const fields = [{
      title: '工人姓名',
      field: 'workerName',
      search: true
    }, {
      title: '证件号',
      field: 'idcardNumber'
    }, {
      title: '进退场日期',
      field: 'date',
      type: 'datetime'
    }, {
      title: '类型',
      field: 'type',
      type: 'select',
      key: 'entry_exit_type'
    }, {
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'projectCode',
      valueName: 'projectName',
      search: true,
      noClear: true
    }, {
      title: '所在企业',
      field: 'corpName',
      search: true
    }, {
      title: '所在班组',
      field: 'teamSysNo'
    }];
    return isLoaded ? this.props.buildList({
      fields,
      pageCode: 631915,
      rowKey: ['projectCode', 'idcardNumber', 'teamSysNo'],
      pagination: {
        startKey: 'pageIndex',
        limitKey: 'pageSize',
        start: 0
      },
      exportLimit: 50,
      btnEvent: {
        add: () => {
          this.props.history.push('/project/inout/add');
        },
        detail: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            let item = items[0];
            this.props.history.push(`/project/inout/addedit?v=1&idcard=${item.idcardNumber}&pcode=${item.projectCode}&teamno=${item.teamSysNo}`);
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
        }
      },
      afterDetail: () => {
        this.props.form.setFieldsValue({ projectCode });
        let values = this.props.form.getFieldsValue();
        this.props.setSearchParam(values);
      }
    }) : null;
  }
}

export default ProjectInout;
