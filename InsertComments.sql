USE [SharedTalmud]
GO

/****** Object:  StoredProcedure [dbo].[InsertComments]    Script Date: 02/10/2021 11:54:33 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE [dbo].[InsertComments] @Count int, @AuthorId int, @ResourceId int, @Width int, @Height int
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @counter int;
	declare @col int;
	declare @row int;

	declare @authorsLength int;

	declare @index int;

	declare @author int;

	declare @minAuthorId int;

	declare @myTableVariable table (Id int identity(1, 1), AuthorId int)

	insert into @myTableVariable(AuthorId)
	select [Authors].Id from [Authors]

	select @authorsLength = count(*) from [Authors]

	select @minAuthorId = min(Id) from [Authors]

	print convert([nvarchar](50), @authorsLength)

	set @counter = @count;

	while @counter > 0
	begin
		print convert([nvarchar](50), @counter)

		set @counter = @counter - 1;

		set @col = floor(rand() * @Width);
		set @row = floor(rand() * @Height);

		set @index = floor(rand() * @authorsLength) + 1;

		print 'index = ' + convert([nvarchar](50), @index)

		set @author = @AuthorId;

		if @author < 1
		begin
			set @author = @counter % @authorsLength + @minAuthorId;
		end

		print 'author = ' + convert([nvarchar](50), @author)

		--begin
		--	select @AuthorId = [@myTableVariable].AuthorId from @myTableVariable where [@myTableVariable].Id = @AuthorId;
		--end

    -- Insert statements for procedure here
		insert into [Comments] (Author, [Resource], [Col], [Row], [Text], [Headline]) values (@author, @ResourceId, @col, @row, 'Text', 'Headline')
	end
END
GO


