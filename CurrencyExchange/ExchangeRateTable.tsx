import * as React from 'react';
import { FlatList, ListRenderItem, Text, StyleSheet, Button, View, Modal } from 'react-native';
import { Overlay } from 'react-native-elements';
import ConvertCZK from './ConvertCZK';
import BottomModal from './ui_components/BottomModal'
type TableInfo = {
  data: string[]
}

export function ExchangeRateTable(tableInfo: TableInfo) {
  const tableItems = tableInfo.data.map(createTableItem);
  const listData: CurrencyInfo[] = tableItems.filter(notEmpty);
  listData.shift()

  const renderItem: ListRenderItem<CurrencyInfo> = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.countryRowItem}>{item.country}</Text>
      <Text style={styles.rowItem}>{item.code}</Text>
      <Text style={styles.rowItem}>{item.amount}</Text>
      <Text style={styles.rowItem}>{item.rate}</Text>
    </View>
    
  );

  const [visible, setVisible] = React.useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return(
    <>
      <>
        <FlatList 
          data={listData}
          renderItem={renderItem}
          style={styles.flatList}
        />
        <Button
          title="Convert CZK"
          color="#f194ff"
          onPress={toggleOverlay}
        />
      </>
      <ConvertCZK visible={visible} dismissHandler={toggleOverlay} currencyList={listData}></ConvertCZK>
    </>
    
  );
}

type CurrencyInfo = {
  country: string;
  currency: string;
  amount: string;
  code: string;
  rate: string;
}

function createTableItem(lineOfData: string) {
  const items = lineOfData.split("|");
  if (items.length < 5) {
    return
  }

  const tableItem: CurrencyInfo = ({
    'country': items[0],
    'currency': items[1],
    'amount': items[2],
    'code': items[3],
    'rate': items[4],
  })
  return tableItem;
}

const styles = StyleSheet.create({
  countryRowItem: {
    flex: 1.5,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  rowItem: {
    flex: 1,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '85%',
    height: 30,
    alignSelf: 'center'
  },
  flatList: {
    flex: 1,
    width:'100%'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'black'
  }
});

// Unwrap undefined arrays (Is there a better builtin way to do this?)
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  const testDummy: TValue = value;
  return true;
}