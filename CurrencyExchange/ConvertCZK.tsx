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
  currencyList.sort((a,b) => (a.code > b.code) ? 1 : ((b.code > a.code) ? -1 : 0))

  const [czhValue, setInputValue] = React.useState(0);
  const [currencyInfo, setCurrency] = React.useState(currencyList[0]);
  const [selectedCurrencyCode, setSelectedValue] = React.useState(currencyList[0].code);
  const [convertedValue, setConvertedValue] = React.useState("0.00");


  function handleValueChange(value, index) {
    setSelectedValue(value);
    setCurrency(currencyList[index]);
    
    setConvertedValue(getConvertedValue(czhValue, currencyList[index]));
  }

  function handleTextChange(text) {
    const num = Number(text);
    setInputValue(num);
    setConvertedValue(getConvertedValue(num, currencyInfo));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          onChangeText={handleTextChange}
          value={String(czhValue)}
          keyboardType="numeric"
        />
        <Text style={styles.text}>
          CZK to
        </Text>
      </View>
      <Picker
          style = {styles.pickerStyle}
          selectedValue={selectedCurrencyCode}
          onValueChange={(value, index) => handleValueChange(value, index)}
        >
          {currencyList.map(x => <Picker.Item label={x.code} value={x.code} /> )}
        </Picker>
      <View style={styles.row}>
        <Text style={styles.titleText}>{convertedValue + " " + currencyInfo.currency}</Text>
      </View>
      
    </SafeAreaView>
  );
};

function getConvertedValue(czhValue: number, info: CurrencyInfo) {
  const convertedValue: number = czhValue / Number(info.rate) * Number(info.amount) 
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
    margin: 12,
    fontSize: 20
  },

  titleText: {
    margin: 12,
    fontSize: 20,
    fontWeight: '500'
  },

  pickerStyle: {
    justifyContent: 'center',
    alignContent: 'center'
  }
  
});