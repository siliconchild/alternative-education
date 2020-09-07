import React from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import { GlobalStyle } from '../styles/GlobalStyle.js';

export default function Layout({ children }) {
  return (
    <main>
      <GlobalStyle />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
