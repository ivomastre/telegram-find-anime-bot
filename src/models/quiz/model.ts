import { Schema, model } from 'mongoose';

import { IQuiz } from './index';

const schema = new Schema<IQuiz>(
  {
    correctAnime: { type: String, required: true, default: 'Quiz' },
    animes: [
      {
        title: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const QuizModel = model<IQuiz>('Quiz', schema);
export default QuizModel;
