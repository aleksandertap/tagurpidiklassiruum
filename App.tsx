import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from './components/icon';

export default function App() {
  return (
    <View style={styles.container}>
      {/* History ikoon kastis, marginRight vaheks */}
      <View style={{ marginRight: 10 }}>
      <Icon type="history" color="white" />
      </View>
      <Icon type="settings" color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',    // paigutab kastid kõrvuti
    padding: 20,
    // React Native ei toeta 'gap', kasuta margin kastidel.
  },
});

