import { AppProvider, useApp } from './state/AppProvider';
import { HomeScreen } from './screens/HomeScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { ChallengeScreen } from './screens/ChallengeScreen';
import { AnswerScreen } from './screens/AnswerScreen';
import { FinalScreen } from './screens/FinalScreen';

/** Router simple basado en la máquina de estados (sin router externo). */
function ScreenRouter() {
  const { screen } = useApp();

  switch (screen) {
    case 'home':
      return <HomeScreen />;
    case 'categories':
      return <CategoriesScreen />;
    case 'challenge':
      return <ChallengeScreen />;
    case 'answer':
      return <AnswerScreen />;
    case 'final':
      return <FinalScreen />;
    default:
      return <HomeScreen />;
  }
}

export function App() {
  return (
    <AppProvider>
      <ScreenRouter />
    </AppProvider>
  );
}
