USE [SharedTalmud]

/****** Object:  Index [UC_Username]    Script Date: 15/10/2021 12:23:05 am ******/
DROP INDEX [UC_Username] ON [dbo].[Users]

/****** Object:  Index [UC_Username]    Script Date: 15/10/2021 12:20:38 am ******/
CREATE UNIQUE NONCLUSTERED INDEX [UC_Username] ON [dbo].[Users]
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO


