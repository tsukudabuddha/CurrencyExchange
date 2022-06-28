import React from "react";
import { Button, StyleSheet, TextInput, View, Text, KeyboardAvoidingView, Platform, Pressable} from "react-native";
import { Picker } from '@react-native-picker/picker';

type CurrencyInfo = {
  country: string;
  currency: string;
  amount: string;
  code: string;
  rate: string;
}

type ConvertCZKProps = {
  currencyList: CurrencyInfo[]
  visible: boolean
  dismissHandler: () => void
}

export default function ConvertCZK({route, navigation}) {
  let currencyList = route.params.currencyList
  currencyList.sort((a,b) => (a.code > b.code) ? 1 : ((b.code > a.code) ? -1 : 0))

  const [czhValue, setInputValue] = React.useState(0);
  const [currencyInfo, setCurrency] = React.useState(currencyList[0]);
  const [selectedCurrencyCode, setCurrencyCode] = React.useState(currencyList[0].code);
  const [convertedValue, setConvertedValue] = React.useState("0.00");

  function handleValueChange(value: string, index: number) {
    setCurrencyCode(value);
    setCurrency(currencyList[index]);
    
    setConvertedValue(getConvertedValue(czhValue, currencyList[index]));
  }

  function handleTextChange(text: string) {
    const num = Number(text);
    setInputValue(num);
    setConvertedValue(getConvertedValue(num, currencyInfo));
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.contentContainer}
      >
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
            {currencyList.map(x => <Picker.Item key={x.code} label={x.code} value={x.code} /> )}
          </Picker>
        <View style={styles.row}>
          <Text style={styles.titleText}>{convertedValue + " " + currencyInfo.currency}</Text>
        </View>
      </KeyboardAvoidingView>
      <Pressable style={styles.button} onPress={() => navigation.goBack()} >
          <Text style={styles.text}>Close</Text>
      </Pressable>
    </View>
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
    flex: 1
  },
  button: {
    width: "80%",
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue'    
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
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