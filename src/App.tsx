import React from 'react';
import { observer } from 'mobx-react-lite';
import ContentPage from './pages/Content-page';
import GlobalStyle from './theme/GlobalStyle';
import ThemeProvider from './theme/Theme';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = observer(() => {
  return (
   <>
    <GlobalStyle />
    <BrowserRouter>
      <ThemeProvider>
        <ContentPage />
      </ThemeProvider>
    </BrowserRouter>
   </>
  );
});

export default App;
