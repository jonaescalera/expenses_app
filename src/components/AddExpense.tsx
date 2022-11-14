import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from "react-hook-form";
import {Input} from "@rneui/themed";
import {Button, Text} from "@rneui/base";

import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {convertDate} from "../utils/dateHelper";

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

  const onSubmit = (data: FormData) => {
    const dateItem = new Date();
    const obj: FormData = {
      //id: data?.id,
      name: data?.name,
      date: convertDate(dateItem),
      price: data?.price,
    };
    //addExpense(obj);
  };


  return(
    <View style={styles.contain}>
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
          />
        )}
        name="name"
      />

      {errors.name && <Text style={styles.alertText}>This is required</Text>}

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
      {errors.price && <Text style={styles.alertText}>This is required</Text>}

      <Button
        style={styles.button}
        title="submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
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

export default AddExpense;