import './app.scss';
import { Table } from './components/table/table';
import { Layout } from 'antd';

export function App() {
  const { Header, Content } = Layout;

  return (
    <Layout style={{ height: '100%', width: '100%' }}>
      <Header>
        <h1 className="logo">CASPEL TEST TASK</h1>
      </Header>
      <Layout style={{ height: '100%', width: '100%' }}>
        <Content className="mainContainer">
          <Table/>
        </Content>
      </Layout>
    </Layout>
  );
}
