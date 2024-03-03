import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SuperTokens from 'supertokens-react-native';

import RootNavigation from 'navigation/RootNavigation';
import {LogBox, TextInput} from 'react-native';
import {setCustomText} from 'react-native-global-props';

const customTextProps = {
  allowFontScaling: false,
};

const App = () => {
  useEffect(() => {
    setCustomText(customTextProps);
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    console.disableYellowBox = true;
    // console.log('SuperTokens', SuperTokens);
    LogBox.ignoreAllLogs();
  }, []);

  return <RootNavigation />;
};

export default App;
