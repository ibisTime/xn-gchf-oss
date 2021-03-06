import React from 'react';
import { Form, Spin, message } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { getUserId, findAndchangeInfo, isUndefined } from 'common/js/util';
import { getDictList } from 'api/dict';

@Form.create()
class ClassImport extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      cardTypeList: [],
      isLoading: false
    };
  }
  componentDidMount() {
    // getDictList({ parentKey: 'legal_manid_card_type' }).then((cardTypeList) => {
    //   this.setState({
    //     cardTypeList,
    //     isLoading: false
    //   });
    // }).catch(() => {
    //   this.setState({ isLoading: false });
    // });
  }
  render() {
    const { cardTypeList, isLoading } = this.state;
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      pageCode: '631615',
      keyName: 'code',
      valueName: 'name',
      searchName: 'name',
      required: true
    }, {
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      title: '导入模版',
      field: 'downloadTmp',
      type: 'download',
      links: [{
        name: '字段填写说明',
        url: '/download/00.字段填写说明.xlsx'
      }, {
        name: '项目班组导入模板',
        url: '/download/02.项目班组导入模板.xlsx'
      }]
    }, {
      title: '项目班组列表',
      field: 'dateList',
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
          title: '责任人姓名',
          field: 'responsiblePersonName'
        }, {
          title: '责任人联系电话',
          field: 'responsiblePersonPhone'
        }, {
          title: '责任人证件号码',
          field: 'responsiblePersonIdNumber'
        }, {
          title: '备注',
          field: 'remark'
        }, {
          title: '进场时间',
          field: 'entryTime',
          type: 'datetime'
        }, {
          title: '退场时间',
          field: 'exitTime',
          type: 'datetime'
        }]
      }
    }];
    return isLoading ? (
      <Spin spinning={true}></Spin>
    ) : this.buildDetail({
      fields,
      addCode: 631653,
      beforeSubmit: (params) => {
        let error = false;
        // for (let i = 0; i < params.dateList.length; i++) {
        //   let item = params.dateList[i];
        //   if (!isUndefined(item.responsiblePersonIdcardType)) {
        //     let error1 = findAndchangeInfo(cardTypeList, item, 'responsiblePersonIdcardType', i);
        //     if (error1 && !error) {
        //       error = true;
        //     }
        //   }
        // }
        const zzTime = /((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)/;
        let isok = true;
        params.dateList.forEach(item => {
          if(item.entryTime && item.entryTime.trim() && !zzTime.test(item.entryTime)) {
            isok = false;
          }
          if(item.exitTime && item.exitTime.trim() && !zzTime.test(item.exitTime)) {
            isok = false;
          }
        });
        if(isok) {
          return !error;
        }else {
          message.warning('请统一时间格式为yyyy-mm-dd');
        }
      }
    });
  }
}

export default ClassImport;
