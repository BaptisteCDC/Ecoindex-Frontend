import React from 'react';
import { ConfigCatProvider, createConsoleLogger, LogLevel, PollingMode } from "configcat-react";
import { EcoIndexComposant } from './components/EcoIndexComposant';

const App: React.FC = () => {
  return (
    <div>
      <h1>Calculatrice d'écoindex de Dior.com</h1>
      <ConfigCatProvider sdkKey="pv_bCAfCm0KMamVlhEYffA/aiO50jtV-k-2271WKmMA8g" pollingMode={PollingMode.AutoPoll} options={{pollIntervalSeconds: 1 }}> 
      <EcoIndexComposant />
      </ConfigCatProvider>
    </div>
  );
};

export default App;