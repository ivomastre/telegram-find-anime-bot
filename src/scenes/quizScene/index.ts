import { Scenes } from 'telegraf';

import quizFirstStep from './quizFirstStep';
import quizSecondStep from './quizSecondStep';

const quizScene = (): Scenes.WizardScene<any> => {
  const scene = new Scenes.WizardScene('quiz', quizFirstStep, quizSecondStep);
  return scene;
};

export default quizScene;
