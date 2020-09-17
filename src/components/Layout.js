import React from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

export default function Layout({ children, location }) {
  return (
    <main>
      <Navbar location={location} />
      {children}
      <Footer />
    </main>
  );
}
