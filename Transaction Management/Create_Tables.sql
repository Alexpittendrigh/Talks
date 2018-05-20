IF EXISTS(SELECT * FROM sys.tables WHERE name = 'AccountOwner')
BEGIN
	ALTER TABLE [Account] DROP CONSTRAINT [FK_Account_accountOwnerId_AccountOwner_accountOwnerId]
	DROP TABLE AccountOwner
END
GO
CREATE TABLE AccountOwner (
  accountOwnerId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
  rsaId VARCHAR(13) NOT NULL,
	firstName VARCHAR(200) NOT NULL,
	lastName VARCHAR(200) NOT NULL
)
GO
INSERT INTO AccountOwner (rsaId, firstName, lastName) VALUES 
(
  '1234567890123',
	'Alex',
	'Pittendrigh'
),
(
  '2234567890123',
	'James',
	'Barrow'
)
GO
IF EXISTS(SELECT * FROM sys.tables WHERE name = 'AccountOwner')
	DROP TABLE Account;
GO
CREATE TABLE Account (
  accountId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
	accountOwnerId INT NOT NULL CONSTRAINT FK_Account_accountOwnerId_AccountOwner_accountOwnerId FOREIGN KEY REFERENCES AccountOwner(accountOwnerId),
	balance DECIMAL NOT NULL DEFAULT 0
)
GO

ALTER TABLE Account  
   ADD CONSTRAINT CHK_Balance_Gt_0   
   CHECK (balance > 0);  
GO

INSERT INTO Account (
	accountOwnerId,
	balance
) VALUES 
(
	(SELECT TOP 1 accountOwnerId FROM AccountOwner WHERE rsaId = '1234567890123'), -- accountOwnerId
	250
),
(
	(SELECT TOP 1 accountOwnerId FROM AccountOwner WHERE rsaId = '2234567890123'), -- accountOwnerId
	250
)
GO
DROP PROCEDURE TranserFrom
GO
CREATE PROCEDURE TranserFrom 
(
 @SourceAccountId INT,
 @DestinationAccountId INT,
 @Amount DECIMAL
)
AS
BEGIN

UPDATE Account SET balance = balance + @Amount WHERE accountId = @DestinationAccountId
UPDATE Account SET balance = balance - @Amount WHERE accountId = @SourceAccountId

END
GO