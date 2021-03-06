USE [SharedTalmud]
GO

/****** Object:  Table [dbo].[Authors]    Script Date: 21/09/2021 10:39:27 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF EXISTS(SELECT * FROM sys.tables WHERE [type] = 'U' and [name] = 'Comments')
	drop table [dbo].[Comments]

IF EXISTS(SELECT * FROM sys.tables WHERE [type] = 'U' and [name] = 'Users')
	update [dbo].[Users] set [AuthorId] = null

IF EXISTS(SELECT * FROM sys.tables WHERE [type] = 'U' and [name] = 'Authors')
	drop table [dbo].[Authors]

CREATE TABLE [dbo].[Authors](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[First] [nvarchar](50) NOT NULL,
	[Last] [nvarchar](50) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
	[AuthorKind] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Authors]  WITH CHECK ADD FOREIGN KEY([AuthorKind])
REFERENCES [dbo].[AuthorKinds] ([Id])
GO

ALTER TABLE [dbo].[Authors] ADD  DEFAULT (getdate()) FOR [Timestamp]
GO


