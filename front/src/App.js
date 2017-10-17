import React, { Component } from 'react';
import logo from './logo.svg';
import { Layout, Menu, Icon } from 'antd';
import DataList from './components/data_list';
import './styles/App.css';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="bars" />
              <span className="nav-text">Data List</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <DataList></DataList>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
