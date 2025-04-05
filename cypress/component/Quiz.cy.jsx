// Import component you are testing
import Quiz from '../../client/src/components/Quiz';

const mockQuestions = [
    {
        question: "What does 2 + 2 equal?",
        answers: [
            { text: "6", isCorrect: false },
            { text: "4", isCorrect: true },
            { text: "9", isCorrect: false },
            { text: "12", isCorrect: false }
        ]
    }
];

describe('<Quiz/>', () => {
    beforeEach(() => {
        // Intercept the API call and return mock data
        cy.intercept('GET', '/api/questions/random', {
            statusCode: 200,
            body: mockQuestions,
        }).as('getQuestions');
    });

    it('should render Quiz component', () => {
        cy.mount(<Quiz />);
    });

    it('should have Start Quiz button', () => {
        cy.mount(<Quiz />);
        cy.get('button').should('have.text', 'Start Quiz');
    });

    it('should display the question and answers after clicking Start Quiz button', () => {
        cy.mount(<Quiz />);

        // Click the Start Quiz button
        cy.get('button').contains('Start Quiz').click();

        // Wait for the mocked API call to complete
        cy.wait('@getQuestions');

        // Verify that the question text is displayed
        cy.get('h2').should('contain.text', mockQuestions[0].question);

        // Verify that all answers are displayed
        mockQuestions[0].answers.forEach((answer) => {
            cy.get('.alert.alert-secondary').should('contain.text', answer.text);
        });
    });
});

