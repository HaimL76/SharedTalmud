-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE or alter PROCEDURE InsertComments @Count int, @AuthorId int, @ResourceId int, @Width int, @Height int
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @counter int;
	declare @col int;
	declare @row int;

	set @counter = @count;

	while @counter > 0
	begin
		set @counter = @counter - 1;

		set @col = floor(rand() * @Width);
		set @row = floor(rand() * @Height);

    -- Insert statements for procedure here
		insert into [Comments] (Author, [Resource], [Col], [Row], [Text], [Headline]) values (@AuthorId, @ResourceId, @col, @row, 'Text', 'Headline')
	end
END
GO
