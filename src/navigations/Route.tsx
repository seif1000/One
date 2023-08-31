import React, {useEffect, useState} from 'react';

import AppStack from './App';
import AuthStack from './Auth';
import auth from '@react-native-firebase/auth';

export default function Route() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return <>{user ? <AppStack /> : <AuthStack />}</>;
}
