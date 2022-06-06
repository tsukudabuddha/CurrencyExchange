import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text} from "react-native";
import { Button } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';

type CurrencyInfo = {
  country: string;
  currency: string;
  amount: string;
  code: string;
  rate: string;
}

export default function ConvertCZK(currencyList: CurrencyInfo[]) {
  currencyList = currencyList.currencyList

  const [czhValue, onChangeNumber] = React.useState(0);
  const [currency, setCurrency] = React.useState(currencyList[0]);
  const [selectedValue, setSelectedValue] = React.useState(currencyList[0].code)
  const [convertedValue, setConvertedValue] = React.useState(0)

  function handleValueChange(value, index) {
    setSelectedValue(value);
    setCurrency(currencyList[index]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={String(czhValue)}
          keyboardType="numeric"
        />
        <Text style={styles.text}>
          CZK to
        </Text>
      </View>
      <Picker
          selectedValue={selectedValue}
          onValueChange={(value, index) => handleValueChange(value, index)}
        >
          {currencyList.map(x => <Picker.Item label={x.code} value={x.code} /> )}
        </Picker>
      <Button
          title="Convert"
          onPress={() => setConvertedValue(getConvertedValue(czhValue, currency))}
      />
      <Text>{"Converted value " + convertedValue}</Text>
    </SafeAreaView>
  );
};

function getConvertedValue(czhValue: number, currency: CurrencyInfo) {
  const convertedValue: number = czhValue / Number(currency.rate) * Number(currency.amount)
  return convertedValue.toFixed(2)
}


function PickerItem(info: CurrencyInfo) {
  return (
    <Picker.Item label={info.code} value={info}/>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300
  },
  input: {
    flex: 1/2,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  text: {
    padding: 10,
    margin: 12
  }
});