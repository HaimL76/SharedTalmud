USE [SharedTalmud]
GO

/****** Object:  StoredProcedure [dbo].[InsertComments]    Script Date: 29/09/2021 1:07:27 am ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER   PROCEDURE [dbo].[InsertComments] @Count int, @AuthorId int, @ResourceId int, @Width int, @Height int, @Distinct bit
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @minVal int;

	set @minVal = @Width;
	
	if @Height < @minVal
	begin
		set @minVal = @Height;
	end

	if @Distinct = 1 and @Count > @minVal
	begin
		return;
	end

	declare @counter int;
	declare @col int;
	declare @row int;

	declare @authorsLength int;

	declare @index int;

	declare @author int;

	declare @myTableVariable table (Id int identity(1, 1), AuthorId int)

	insert into @myTableVariable(AuthorId)
	select [Authors].Id from [Authors]

	select @authorsLength = count(*) from @myTableVariable

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
			set @author = @counter % @authorsLength + 1;
		end

		--begin
		--	select @AuthorId = [@myTableVariable].AuthorId from @myTableVariable where [@myTableVariable].Id = @AuthorId;
		--end

    -- Insert statements for procedure here
		insert into [Comments] (Author, [Resource], [Col], [Row], [Text], [Headline]) values (@author, @ResourceId, @col, @row, 'Text', 'Headline')
	end
END
GO


