import ThemeContext from '../contexts/ThemeContext';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

const ThemeButton: React.FC = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  return (
    <Icon
      onPress={handleTheme}
      name={theme ? 'nights-stay' : 'wb-sunny'}
      size={30}
      color="white"
    />
  );
};

export default ThemeButton;
