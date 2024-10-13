import { Helpers } from '../../helpers/helpers'
import { SurveysMocks } from './mocks'
const elementsId = {
  surveyCard: 'survey-card',
  surveySkeleton: 'survey-skeleton',
  surveyLoadError: 'survey-load-error',
  logoutBtn: 'logout-btn',
  userName: 'user-name',
  surveyDay: 'survey-day',
  surveyMonth: 'survey-month',
  surveyYear: 'survey-year',
  surveyQuestion: 'survey-question',
  surveyShowResultBtn: 'survey-show-result-btn',
  thumbsUpIcon: 'thumbs-up-icon',
  thumbsDownIcon: 'thumbs-down-icon',
}

const makeJqueryDataTestId = (id: string) => `[data-testid="${id}"]`
describe('Page: Surveys', () => {
  beforeEach(() => {
    cy.fixture('fx:account').then((account) => {
      Helpers.setLocalStorageItem('account', account)
    })

    cy.visit('/')
  })
  it('should present error on UnexpectedError', () => {
    SurveysMocks.UnexpectedError()

    cy.getByTestId(elementsId.surveySkeleton).should('have.length', 4)
    cy.getByTestId(elementsId.surveyLoadError).should(
      'contain.text',
      'Falha ao carregar surveys',
    )
    cy.getByTestId(elementsId.surveyCard).should('have.length', 0)
  })
  it('should logout on AccessDeniedError', () => {
    SurveysMocks.AccessDeniedError()
    Helpers.testUrl('/sign-in')
    Helpers.testLocalStorageIsEmpty('account')
  })
  it('should present correct username', () => {
    SurveysMocks.UnexpectedError()
    cy.getByTestId(elementsId.userName).should('contain.text', 'any_name')
  })
  it('should logout on click logout button', () => {
    SurveysMocks.UnexpectedError()
    cy.getByTestId(elementsId.logoutBtn)
      .should('contain.text', 'Logout')
      .should('be.enabled')
      .click()

    Helpers.testUrl('/sign-in')
    Helpers.testLocalStorageIsEmpty('account')
  })
  it('should present the survey items', () => {
    SurveysMocks.Success()
    cy.getByTestId(elementsId.surveyLoadError).should('not.exist')
    cy.getByTestId(elementsId.surveySkeleton).should('have.length', 4)
    cy.getByTestId(elementsId.surveyCard).should('have.length', 0)
    cy.getByTestId(elementsId.surveySkeleton).should('have.length', 0)
    cy.getByTestId(elementsId.surveyCard).should('have.length', 2)
    cy.getByTestId(elementsId.surveyLoadError).should('not.exist')

    cy.getByTestId(elementsId.surveyShowResultBtn)
      .should('have.length', 2)
      .should('be.enabled')
      .should('contain.text', 'Show Result')

    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(
        li.find(makeJqueryDataTestId(elementsId.surveyQuestion)).text(),
        'What is your favorite programming language?',
      )
      assert.equal(
        li.find(makeJqueryDataTestId(elementsId.surveyDay)).text(),
        '12',
      )
      assert.equal(
        li.find(makeJqueryDataTestId(elementsId.surveyMonth)).text(),
        'Oct',
      )
      assert.equal(
        li.find(makeJqueryDataTestId(elementsId.surveyYear)).text(),
        '2023',
      )
    })
    cy.get('li:nth-child(1)')
      .find(makeJqueryDataTestId(elementsId.thumbsUpIcon))
      .should('be.visible')
    cy.get('li:nth-child(1)')
      .find(makeJqueryDataTestId(elementsId.thumbsDownIcon))
      .should('not.exist')

    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(
        li.find(makeJqueryDataTestId(elementsId.surveyQuestion)).text(),
        'How do you prefer to work?',
      )
      assert.equal(
        li.find(makeJqueryDataTestId(elementsId.surveyDay)).text(),
        '11',
      )
      assert.equal(
        li.find(makeJqueryDataTestId(elementsId.surveyMonth)).text(),
        'Sep',
      )
      assert.equal(
        li.find(makeJqueryDataTestId(elementsId.surveyYear)).text(),
        '2022',
      )
    })
    cy.get('li:nth-child(2)')
      .find(makeJqueryDataTestId(elementsId.thumbsUpIcon))
      .should('not.exist')
    cy.get('li:nth-child(2)')
      .find(makeJqueryDataTestId(elementsId.thumbsDownIcon))
      .should('be.visible')
  })
})
