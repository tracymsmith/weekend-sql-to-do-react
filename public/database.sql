CREATE TABLE tasks (
id SERIAL PRIMARY KEY, 
description TEXT NOT NULL,
is_complete BOOLEAN DEFAULT FALSE
);
-- INSERT INTO tasks (description, is_complete) VALUES ('laundry', false);
-- INSERT INTO tasks (description, is_complete) VALUES ('dishes', false);
-- INSERT INTO tasks (description, is_complete) VALUES ('ironing', false);
-- INSERT INTO tasks (description, is_complete) VALUES ('wash car', false);
-- INSERT INTO tasks (description, is_complete) VALUES ('gardening', false); changed to cleaner code as is-complete defaults to false
INSERT INTO tasks (description) VALUES ('Laundry');
INSERT INTO tasks (description) VALUES ('Ironing');
INSERT INTO tasks (description) VALUES ('Sewing');
INSERT INTO tasks (description) VALUES ('Trash');
INSERT INTO tasks (description) VALUES ('Dishes');


