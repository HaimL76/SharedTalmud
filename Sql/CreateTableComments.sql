USE [SharedTalmud]
GO

/****** Object:  Table [dbo].[Comments]    Script Date: 21/09/2021 10:30:34 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF EXISTS(SELECT * FROM sys.tables WHERE [type] = 'U' and [name] = 'Comments')
	drop table [dbo].[Comments]

CREATE TABLE [dbo].[Comments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Author] [int] NOT NULL,
	[Resource] [int] NOT NULL,
	[Row] [int] NOT NULL,
	[Col] [int] NOT NULL,
	[Text] [nvarchar](max) NOT NULL,
	[Headline] [nvarchar](1024) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Comments] ADD  DEFAULT (getdate()) FOR [Timestamp]
GO

ALTER TABLE [dbo].[Comments]  WITH CHECK ADD FOREIGN KEY([Author])
REFERENCES [dbo].[Authors] ([Id])
GO

ALTER TABLE [dbo].[Comments]  WITH CHECK ADD FOREIGN KEY([Resource])
REFERENCES [dbo].[Resources] ([Id])
GO
