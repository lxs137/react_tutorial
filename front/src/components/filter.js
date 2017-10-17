import React, { Component } from 'react';
import { Input, Select, Tag } from 'antd';

const { Option } = Select;
const { Search } = Input;

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state ={
      input_type: 'name',
      input_data: ''
    }
  }
  onInputSelectChange = (val) => {
    this.setState({
      input_type: val
    });
  }
  render() {
    let inputSelect = (
      <Select value={this.state.input_type}
        onChange={this.onInputSelectChange}>
        <Option value="name">姓名</Option>
        <Option value="phone">联系方式</Option>
      </Select>
    );
    return (
      <div>
        <div style={{ width: '25%', margin: '8px 0px' }}>
          <Search 
            value={this.state.input_data}
            addonBefore={inputSelect}
            onChange={(e) => this.setState({ input_data: e.target.value })}
            onSearch={(value) => this.props.onSearch(value, this.state.input_type)}></Search>
        </div>
      </div>

    );
  }
}
