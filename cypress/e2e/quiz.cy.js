// User using the application from beginning to end

describe('User Journey', () => {
    beforeEach(() => {
        // Visit the application
        cy.visit('http://localhost:3001');
    });

    // Verify the "Start Quiz" button
    it('User arrives to home page with "Start Quiz" button', () => {
        cy.get('button').should('have.text', 'Start Quiz');
    });

    // Click the "Start Quiz" button
    it('User can hit "Start Quiz" button and see the first question', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('h2').should('not.be.empty');
    });

    // Verify 4 answer choices are displayed
    it('User should see the question with 4 choices', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('h2').should('not.be.empty');
        cy.get('.alert.alert-secondary').should('have.length', 4);
    });

    // Click the first answer
    // Verify the next question is displayed
    it('User can click an answer and proceed to the next question', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('.alert.alert-secondary').first().prev('button').click();
        cy.get('h2').should('not.be.empty');
    });

    it('User can complete the quiz and see the score', () => {
        cy.get('button').contains('Start Quiz').click();

    // Answer 10 questions
    for (let i = 0; i < 10; i++) {
        cy.get('h2').should('not.be.empty');
        cy.get('.alert.alert-secondary').first().prev('button').click();
    }
    // Verify the score is displayed
        cy.get('h2').should('contain.text', 'Quiz Completed');
        cy.get('.alert.alert-success').should('contain.text', 'Your score:');
    });
});