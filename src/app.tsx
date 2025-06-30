import './app.scss';
import { TablePage } from './pages/tablePage/tablePage';
import { Layout } from 'antd';

export function App() {
  const { Header, Content } = Layout;

  return (
    <Layout style={{ height: '100%', width: '100%' }}>
      <Header>
        <h1 className="logo">CASPEL</h1>
      </Header>
      <Layout style={{ height: '100%', width: '100%' }}>
        <Content className="mainContainer">
          <TablePage></TablePage>
        </Content>
      </Layout>
    </Layout>
  );
}
