import React from 'react';

import AppStack from './App';
import AuthStack from './Auth';

export default function Route() {
  return <>{false ? <AppStack /> : <AuthStack />}</>;
}
