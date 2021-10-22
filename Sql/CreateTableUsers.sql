USE [SharedTalmud]
GO

/****** Object:  Table [dbo].[Authors]    Script Date: 21/09/2021 10:39:27 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF EXISTS(SELECT * FROM sys.indexes WHERE  [name] = 'UC_Username')
	DROP INDEX [UC_Username] ON [dbo].[Users]

IF EXISTS(SELECT * FROM sys.tables WHERE [type] = 'U' and [name] = 'Users')
	drop table [dbo].[Users]

CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PersonId] [int] NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](1024) NULL,
	[AuthorId] [int] NULL,
	[UserInfo] [nvarchar](max) NULL,
	[Timestamp] [datetime] NOT NULL
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([PersonId])
REFERENCES [dbo].[Persons] ([Id])
GO

ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([AuthorId])
REFERENCES [dbo].[Authors] ([Id])
GO

ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [Timestamp]
GO

CREATE UNIQUE NONCLUSTERED INDEX [UC_Username] ON [dbo].[Users]
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO



