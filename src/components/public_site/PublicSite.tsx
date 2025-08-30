// components/public_site/PublicSite.tsx
import { AppProvider } from '../context/AppContext';
import { AppContainer } from './AppContainer';
import { Home } from './Home';

export function PublicSite() {
  return (
    <AppProvider>
      <AppContainer>
        <Home />
      </AppContainer>
    </AppProvider>
  );
}