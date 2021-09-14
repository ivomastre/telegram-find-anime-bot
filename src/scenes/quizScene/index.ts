import { Scenes } from 'telegraf';

import quizFirstStep from './quizFirstStep';
import quizSecondStep from './quizSecondStep';

function quizScene() {
  const scene = new Scenes.WizardScene('quiz', quizFirstStep, quizSecondStep);
  return scene;
}

export default quizScene;
