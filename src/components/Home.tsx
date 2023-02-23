import React, {useCallback, useEffect, useContext} from 'react';
import {ListItem, Card} from "@rneui/themed";
import {Button, Text} from "@rneui/base";
import {ScrollView, StyleSheet, View, Dimensions} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {DataContext} from "../contexts/DataContext";
import {convertValueToMask} from "../utils/maskHelper";
import {fetchItems, deleteExpense} from "../actions";

import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";

import {ThemeContext} from "../contexts/ThemeContext"

type PropsNavigation = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({navigation, route}: PropsNavigation) => {
  const {width} = Dimensions.get("screen");
  const {state, dispatch} = useContext(DataContext);
  const {theme,styles} = useContext(ThemeContext);
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

  const localStyles = StyleSheet.create({
    
    titleCard: {
      fontSize: 40,
      color:  theme.colour,
    },
    listItem: {
      backgroundColor: theme.background,
      width: width,
      borderBottomWidth: 1,
    },
    colorTheme: {
      color: theme.colour
    },
  });


  return (
   <ScrollView style={{backgroundColor: theme.background}}>
      <View style={styles.container}>
        <Card
          containerStyle={{
            width: "auto",
            backgroundColor: theme.background,
          }}>
          <Card.Title style={localStyles.titleCard}>
            $ {convertValueToMask(state.totalItems.toFixed(2))}
          </Card.Title>
        </Card>
        <ScrollView style={{maxHeight: 290}}>
          {state.items?.length > 0 ? (
            state.items?.map((item, index) => (
              <ListItem.Swipeable
                key={index}
                bottomDivider
                containerStyle={localStyles.listItem}
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
                  <ListItem.Title style={localStyles.colorTheme}>
                    {item.name}
                  </ListItem.Title>
                  <ListItem.Subtitle style={localStyles.colorTheme}>
                    {item.date}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                  <ListItem.Title style={localStyles.colorTheme}>
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
