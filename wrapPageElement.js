import React from 'react';
import Layout from './src/components/Layout';
import { GlobalStyles } from './src/styles/GlobalStyles';

export const wrapPageElement = ({ element, props }) => (
  <>
    <GlobalStyles />
    <Layout {...props}>{element}</Layout>
  </>
);
