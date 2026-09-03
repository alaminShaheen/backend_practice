DROP TABLE IF EXISTS basics.students;

CREATE TABLE basics.students (
    -- Create an id that auto increments
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER CHECK ( age >= 18 ),
    -- default value as when the entry is created
    created_at TIMESTAMP DEFAULT now()
);

INSERT INTO basics.students (name, email, age)
VALUES
    ('Sakib', 'sakib@gmail.com', 30),
    ('John', 'john@gmail.com', 56);

SELECT * FROM basics.students;