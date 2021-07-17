import App, { AppContext } from 'next/app';
import { CssBaseline, StylesProvider, ThemeProvider } from '@material-ui/core';
import { wrapper } from '@redux/store/index';
import Head from 'next/head';
import React from 'react';
import useDidMount from 'src/hooks/dom/component.didmount.hook';
import { appWithTranslation } from 'src/i18n';
import StoreTypeObj from '@typescript/types/shared/redux/thunk/Store-Type';
import { getProjectDetail } from '@redux/actions/project-detail';
import theme from '../theme';
import MainContainer from '@components/layout/app/public/skeleton/Main-Container';

const MyApp = ({ Component, pageProps }) => {
  useDidMount(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });
  return (
    <div>
      <Head>
        <title>Patrik Duch, Solutions Architect</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* The rest of your application */}
        <CssBaseline />
        <StylesProvider injectFirst>
          <MainContainer>
            <Component {...pageProps} />
          </MainContainer>
        </StylesProvider>
      </ThemeProvider>
    </div>

  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { store } = appContext.ctx;

  await (store as StoreTypeObj).dispatch(getProjectDetail());

  const pageProps = await App.getInitialProps(appContext);
  return {
    pageProps,
    props: {
      projectDetail: store.getState().projectDetail
    }
  };
};

export default wrapper.withRedux(appWithTranslation(MyApp));