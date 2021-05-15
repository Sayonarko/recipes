import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./theme/theme";
import Main from './components/main';
import Header from './components/header';
import Footer from "./components/footer";


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}
