import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CurrencyExchange from './CurrencyExchange/CurrencyExchange';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CurrencyExchange/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
