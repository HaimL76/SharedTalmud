USE [SharedTalmud]
GO

/****** Object:  Table [dbo].[Categories]    Script Date: 02/10/2021 11:37:34 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AuthorKinds](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](1024) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AuthorKinds] ADD  DEFAULT (getdate()) FOR [Timestamp]
GO


