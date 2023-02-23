import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from "react-hook-form";
import {Input} from "@rneui/themed";
import {Button, Text} from "@rneui/base";
import {DataContext} from "../contexts/DataContext";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {convertDate} from "../utils/dateHelper";
import {addItem} from "../actions";
import { ThemeContext } from '../contexts/ThemeContext';

type FormData = {
  name: string;
  price: string;
  date: string;
};

type PropsNavigation = NativeStackScreenProps<RootStackParamList, "AddExpense">;

const AddExpense = ({navigation, route}: PropsNavigation) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();
  const {state, dispatch} = React.useContext(DataContext);
  const {styles, theme} = React.useContext(ThemeContext)
  const {items} = state;
  const [newExpense, setNewExpense] = React.useState("");

  const onSubmit = (data: FormData) => {
    const dateItem = new Date();
    const obj: FormData = {
      //id: data?.id,
      name: data?.name,
      date: convertDate(dateItem),
      price: data?.price,
    };
    addExpense(obj);
  };

  const addExpense = async (newExpense: FormData) => {
    try {
      const newTodos = {
        id: items.length
          ? items.reduce((acc, cur) => {
              if (cur.id > acc.id) return cur;
              return acc;
            }).id + 1
          : 1,
        name: newExpense.name,
        date: newExpense.date,
        //price: Math.round(parseFloat(newExpense.price) * 1e2) / 1e2,
        price: parseFloat(newExpense.price),
      };

      addItem(newTodos)
        .then(() => {
          dispatch({type: "ADD_ITEM", payload: newTodos});
        })
        .catch(err => dispatch({type: "FETCH_ERROR", payload: err?.message}));

      setNewExpense("");
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const styles1 = StyleSheet.create({
    contain: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    input: {
      borderWidth: 1,
      width: 300,
    },
    alertText: {
      color: "red",
    },
    button: {
      alignSelf: "center",
    },
  });

  return(
    <View style={styles1.contain}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        //defaultValue={item?.name}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Add expense"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{color: theme.colour}}
          />
        )}
        name="name"
      />

      {errors.name && <Text style={styles1.alertText}>This is required</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        //defaultValue={item?.price}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Add price"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="price"
      />
      {errors.price && <Text style={styles1.alertText}>This is required</Text>}

      <Button
        style={styles1.button}
        title="submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}



export default AddExpense;