import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home';
import ThemeButton from './src/components/ThemeButton';
import { ThemeContextProvider } from './src/contexts/ThemeContext';


export type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ThemeContextProvider>
      <NavigationContainer>      
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
          headerStyle: { backgroundColor: '#33BBFF' },
          headerTintColor: 'white',
          headerRight: () => <ThemeButton />
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="AddExpense" component={AddExpense} /> */}
      </Stack.Navigator>      
      </NavigationContainer>
    </ThemeContextProvider>
  );
};

export default App;
