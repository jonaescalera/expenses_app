import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';


interface HomeProps {
  name: string;
}

const Home: React.FC<HomeProps> = ({name}) => {
  return (
    <View style={styles.container}>
      <Text>{"name"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Home;
