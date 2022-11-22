CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT
);

CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    user_id TEXT,
    exercise_id INT,
    completed BOOLEAN,
    CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercises(id)
);

INSERT INTO exercises(name, description)
VALUES
('Sum of three values', 'Write a function int sum(int first, int second, int third) that returns the sum of the given integers. As an example, the function call sum(1, 2, 3) should return the value 6.'),
('Sum with formula', 'Write a function String sumWithFormula(int first, int second) that returns the written out sum of the given integers and the sum. As an example, the function call sumWithFormula(1, 2) should return the string 1+2=3 and the function call sumWithFormula(1, 1) should return the string 1+1=2. Note! Do not add spaces to the returned string.'),
('Budget check', 'Write a function String budgetCheck(double budget, double currentSpending) that returns information on whether a given budget is in order in light of given spending. If the value of currentSpending is larger than the value of budget, the function should return "Budget: Overspending". Otherwise, the function should return "Budget: OK".'),
('Mystery function', 'Write a function String mystery(int number) that returns a string based on the number. If the number is divisible by 5, the function should return the string "mys". If the number is divisible by 7, the function should return the string "tery". If the number is divisible by both 5 and 7, the function should return the string "mystery". Otherwise, the function should return a string representation of the given number, e.g. if the number is 1, the function should return "1".'),
('Sum of negative numbers', 'Write a function int sumOfNegatives(List<int> numbers) that returns the sum of the negative numbers in the given list. For example, if the numbers list would contain the numbers -1, 2, -4, the function should return the value -5.'),
('Average of positives', 'Write a function double averageOfPositives(List<int> numbers) that returns the average value of the positive numbers on the list. If there are no positive values, the function should return the value -1.')
