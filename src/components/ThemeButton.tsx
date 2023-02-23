import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeButton: React.FC = () => {
  const {theme, setDarkMode, isDarkMode} = useContext(ThemeContext);
  
  const changeTheme = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <Icon
      onPress={changeTheme}
      name={!isDarkMode ? 'nights-stay' : 'wb-sunny'}
      size={30}
      color="white"
    />
  );
};

export default ThemeButton;
