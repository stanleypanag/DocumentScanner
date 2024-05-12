import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Intro, Cam, RTU, Auth } from './screens';

const Stack = createStackNavigator();

const App = () => {

  //* set to TRUE to be authenticated
  const isAuthenticated = true;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
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
            <Stack.Screen
              name="RTUScreen"
              component={RTU}
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
