import React from 'react';
import cookies from 'browser-cookies';
import { Form, Select, DatePicker, Input, Button, Table } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { moneyFormat, dateTimeFormat, dateFormat, tempString,
  showWarnMsg, showSucMsg, showDelConfirm, getUserKind, isUndefined } from 'common/js/util';
import { getWorkbook } from 'common/js/xlsx-util';
import { getOwnerBtns } from 'api/menu';
import { getDictList } from 'api/dict';
import fetch from 'common/js/fetch';
import locale from './date-locale';
import { PIC_PREFIX } from 'common/js/config';
import cityData from 'common/js/lib/city';

moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export default class ListComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedRowKeys: [],
      selectedRows: []
    };
    this.first = true;
    this.options = {
      fields: [],
      rowKey: 'code',
      btnEvent: {},
      singleSelect: true,
      searchParams: {}
    };
  }
  buildList = (options) => {
    this.options = {
      ...this.options,
      ...options
    };
    if (this.first) {
      this.options.pageCode && this.getPageData();
      if (this.options.buttons) {
        this.addOwnerBtns();
      } else if (this.props.parentCode) {
        this.getOwnerBtns();
      }
    }
    const columns = [];
    const searchFields = [];
    this.options.fields.forEach(f => {
      f.search && searchFields.push(f);
      let obj = {
        title: f.title,
        dataIndex: f.field,
        className: f.className || ''
      };
      if (f.type === 'datetime') {
        if (f.render) {
          obj.render = f.render;
        } else {
          obj.render = (v) => {
            return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{dateTimeFormat(v)}</span> : dateTimeFormat(v);
          };
          this.addRender(f, dateTimeFormat);
        }
      } else if (f.type === 'date') {
        if (f.render) {
          obj.render = f.render;
        } else {
          obj.render = (v) => {
            return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{dateFormat(v)}</span> : dateFormat(v);
          };
          this.addRender(f, dateFormat);
        }
      } else if (f.type === 'select' || f.type === 'provSelect') {
        if (f.key) {
          f.keyName = f.keyName || 'dkey';
          f.valueName = f.valueName || 'dvalue';
        } else if (f.type === 'provSelect') {
          f.keyName = 'value';
          f.valueName = 'label';
          f.data = cityData.map(c => ({
            value: c.value,
            label: c.label
          }));
        }
        if (!f.data) {
          f.data = this.props.searchData[f.field];
          this.first && this.getSelectData(f);
        } else if (!this.props.searchData[f.field]) {
          this.props.setSearchData({ data: f.data, key: f.field });
        }
        if (!f.render) {
          obj.render = (value) => {
            let val = this.renderSelect(value, f);
            return f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{val}</span> : val;
          };
        } else {
          obj.render = f.render;
        }
        this.addRender(f, (val) => this.renderSelect(val, f));
      } else if (f.type === 'img') {
        obj.render = (value) => <img style={{ width: '200px' }} src={PIC_PREFIX + value}/>;
      }
      if (f.amount) {
        obj.render = (v, d) => <span style={{whiteSpace: 'nowrap'}}>{moneyFormat(v, d)}</span>;
        this.addRender(f, moneyFormat);
      }
      if (!obj.render) {
        if (f.render) {
          obj.render = f.render;
        } else {
          obj.render = (v) => f.nowrap ? <span style={{whiteSpace: 'nowrap'}}>{v}</span> : v;
          this.addRender(f, v => v);
        }
      }
      if (f.formatter) {
        obj.render = f.formatter;
      } else if (f.amount) {
        obj.render = (v, d) => <span style={{whiteSpace: 'nowrap'}}>{moneyFormat(v, d)}</span>;
      }
      if (f.hidden) {
        return;
      }
      columns.push(obj);
    });
    this.first = false;
    this.columns = columns;
    this.tableClass = this.options.className || '';
    this.searchFields = searchFields;
    return this.getPageComponent(searchFields);
  }
  renderSelect(value, f) {
    let val = '';
    if (value && f.data) {
      let item = f.data.find(v => v[f.keyName] === value);
      val = item
          ? item[f.valueName]
              ? item[f.valueName]
              : tempString(f.valueName, item)
          : '';
    }
    return val;
  }
  addRender(f, func) {
    if (!f.render) {
      f.render = func;
    }
  }
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  }
  searchSelectChange(key, item, start = 1, limit = 20) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    let params = item.params || {};
    params.start = start;
    params.limit = limit;
    params[item.searchName || item.keyName || item.field] = key;
    this.timeout = setTimeout(() => {
      fetch(item.pageCode, params).then(data => {
        params.start++;
        let list = this.props.searchData[item.field] || [];
        list = start === 1 ? [] : list;
        this.props.setSearchData({ data: list.concat(data.list), key: item.field });
      }).catch(() => {});
    }, 300);
  }
  handleRowClick = (record) => {
    let { selectedRowKeys, selectedRows } = this.state;
    let { rowKey } = this.options;
    let idx = selectedRowKeys.findIndex(v => v === record[rowKey]);
    if (this.options.singleSelect) {
      selectedRowKeys = [record[rowKey]];
      selectedRows = [record];
    } else {
      if (idx > -1) {
        selectedRowKeys.splice(idx, 1);
        let idx1 = selectedRows.findIndex(v => v[rowKey] === record[rowKey]);
        selectedRows.splice(idx1, 1);
      } else {
        selectedRowKeys.push(record[rowKey]);
        selectedRows.push(record);
      }
    }
    this.setState({
      selectedRowKeys,
      selectedRows
    });
  }
  // 导出表单
  handleExport() {
    this.props.doFetching();
    let startKey = 'start';
    let limitKey = 'limit';
    if (this.options.pagination) {
      startKey = this.options.pagination.startKey;
      limitKey = this.options.pagination.limitKey;
    }
    fetch(this.options.pageCode, {
      [startKey]: 1,
      [limitKey]: this.options.exportLimit || 1000000,
      ...this.getRealSearchParams(this.props.searchParam),
      ...this.options.searchParams
    }).then(data => {
      if (!data.list.length) {
        this.props.cancelFetching();
        showWarnMsg('暂无数据');
      } else {
        let titles = [];
        let bodys = [];
        data.list.forEach((d, i) => {
          let temp = [];
          this.options.fields.forEach(f => {
            if (i === 0) {
              titles.push(f.title);
            }
            temp.push(f.render(d[f.field], d));
          });
          bodys.push(temp);
        });
        let result = [titles].concat(bodys);
        const wb = getWorkbook();
        wb.getSheet(result, 'SheetJS');
        wb.downloadXls('表格下载');
        this.props.cancelFetching();
      }
    }).catch(this.props.cancelFetching);
  }
  handleReset = () => {
    let noClearFieldsMap = {};
    let noClearFields = this.searchFields
      .filter(f => f.noClear)
      .forEach(f => noClearFieldsMap[f.field] = this.props.form.getFieldValue(f.field));
    this.props.form.resetFields();
    this.props.clearSearchParam();
    this.props.form.setFieldsValue(noClearFieldsMap);
    this.props.setSearchParam(noClearFieldsMap);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let values = this.props.form.getFieldsValue();
    let start = 1;
    if (this.options.pagination && !isUndefined(this.options.pagination.start)) {
      start = this.options.pagination.start;
    }
    this.getPageData(start, values);
  }
  getRealSearchParams(params) {
    let result = {};
    this.options.fields.forEach(v => {
      if (v.type === 'date' || v.type === 'datetime') {
        let format = v.type === 'date' ? DATE_FORMAT : DATETIME_FORMAT;
        if (v.rangedate) {
          let bDate = params[v.field] ? [...params[v.field]] : [];
          if (bDate.length) {
            v.rangedate.forEach((d, index) => {
              result[d] = bDate[index].format(format);
            });
          }
        } else {
          result[v.field] = params[v.field] ? params[v.field].format(format) : params[v.field];
        }
      } else {
        result[v.field] = params[v.field];
      }
    });
    return result;
  }
  goDetail(view) {
    const { selectedRowKeys } = this.state;
    if (!selectedRowKeys.length) {
      showWarnMsg('请选择记录');
    } else if (!this.options.singleSelect && selectedRowKeys.length > 1) {
      showWarnMsg('请选择一条记录');
    } else {
      let url = `${this.props.location.pathname}/addedit?${view ? 'v=1&' : ''}code=${selectedRowKeys[0]}`;
      this.props.history.push(url);
    }
  }
  delete() {
    const { selectedRowKeys } = this.state;
    if (!selectedRowKeys.length) {
      showWarnMsg('请选择记录');
    } else if (this.options.singleSelect && selectedRowKeys.length > 1) {
      showWarnMsg('请选择一条记录');
    } else {
      showDelConfirm({
        onOk: () => {
          let param = { code: selectedRowKeys[0] };
          this.options.beforeDelete && this.options.beforeDelete(param);
          this.props.doFetching();
          fetch(this.options.deleteCode, param).then(data => {
            showSucMsg('操作成功');
            this.getPageData();
          }).catch(this.props.cancelFetching);
        }
      });
    }
  }
  handleBtnClick = (url) => {
    const { btnEvent } = this.options;
    switch(url) {
      case 'add':
        btnEvent.add
          ? btnEvent.add(this.state.selectedRowKeys, this.state.selectedRows)
          : this.props.history.push(`${this.props.location.pathname}/addedit`);
        break;
      case 'edit':
        btnEvent.edit
          ? btnEvent.edit(this.state.selectedRowKeys, this.state.selectedRows)
          : this.goDetail();
        break;
      case 'detail':
        btnEvent.detail
          ? btnEvent.detail(this.state.selectedRowKeys, this.state.selectedRows)
          : this.goDetail(true);
        break;
      case 'delete':
        btnEvent.delete
          ? btnEvent.delete(this.state.selectedRowKeys, this.state.selectedRows)
          : this.delete();
        break;
      case 'export':
        btnEvent.export
          ? btnEvent.export(this.state.selectedRowKeys, this.state.selectedRows)
          : this.handleExport();
        break;
      default:
        btnEvent[url] && btnEvent[url](this.state.selectedRowKeys, this.state.selectedRows);
    }
    this.setState({ selectedRowKeys: [] });
  }
  handleTableChange = (pagination) => {
    this.getPageData(pagination.current);
  }
  // 获取select框的数据
  getSelectData(item) {
    if (item.key) {
      getDictList({ parentKey: item.key, bizType: item.keyCode }).then(data => {
        setTimeout(() => {
          this.props.setSearchData({ data, key: item.field });
        }, 20);
      }).catch(() => {});
    } else if (item.listCode) {
      let param = item.params || {};
      fetch(item.listCode, param).then(data => {
        setTimeout(() => {
          this.props.setSearchData({ data, key: item.field });
        }, 20);
      }).catch(() => {});
    }
  }
  getOwnerBtns() {
    getOwnerBtns(this.props.parentCode, cookies.get('loginKind')).then(data => {
      for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (+data[i].orderNo > +data[j].orderNo) {
            [data[i], data[j]] = [data[j], data[i]];
          }
        }
      }
      this.props.setBtnList(data);
    }).catch(() => {});
  }
  addOwnerBtns() {
    let btnEvent = {};
    let btns = this.options.buttons.map(v => {
      btnEvent[v.code] = v.handler;
      return {
        code: v.code,
        name: v.name,
        url: '/' + v.code
      };
    });
    this.options.btnEvent = btnEvent;
    this.props.setBtnList(btns);
  }
  // 获取页面初始化数据
  getPageData = (current, searchParam) => {
    if (searchParam) {
      this.props.setSearchParam(searchParam);
    } else {
      searchParam = this.props.searchParam;
    }
    searchParam = this.getRealSearchParams(searchParam);
    if (this.options.searchParams) {
      searchParam = {
        ...searchParam,
        ...this.options.searchParams
      };
    }
    this.props.doFetching();
    let startKey = 'start';
    let limitKey = 'limit';
    if (this.options.pagination) {
      startKey = this.options.pagination.startKey;
      limitKey = this.options.pagination.limitKey;
      if (isUndefined(current)) {
        if (!isUndefined(this.options.pagination.start)) {
          current = this.options.pagination.start;
        } else {
          current = this.props.pagination.current;
        }
      }
    } else {
      current = !isUndefined(current) ? current : this.props.pagination.current;
    }
    if (this.options.beforeDetail) {
      this.options.beforeDetail(searchParam);
    }
    const { pagination } = this.props;
    fetch(this.options.pageCode, {
      [startKey]: current,
      [limitKey]: pagination.pageSize,
      ...searchParam
    }).then(data => {
      this.props.cancelFetching();
      this.props.setTableData(data.list);
      this.props.setPagination({
        ...pagination,
        current,
        total: data.totalCount
      });
      this.options.afterDetail && this.options.afterDetail(data);
    }).catch(this.props.cancelFetching);
  }
  getPageComponent(searchFields) {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
      type: this.options.singleSelect ? 'radio' : 'checkbox'
    };
    return (
      <div>
        {searchFields.length ? (
          <Form className="search-form" layout="inline" onSubmit={this.handleSubmit}>
            {this.getSearchFields(searchFields)}
          </Form>
        ) : null}
        <div className="tools-wrapper" style={{ marginTop: 8 }}>
          {this.props.btnList.map(v => (
            <Button key={v.code} onClick={() => {
              this.handleBtnClick(v.url.substr(1));
            }}>{v.name}</Button>
          ))}
        </div>
        <div className="table-wrapper">
          <Table
            bordered
            locale={{emptyText: '暂无数据'}}
            rowSelection={rowSelection}
            columns={this.columns}
            className={this.tableClass}
            rowKey={record => record[this.options.rowKey]}
            dataSource={this.props.tableList}
            pagination={this.props.pagination}
            loading={this.props.fetching}
            onChange={this.handleTableChange}
            onRowClick={this.handleRowClick}
          />
        </div>
      </div>
    );
  }
  getSearchFields(fields) {
    const { getFieldDecorator } = this.props.form;
    const children = [];
    fields.forEach(v => {
      children.push(
        <FormItem key={v.field} label={v.title}>
          {getFieldDecorator(`${v.field}`, { initialValue: this.props.searchParam[v.field] })(
            this.getItemByType(v.type, v)
          )}
        </FormItem>
      );
    });
    children.push(
      <FormItem key='searchBtn'>
        <Button type="primary" htmlType="submit">搜索</Button>
        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
      </FormItem>
    );
    return children;
  }
  getItemByType(type, item) {
    switch(type) {
      case 'select':
        return item.pageCode ? this.getSearchSelectItem(item) : this.getSelectItem(item);
      case 'date':
        return item.rangedate ? this.getRangeDateItem(item) : this.getDateItem(item);
      case 'datetime':
        return item.rangedate ? this.getRangeDateItem(item, true) : this.getDateItem(item, true);
      default:
        return <Input style={{ width: 200 }} placeholder={item.placeholder} />;
    }
  }
  getSelectItem(item) {
    return <Select
            showSearch
            notFoundContent='暂无数据'
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: 200 }}
            placeholder="请选择">
            {item.data ? item.data.map(d => (
              <Option key={d[item.keyName]} value={d[item.keyName]}>
                {d[item.valueName] ? d[item.valueName] : tempString(item.valueName, d)}
              </Option>
            )) : null}
          </Select>;
  }
  getSearchSelectItem(item) {
    return <Select
            mode="combobox"
            showArrow={false}
            filterOption={false}
            onSearch={v => this.searchSelectChange(v, item)}
            optionLabelProp="children"
            style={{ width: 200 }}
            placeholder="请输入关键字搜索">
            {item.data ? item.data.map(d => (
              <Option key={d[item.keyName]} value={d[item.keyName]}>
                {d[item.valueName] ? d[item.valueName] : tempString(item.valueName, d)}
              </Option>
            )) : null}
          </Select>;
  }
  getDateItem(item, isTime = false) {
    let format = DATE_FORMAT;
    let places = '选择日期';
    if (isTime) {
      format = DATETIME_FORMAT;
      places = '选择时间';
    }
    return <DatePicker
            allowClear={false}
            locale={locale}
            placeholder={places}
            format={format}
            showTime={isTime} />;
  }
  getRangeDateItem(item, isTime = false) {
    let format = DATE_FORMAT;
    let places = ['开始日期', '结束日期'];
    if (isTime) {
      format = DATETIME_FORMAT;
      places = ['开始时间', '结束时间'];
    }
    return <RangePicker
            allowClear={false}
            locale={locale}
            placeholder={places}
            ranges={{ '今天': [moment(), moment()], '本月': [moment(), moment().endOf('month')] }}
            format={format}
            showTime={isTime} />;
  }
}
