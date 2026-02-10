CREATE TABLE users (
    username       TEXT NOT NULL,
    password    TEXT UNIQUE NOT NULL
);

CREATE TABLE comments (
    id  SERIAL PRIMARY KEY,
    username    TEXT NOT NULL,
    comment     TEXT NOT NULL
);

CREATE TABLE corn (
    id  SERIAL PRIMARY KEY,
    type    TEXT NOT NULL
);

CREATE TABLE flag (
    flag TEXT NOT NULL
);

INSERT INTO users (username, password) VALUES
('admin', 'password'),
('jabooboo',   'jabootyplz');

INSERT INTO comments (username, comment) VALUES
('squatCobbler44',   'HHHHHHHHHHHHHHHHHHHHHHHHHHH'),
('Bencil-Sharpino',   'This is utterly ridiculous on so many levels. You expect me to believe that a cob of this size is obtainable without implants or medication? The damage we are doing to men in the cornosphere with these desperate displays of shuckery are absolutely unjust. My lawyers will be in touch.'),
('papakernal',   'can i dm u'),
('bishucksualgurl98',   'oh GOD thats a big harvest. certainly no famine this year xoxo');

INSERT INTO corn (type) VALUES
('Sweet'),
('Dent'),
('Flint'),
('Pop'),
('Flour'),
('Waxy'),
('Field'),
('Indian'),
('Blue'),
('White'),
('Yellow'),
('Purple'),
('Baby');

INSERT INTO flag (flag) VALUES
('🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩');