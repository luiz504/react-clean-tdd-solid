import { faker } from '@faker-js/faker'
import { RemoteFetchSurveysModel } from '../use-cases/fetch-surveys/remote-fetch-surveys'

const mockRemoteSurveyModel = (): RemoteFetchSurveysModel => ({
  id: faker.string.uuid(),
  question: faker.lorem.sentence(),
  answers: [
    { answer: faker.lorem.word(), image: faker.image.url() },
    { answer: faker.lorem.word() },
  ],
  date: faker.date.recent().toString(),
  didAnswer: faker.datatype.boolean(),
})
export const mockRemoteSurveysModel = (
  length = 3,
): RemoteFetchSurveysModel[] => {
  return Array.from({ length }, mockRemoteSurveyModel)
}
