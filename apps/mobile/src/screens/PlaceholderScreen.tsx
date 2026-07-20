import {StyleSheet, Text, View} from 'react-native';

export function PlaceholderScreen({label}: {label: string}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label} — coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#666',
    fontSize: 15,
  },
});
