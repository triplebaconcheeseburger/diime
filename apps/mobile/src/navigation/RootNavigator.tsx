import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {FeedScreen} from '../screens/FeedScreen';
import {PlaceholderScreen} from '../screens/PlaceholderScreen';

export type RootTabParamList = {
  Feed: undefined;
  Shop: undefined;
  Editions: undefined;
  Events: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Shop">{() => <PlaceholderScreen label="Shop" />}</Tab.Screen>
        <Tab.Screen name="Editions">{() => <PlaceholderScreen label="Editions" />}</Tab.Screen>
        <Tab.Screen name="Events">{() => <PlaceholderScreen label="Events" />}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
