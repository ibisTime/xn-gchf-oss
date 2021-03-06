import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form, Spin } from 'antd';
import { noop, tempString, isUndefined } from 'common/js/util';
import { formItemLayout } from 'common/js/config';
import fetch from 'common/js/fetch';

const { Option } = Select;
const FormItem = Form.Item;

export default class CSearchSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectFetch: true,
      list: []
    };
  }
  componentDidUpdate() {
    this.initList();
  }
  initList() {
    const { initVal, isLoaded, field, resetFields } = this.props;
    if (isLoaded) {
      if (!this.hasInitVal) {
        this.hasInitVal = true;
        this.searchSelectChange(initVal, true);
      } else if (this.paramFlag) {
        this.paramFlag = false;
        resetFields([field]);
        this.searchSelectChange(initVal, true);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.isPropsChange(nextProps) || this.isStateChange(nextState);
  }
  isPropsChange(nextProps) {
    const { field, rules, readonly, getFieldValue, hidden, initVal, inline,
      keyName, valueName, searchName, pageCode, isLoaded, params, getFieldError } = this.props;
    let nowValue = getFieldValue(field);
    let flag = this.prevValue !== nowValue;
    if (isUndefined(this.prevValue) || isUndefined(nowValue)) {
      flag = isUndefined(this.prevValue) && isUndefined(nowValue) ? false : this.prevValue !== nowValue;
    }
    this.prevValue = flag ? nowValue : this.prevValue;
    let paramFlag = this.isParamsChange(params, nextProps.params);
    let nowErr = getFieldError(field);
    let errFlag = this.isErrChange(nowErr);
    if (errFlag) {
      this.prevErr = nowErr;
    }
    this.paramFlag = paramFlag;
    return nextProps.field !== field || nextProps.rules.length !== rules.length ||
      nextProps.readonly !== readonly || nextProps.hidden !== hidden ||
      nextProps.initVal !== initVal || nextProps.inline !== inline ||
      nextProps.keyName !== keyName || nextProps.valueName !== valueName ||
      nextProps.searchName !== searchName || nextProps.pageCode !== pageCode ||
      nextProps.isLoaded !== isLoaded || flag || paramFlag || errFlag;
  }
  // item.params是否改变
  isParamsChange(params, nextParams) {
    if (isUndefined(params) || isUndefined(nextParams)) {
      return isUndefined(params) && isUndefined(nextParams) ? false : params !== nextParams;
    }
    for (let k in params) {
      if (params[k] !== nextParams[k]) {
        return true;
      }
    }
    return false;
  }
  // 控件的错误信息是否改变
  isErrChange(nextErr) {
    if (isUndefined(this.prevErr) || isUndefined(nextErr)) {
      return isUndefined(this.prevErr) && isUndefined(nextErr) ? false : this.prevErr !== nextErr;
    } else if (this.prevErr.length !== nextErr.length) {
      return true;
    }
    let flag = false;
    this.prevErr.forEach((e, i) => {
      if (e !== nextErr[i]) {
        flag = true;
      }
    });
    return flag;
  }
  isStateChange(nextState) {
    const { selectFetch, list } = this.state;
    return nextState.selectFetch !== selectFetch || nextState.list.length !== list.length;
  }
  getSelectProps(onChange) {
    const props = {
      allowClear: this.props.allowClear,
      mode: 'combobox',
      showArrow: false,
      filterOption: false,
      style: { minWidth: 200 },
      onSearch: this.searchSelectChange,
      optionLabelProp: 'children',
      notFoundContent: this.state.selectFetch ? <Spin size="small"/> : '暂无数据',
      placeholder: '请输入关键字搜索'
    };
    if (onChange) {
      props.onSelect = (v) => onChange(v, this.state.list);
    }
    return props;
  }
  getReadonlyValue(initVal, readonly, keyName, valueName, multiple) {
    let value = '';
    const { list } = this.state;
    if (readonly && list && list.length && !isUndefined(initVal)) {
      value = list.filter(v => v[keyName] == initVal);
      value = value && value.length
        ? value[0][valueName] || tempString(valueName, value[0])
        : initVal;
    }
    return value;
  }
  searchSelectChange = (keyword, isFirst) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    if (!this.state.selectFetch || this.state.list.length) {
      this.setState({
        selectFetch: true,
        list: []
      });
    }
    let { params, keyName, field, searchName, pagination } = this.props;
    let param = params ? {...params} : {};
    let startKey = 'start';
    let limitKey = 'limit';
    let start = 1;
    if (pagination) {
      startKey = pagination.startKey || 'start';
      limitKey = pagination.limitKey || 'limit';
      start = !isUndefined(pagination.start) ? pagination.start : 1;
    }
    param[startKey] = start;
    param[limitKey] = 20;
    if (!isUndefined(keyword)) {
      let key;
      if (isFirst) {
        key = keyName || searchName || field;
      } else {
        key = searchName || keyName || field;
      }
      param[key] = keyword;
    }
    this.timeout = setTimeout(() => {
      fetch(this.props.pageCode, param).then(data => {
        this.setState({
          selectFetch: false,
          list: data.list || []
        });
      }).catch(() => this.setState({ selectFetch: false }));
    }, 300);
  }
  render() {
    const { label, field, rules, readonly, hidden, getFieldDecorator,
      onChange, initVal, inline, keyName, valueName, isLoaded, code } = this.props;
    const { list } = this.state;
    let layoutProps = inline ? {} : formItemLayout;
    let value = this.getReadonlyValue(initVal, readonly, keyName, valueName);
    !code && this.initList();
    let _initVal = isUndefined(initVal) ? '' : (initVal + '');
    return (
      <FormItem key={field} label={label} {...layoutProps} className={hidden ? 'hidden' : ''}>
        {
          readonly ? <div className="readonly-text">{value}</div>
            : getFieldDecorator(field, {
                rules,
                initialValue: initVal
              })(
              <Select {...this.getSelectProps(onChange)}>
                {list && list.length ? list.map(d => (
                  <Option key={d[keyName] + ''} value={d[keyName] + ''}>
                    {d[valueName] ? d[valueName] : tempString(valueName, d)}
                  </Option>
                )) : null}
              </Select>
            )
        }
      </FormItem>
    );
  }
}

CSearchSelect.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  hidden: PropTypes.bool,
  rules: PropTypes.array,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  pageCode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  initVal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  code: PropTypes.string,
  inline: PropTypes.bool,
  isLoaded: PropTypes.bool,
  params: PropTypes.object,
  searchName: PropTypes.string,
  keyName: PropTypes.string.isRequired,
  valueName: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  getFieldError: PropTypes.func.isRequired,
  resetFields: PropTypes.func.isRequired,
  pagination: PropTypes.object,
  allowClear: PropTypes.bool
};

CSearchSelect.defaultProps = {
  label: 'title',
  field: 'key',
  getFieldDecorator: noop,
  getFieldValue: noop,
  getFieldError: noop,
  resetFields: noop,
  hidden: false,
  inline: false,
  keyName: 'dkey',
  valueName: 'dvalue',
  allowClear: true
};
