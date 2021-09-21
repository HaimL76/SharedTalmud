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

CREATE TABLE [dbo].[Resources](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Book] [int] NOT NULL,
	[Page] [int] NOT NULL,
	[Path] [nvarchar](1024) NOT NULL,	
	[Timestamp] [datetime] NOT NULL
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Resources] ADD  DEFAULT (getdate()) FOR [Timestamp]
GO