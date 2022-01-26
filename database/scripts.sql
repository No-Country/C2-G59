-- Scripts to fill database --

-- BRANCHES --
INSERT INTO branches VALUES (1, 'Buenos Aires', null);
INSERT INTO branches VALUES (2, 'Cordoba', null);
INSERT INTO branches VALUES (3, 'Mendoza', null);

-- ROLES --
INSERT INTO roles VALUES ('USER_ROLE');
INSERT INTO roles VALUES ('MANAGER_ROLE');
INSERT INTO roles VALUES ('CEO_ROLE');
INSERT INTO roles VALUES ('ADMIN_ROLE');

-- SUPPLIERS --
INSERT INTO branch_suppliers VALUES (1, 'Ready Continental');
INSERT INTO branch_suppliers VALUES (2, 'Raven');
INSERT INTO branch_suppliers VALUES (3, 'Fix Guru');
INSERT INTO branch_suppliers VALUES (4, 'House Brush');
INSERT INTO branch_suppliers VALUES (5, 'Art Fade');
INSERT INTO branch_suppliers VALUES (6, 'Evergrow');
INSERT INTO branch_suppliers VALUES (7, 'Gadget Man');
INSERT INTO branch_suppliers VALUES (8, 'Zip Company');
INSERT INTO branch_suppliers VALUES (9, 'First Step');
