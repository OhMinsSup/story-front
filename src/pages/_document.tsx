import np from 'nprogress';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Router } from 'next/router';
import { createGetInitialProps } from '@mantine/next';
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

// constants
import { IS_DEPLOY_GROUP_PROD, IS_PROD, SENTRY_DSN } from '@constants/env';

const start = () => np.start();

const done = () => np.done();

Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeComplete', done);
Router.events.on('routeChangeError', done);

Sentry.init({
  enabled: [SENTRY_DSN, IS_PROD, IS_DEPLOY_GROUP_PROD].every(Boolean),
  dsn: SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
