import React from 'react';

import { Search, UserMenu, VerticalMenu } from './components';
import { Header, Main, RightPanel, Sidebar, TopNav } from './containers';

import './css/main.css';
import './css/utilities.css';

const App = () => (
  <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
      <Sidebar />
      <div className="flex-lg-1 h-screen overflow-y-lg-auto">
        <TopNav />
        <Header />
        <main className="py-6 bg-surface-secondary">
          <Main />
          <RightPanel />
        </main>
      </div>
  </div>
);

export default App;
