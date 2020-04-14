import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Search from './Components/Search'
import FilmDetail from './Components/FilmDetail'
import Favorites from './Components/Favorites'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import Test from './Components/Test'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recherche" component={Search} />
      <Stack.Screen name="FilmDetail" component={FilmDetail}

      />
    </Stack.Navigator>
  )
}

function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favoris" component={Favorites} />
      <Stack.Screen name="FilmDetail" component={FilmDetail} />
    </Stack.Navigator>
  )
}

export default class App extends React.Component {

  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
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
                  else if (route.name === 'Test') {
                    iconName = 'ios-rocket';
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
                activeBackgroundColor: '#DDD',
                inactiveBackgroundColor: '#FFF',
                showLabel: false
              }}
            >
              <Tab.Screen name="Test" component={Test} />
              <Tab.Screen name="Recherche" component={SearchStack} options={{ title: 'Rechercher' }} />
              <Tab.Screen name="Favoris" component={FavoritesStack} />
            </Tab.Navigator>


          </NavigationContainer>
        </PersistGate>
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
