import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import {
  presetGpnDark,
  ThemeContext,
  ThemePreset,
} from '@gpn-design/uikit/Theme';
import client from 'client';
import store from 'store/initStore';

const themeValue: {
  theme: ThemePreset;
  themeClassNames: ThemePreset;
} = { theme: presetGpnDark, themeClassNames: presetGpnDark };

export const Providers: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <ThemeContext.Provider value={themeValue}>
        {children}
      </ThemeContext.Provider>
    </ApolloProvider>
  </Provider>
);
