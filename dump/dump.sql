CREATE TABLE IF NOT EXISTS StudentScore (
  studentId int primary key AUTO_INCREMENT,
  student varchar(80),
  score decimal
);

INSERT INTO StudentScore (student,score) values ('Richard',10);
INSERT INTO StudentScore (student,score) values ('Danny',10);
INSERT INTO StudentScore (student,score) values ('Carol',10);
INSERT INTO StudentScore (student,score) values ('Jhon',10);
INSERT INTO StudentScore (student,score) values ('Peter',10);

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';

flush privileges;