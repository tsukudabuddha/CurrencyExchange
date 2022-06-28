import * as React from 'react'; 
import { Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ExchangeRateTable } from './ExchangeRateTable';
 
const queryClient = new QueryClient()
export default function CurrencyExchange() {
  return (
    <SafeAreaView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Main/>
      </QueryClientProvider>
    </SafeAreaView>
  )
}

function Main() {
  const { status, data } = useQuery('exchangeRates', getExhangeRates)

  if (status === "loading") {
    return <Text>Loading ...</Text>;
  }
  if (status === "error") {
    return <Text>{"An error has occurred"}</Text>;
  }
  
  return data ? <ExchangeRateTable data={data}></ExchangeRateTable> : null;
}

async function getExhangeRates() {
  const response = await fetch('https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt');
  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  const responseData = await response.text();
  if (responseData) {
    const linesOfData = responseData.split(/\r?\n/);
    return linesOfData;
  } else {
    throw new Error("Problem reading data")
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
});
