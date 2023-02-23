import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home';
import ThemeButton from './src/components/ThemeButton';
import { DataProvider } from './src/contexts/DataContext';
import AddExpense from './src/components/AddExpense';
import { ThemeProvider } from './src/contexts/ThemeContext';


export type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {

  return (
    <DataProvider>
      <ThemeProvider>
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
        <Stack.Screen name="AddExpense" component={AddExpense} />
      </Stack.Navigator>      
      </NavigationContainer>
      </ThemeProvider>
    </DataProvider>
  );
};

export default App;
