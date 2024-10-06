import { faker } from '@faker-js/faker'

import { SurveyModel } from '../models'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.string.uuid(),
  question: faker.lorem.sentence(),
  answers: [
    { answer: faker.lorem.word(), image: faker.image.url() },
    { answer: faker.lorem.word() },
  ],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
})

export const mockSurveysModel = (length = 3): SurveyModel[] => {
  return Array.from({ length }, mockSurveyModel)
}
