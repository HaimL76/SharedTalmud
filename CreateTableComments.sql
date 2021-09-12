USE [SharedTalmud]
GO

/****** Object:  Table [dbo].[Comments]    Script Date: 12/09/2021 9:11:54 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Comments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ResId] [bigint] NOT NULL,
	[Row] [int] NOT NULL,
	[Col] [int] NOT NULL,
	[Text] [nvarchar](max) NOT NULL,
	[Timestamp] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Comments] ADD  DEFAULT (getdate()) FOR [Timestamp]
GO


