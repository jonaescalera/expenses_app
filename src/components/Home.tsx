import React, {useCallback, useEffect, useContext} from 'react';
import {ListItem, Card} from "@rneui/themed";
import {Button, Text} from "@rneui/base";
import {ScrollView, StyleSheet, View, Dimensions} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {ThemeContext} from "./../contexts/ThemeContext";
import {convertValueToMask} from "../utils/maskHelper";
import {fetchItems, deleteExpense} from "../actions";

import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";

type PropsNavigation = NativeStackScreenProps<RootStackParamList, "Home">;


interface HomeProps {
  name: string;
}



const Home = ({navigation, route}: PropsNavigation) => {
  const {width} = Dimensions.get("screen");
  const {state, dispatch} = useContext(ThemeContext);
  const {theme} = state;
  const isFocused = useIsFocused();

  const loadDataCallBack = useCallback(async () => {
    try {
      fetchItems()
        .then(res => {
          dispatch({type: "GET_ITEMS", payload: res});
        })
        .then(() => {
          dispatch({type: "GET_TOTAL_MONTH"});
        })
        .catch(err => dispatch({type: "FETCH_ERROR", payload: err?.message}));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    isFocused && loadDataCallBack();
  }, [loadDataCallBack, isFocused]);

  const editExpense = () => {
    navigation.navigate("AddExpense");
  };

  const deleteItem = async (id: number) => {
    deleteExpense(id)
      .then(() => {
        dispatch({type: "DELETE_ITEM", payload: id});
      })
      .then(() => {
        dispatch({type: "GET_TOTAL_MONTH"});
      })
      .catch(error => dispatch({type: "FETCH_ERROR", payload: error?.message}));
  };

  const styles = StyleSheet.create({
    contain: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    titleCard: {
      fontSize: 40,
      color: theme ? "#2c2c2c" : "white",
    },
    listItem: {
      backgroundColor: theme ? "white" : "#2c2c2c",
      width: width,
      borderBottomWidth: 1,
    },
    colorTheme: {
      color: theme ? "#2c2c2c" : "white",
    },
  });


  return (
   <ScrollView style={{backgroundColor: theme ? "white" : "#2c2c2c"}}>
      <View style={styles.contain}>
        <Card
          containerStyle={{
            width: "auto",
            backgroundColor: theme ? "white" : "#2c2c2c",
          }}>
          <Card.Title style={styles.titleCard}>
            $ {convertValueToMask(state.totalItems.toFixed(2))}
          </Card.Title>
        </Card>
        <ScrollView style={{maxHeight: 290}}>
          {state.items?.length > 0 ? (
            state.items?.map((item, index) => (
              <ListItem.Swipeable
                key={index}
                bottomDivider
                containerStyle={styles.listItem}
                leftContent={() => (
                  <Button
                    title="edit"
                    //onPress={() => editExpense(item)}
                    icon={{name: "edit", color: "white"}}
                    buttonStyle={{minHeight: "100%", backgroundColor: "blue"}}
                  />
                )}
                rightContent={() => (
                  <Button
                    title="Delete"
                    onPress={() => deleteItem(item.id)}
                    icon={{name: "delete", color: "white"}}
                    buttonStyle={{minHeight: "100%", backgroundColor: "red"}}
                  />
                )}>
                <ListItem.Content>
                  <ListItem.Title style={styles.colorTheme}>
                    {item.name}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.colorTheme}>
                    {item.date}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title style={styles.colorTheme}>
                    $ {convertValueToMask(item.price?.toFixed(2))}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem.Swipeable>
            ))
          ) : (
            <Text>No hay saldos</Text>
          )}
          {<Text>{state.error}</Text>}
        </ScrollView>
        <View>
          <Button
            title="Nuevo gasto"
            buttonStyle={{
              backgroundColor: "#33BBFF",
              borderRadius: 3,
            }}
            containerStyle={{
              width: 100,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate("AddExpense")}
          />
        </View>
      </View>
    </ScrollView>
  );
};



export default Home;
