import { Document } from 'mongoose';

import QuizModel from './model';

export interface IQuiz extends Document {
  correctAnime: string;
  animes: [
    {
      title: string;
    }
  ];
}

export default QuizModel;
