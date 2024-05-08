import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Intro, Cam, RTU } from './screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;