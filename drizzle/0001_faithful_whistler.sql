CREATE TABLE `chatHistory` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`chatId` text NOT NULL,
	`message` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_components` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`html` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_components`("id", "name", "html") SELECT "id", "name", "html" FROM `components`;--> statement-breakpoint
DROP TABLE `components`;--> statement-breakpoint
ALTER TABLE `__new_components` RENAME TO `components`;--> statement-breakpoint
PRAGMA foreign_keys=ON;