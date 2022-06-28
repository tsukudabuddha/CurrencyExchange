import { NavigationContainer } from '@react-navigation/native';
import CurrencyExchange from './CurrencyExchange/CurrencyExchange';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConvertCZK from './CurrencyExchange/ConvertCZK';


// TODO: Move this somewhere else/ make it public?
type CurrencyInfo = {
  country: string;
  currency: string;
  amount: string;
  code: string;
  rate: string;
}

type RootStackParamList = {
  ExchangeRateTable: undefined;
  ConvertCZK: { currencyList: CurrencyInfo[] };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name="Exchange Rate Table" component={CurrencyExchange} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen name="ConvertCZK" component={ConvertCZK} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
