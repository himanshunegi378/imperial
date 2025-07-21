CREATE TABLE `components` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chatId` text,
	`userId` text NOT NULL,
	`name` text NOT NULL,
	`html` text NOT NULL,
	`hideFromLibrary` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `chatHistory` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`chatId` text NOT NULL,
	`message` text NOT NULL
);
