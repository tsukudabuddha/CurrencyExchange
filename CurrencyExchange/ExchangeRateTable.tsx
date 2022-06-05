import * as React from 'react';
import { FlatList, ListRenderItem, Text, StyleSheet, SafeAreaView, View } from 'react-native';
type TableInfo = {
  data: string[]
}

export function ExchangeRateTable(data: TableInfo) {
  const tableItems = data.data.map(createTableItem);
  const listData: TableItem[] = tableItems.filter(notEmpty);

  // console.log(listData);

  const renderItem: ListRenderItem<TableItem> = ({ item }) => (
    <View style={styles.row}>
      <Text>{item.country}</Text>
      <Text>{item.code}</Text>
      <Text>{item.amount}</Text>
      <Text>{item.rate}</Text>
    </View>
    
  );
  return(
    <FlatList 
      data={listData}
      renderItem={renderItem}
      style={styles.flatList}
    />
  );
}

type TableItem = {
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

  console.log(items);
  const tableItem: TableItem = ({
    'country': items[0],
    'currency': items[1],
    'amount': items[2],
    'code': items[3],
    'rate': items[4],
  })
  return tableItem;
}

const styles = StyleSheet.create({
  rowItem: {
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  row: {
    flexDirection: "row",
    padding: 5
  },
  flatList: {
    flex: 1,
  }
});

// Unwrap undefined arrays (Is there a better builtin way to do this?)
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  const testDummy: TValue = value;
  return true;
}