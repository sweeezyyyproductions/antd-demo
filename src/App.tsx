import React from 'react';
import { ConfigProvider, Button, Space, Input, Divider } from 'antd';
import { Layout } from "antd";
import { Rate } from 'antd';
import TextEdit from './components/TextEdit';
import NavBar from './components/navBar';
import PodcastTool from './components/podcastTool';

const App: React.FC = () => (
  <>
    <div>Name Generator V1
      <PodcastTool/>
    </div>
  </>
);





export default App;