import React from 'react';
import { SafeAreaView } from 'react-native';
import Router from './src/router/router';
import { globalStyle } from './src/styles';
import { Provider } from 'react-redux';
import store from "./src/redux/store";

function App(): JSX.Element{
  return (
    <SafeAreaView style={[globalStyle.container]}>
      <Provider store={store}>
        <Router />
      </Provider>
    </SafeAreaView>
  );
}

export default App;