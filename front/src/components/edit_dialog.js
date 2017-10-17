import React, { Component } from 'react';
import { Input, Icon, Select } from 'antd';
import '../styles/edit_dialog.css';

const { Option } = Select;

export default class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
    for(let key in this.props.data) {
      this.state[key] = this.props.data[key];
    }
  }
  onValueChange = (key) => {
    let that = this;
    return (e) => {
      let obj_patch = {};
      obj_patch[key] = e.target.value;
      that.setState(obj_patch, () => that.props.onChange(that.state));
    }
  }
  onSelectChange = (key) => {
    let that = this;
    return (value) => {
      let obj_patch = {};
      obj_patch[key] = value;
      that.setState(obj_patch, () => that.props.onChange(that.state));
    }
  }
  render() {
    return (
      <div>
        <Input key="name" 
          value={this.state.name}
          onChange={this.onValueChange("name")}
          prefix={<Icon type="user"/>}></Input>
        <Select value={this.state.gender} className="selector"
          defaultValue="female"
          onChange={this.onSelectChange("gender")}>
          <Option value="female">女</Option>
          <Option value="male">男</Option>
        </Select>
        <Select value={this.state.role} className="selector"
          defaultValue="guest"
          onChange={this.onSelectChange("role")}>
          <Option value="admin">管理员</Option>
          <Option value="user">普通用户</Option>
          <Option value="guest">访客</Option>
        </Select>
        <Input key="phone" 
          value={this.state.phone}
          onChange={this.onValueChange("phone")}
          prefix={<Icon type="phone"/>}></Input>
      </div>
    );
  }
}