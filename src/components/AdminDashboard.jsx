import React from 'react';
import { AdminPanel } from './AdminPanel';
import { useContent } from '../context/ContentContext';

export const AdminDashboard = () => {
  const { navigateToView } = useContent();

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      minHeight: '100vh',
      maxHeight: '100vh',
      background: '#0B132B',
      color: '#ffffff',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: 5000
    }}>
      <AdminPanel isStandalone={true} onExit={() => navigateToView('home')} />
    </div>
  );
};
