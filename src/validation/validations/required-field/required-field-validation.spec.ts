import { RequiredFieldError } from '~/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'
import { faker } from '@faker-js/faker'

const makeSut = () => new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  it('Should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })
  it('should return null if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.lorem.word())

    expect(error).toBeNull()
  })
})
