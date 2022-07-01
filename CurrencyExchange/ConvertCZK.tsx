import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, KeyboardAvoidingView, Platform, Pressable} from "react-native";
import { Picker } from '@react-native-picker/picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CurrencyInfo, RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, 'ConvertCZK'>;

export default function ConvertCZK(props: Props) {
  let currencyList = props.route.params.currencyList
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
    <SafeAreaView style={styles.container}>
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
            selectedValue={selectedCurrencyCode}
            onValueChange={(value, index) => handleValueChange(value, index)}
          >
            {currencyList.map(x => <Picker.Item key={x.code} label={x.code} value={x.code} /> )}
          </Picker>
        <View style={styles.row}>
          <Text style={styles.titleText}>{convertedValue + " " + currencyInfo.currency}</Text>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer} >
        <Pressable style={styles.button} onPress={() => props.navigation.goBack()} >
            <Text style={styles.buttonText}>Close</Text>
        </Pressable>
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
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    height: 64,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#f194ff'
  },
  buttonContainer: {
    paddingHorizontal: 32,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    flex: 1/2,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
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
});