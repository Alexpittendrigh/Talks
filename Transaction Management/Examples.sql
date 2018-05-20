/* Example 1 - Atomicity */

-- EXEC TranserFrom @SourceAccountId = 1,  @DestinationAccountId = 2, @Amount = 500
-- SELECT * FROM Account

/* Example 2 - Better Atomicity */

-- EXEC TranserFrom @SourceAccountId = 1,  @DestinationAccountId = 2, @Amount = 500
-- SELECT * FROM Account
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
	BEGIN TRANSACTION Transer
	BEGIN TRY
		UPDATE Account SET balance = balance + @Amount WHERE accountId = @DestinationAccountId
		UPDATE Account SET balance = balance - @Amount WHERE accountId = @SourceAccountId
	END TRY
	BEGIN CATCH
		SELECT 
		ERROR_NUMBER() AS ErrorNumber
		,ERROR_SEVERITY() AS ErrorSeverity
		,ERROR_STATE() AS ErrorState
		,ERROR_PROCEDURE() AS ErrorProcedure
		,ERROR_LINE() AS ErrorLine
		,ERROR_MESSAGE() AS ErrorMessage;

		IF @@TRANCOUNT > 0 
		BEGIN
			ROLLBACK TRANSACTION Transer
		END
	END CATCH

	IF @@TRANCOUNT > 0
	BEGIN
		COMMIT TRANSACTION Transer
	END
	ELSE IF @@TRANCOUNT > 0
	BEGIN
		ROLLBACK TRANSACTION Transer
	END
END
GO