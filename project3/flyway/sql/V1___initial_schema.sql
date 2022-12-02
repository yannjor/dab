CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    text TEXT,
    user_id TEXT,
    posted TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE replies (
    id SERIAL PRIMARY KEY,
    text TEXT,
    user_id TEXT,
    message_id INT,
    posted TIMESTAMPTZ DEFAULT Now(),
    CONSTRAINT fk_exercise FOREIGN KEY(message_id) REFERENCES messages(id)
);

INSERT INTO messages(text, user_id)
VALUES
('Hello World!', 'admin'),
('Hi Mom', 'admin'),
('This is a test message', 'admin');

INSERT INTO replies(text, user_id, message_id)
VALUES
('Good one!', 'admin', 1),
('Boring...', 'admin', 1);
