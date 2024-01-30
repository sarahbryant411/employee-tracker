USE employee_tracker_db;

INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id) VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Deb', "O'Nair", 1, NULL),
    ('JeanAnn', 'Tonique', 2, 1),
    ('Tara', 'Belle', 3, NULL),
    ('Anna', 'Stikk', 4, 3),
    ('Kate', 'Forna', 5, NULL),
    ('Claire', 'Voyant', 6, 5),
    ('Vinn', 'Dictive', 7, 5),
    ('Daya', 'Ballick', 5, 7);

