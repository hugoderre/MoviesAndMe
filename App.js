import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Search from './Components/Search'
import Detail from './Components/Detail'
import Favorites from './Components/Favorites'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SearchStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Recherche" component={Search} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  )
}

export default class App extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Recherche"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Recherche') {
                  iconName = 'ios-search';
                } else if (route.name === 'Favoris') {
                  iconName = 'ios-heart';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'black',
              inactiveTintColor: 'gray',
              activeBackgroundColor:'#DDD',
              inactiveBackgroundColor:'#FFF',
              showLabel: false
            }}
          >
            <Tab.Screen name="Recherche" component={SearchStack} options={{ title: 'Rechercher' }}/>
            <Tab.Screen name="Favoris" component={Favorites} />
          </Tab.Navigator>
          
          {/* <Stack.Screen name="Detail" component={Detail} /> */}
        </NavigationContainer>
      </Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
