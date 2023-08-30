import React from 'react';

import AppStack from './App';
import AuthStack from './Auth';

export default function Route() {
  return <>{true ? <AppStack /> : <AuthStack />}</>;
}
