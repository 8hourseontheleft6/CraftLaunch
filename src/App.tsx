import { useState } from 'react';
import TitleBar from './components/TitleBar';
import HomePage from './components/HomePage';

function App() {
  const [activeTab, setActiveTab] = useState('首页');

  return (
    <div className="h-full flex flex-col bg-[#f2f3f4]">
      <TitleBar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 flex">
        {activeTab === '首页' && <HomePage />}
        {activeTab === '版本管理' && (
          <div className="flex-1 flex items-center justify-center text-zinc-400 text-sm">
            版本管理
          </div>
        )}
        {activeTab === '下载' && (
          <div className="flex-1 flex items-center justify-center text-zinc-400 text-sm">
            下载
          </div>
        )}
        {activeTab === '设置' && (
          <div className="flex-1 flex items-center justify-center text-zinc-400 text-sm">
            设置
          </div>
        )}
        {activeTab === '关于' && (
          <div className="flex-1 flex items-center justify-center text-zinc-400 text-sm">
            关于
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
