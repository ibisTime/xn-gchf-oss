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
} from '@redux/biz/project/participating';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, isUndefined } from 'common/js/util';
import { getProjectList } from 'api/general';

@listWrapper(
    state => ({
      ...state.projectParticipating,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Participating extends React.Component {
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
      title: '企业名称',
      field: 'corpName',
      search: true
    }, {
      title: '社会信用代码',
      field: 'corpCode'
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
      title: '企业类型',
      field: 'corpType',
      type: 'select',
      key: 'project_corp_type',
      search: true
    }, {
      title: '进场时间',
      field: 'entryTime',
      type: 'datetime'
    }, {
      title: '退场时间',
      field: 'exitTime',
      type: 'datetime'
    }, {
      title: '项目经理',
      field: 'pmName'
    }, {
      title: '项目经理电话',
      field: 'pmPhone'
    }];
    return isLoaded ? this.props.buildList({
      fields,
      pageCode: 631907,
      rowKey: 'corpCode',
      pagination: {
        startKey: 'pageIndex',
        limitKey: 'pageSize',
        start: 0
      },
      exportLimit: 50,
      btnEvent: {
        edit: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/project/projectparticipant/addedit?code=${keys[0]}&pcode=${items[0].projectCode}`);
          }
        },
        detail: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/project/projectparticipant/addedit?v=1&code=${keys[0]}&pcode=${items[0].projectCode}`);
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

export default Participating;
