import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { supabase } from './lib/supabase';
import { Intro, Cam, Auth } from './screens';

const Stack = createStackNavigator();

const App = () => {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserRole(session.user.email);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserRole(session.user.email);
      }
    });
  }, []);

  const fetchUserRole = async (email) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('is_admin')
        .eq('email', email);

      if (error) {
        console.log('Error fetching user role:', error);
      } else {
        setUserRole(data[0].is_admin ? 'admin' : 'user');
      }
    } catch (error) {
      console.log('Error fetching user role:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session && userRole === 'admin' ? (
          <>
            <Stack.Screen
              name="IntroScreen"
              component={Intro}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CameraScreen"
              component={Cam}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="AuthScreen"
            component={Auth}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;