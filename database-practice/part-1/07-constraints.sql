-- NOT NULL, UNIQUE, DEFAULT, CHECK

DROP TABLE IF EXISTS basics.accounts;

CREATE TABLE basics.accounts (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    age INTEGER CHECK ( age >= 18 ),
    created_at TIMESTAMP DEFAULT now()
);

INSERT INTO basics.accounts (full_name, email, age)
VALUES ('sakib', 'sakib@gmail.com', 30);

SELECT * FROM basics.accounts;