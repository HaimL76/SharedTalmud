USE [SharedTalmud]
GO

/****** Object:  Table [dbo].[Authors]    Script Date: 21/09/2021 10:32:07 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF EXISTS(SELECT * FROM sys.tables WHERE [type] = 'U' and [name] = 'Comments')
	drop table [dbo].[Comments]

IF EXISTS(SELECT * FROM sys.tables WHERE [type] = 'U' and [name] = 'Resources')
	drop table [dbo].[Resources]

IF EXISTS(SELECT * FROM sys.tables WHERE [type] = 'U' and [name] = 'Books')
	drop table [dbo].[Books]

CREATE TABLE [dbo].[Books](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Category] [int] NOT NULL,
	[Name] [nvarchar](1024) NOT NULL,	
	[Timestamp] [datetime] NOT NULL
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Books] ADD  DEFAULT (getdate()) FOR [Timestamp]
GO

ALTER TABLE [dbo].[Books]  WITH CHECK ADD FOREIGN KEY([Category])
REFERENCES [dbo].[Categories] ([Id])
GO