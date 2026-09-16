CREATE TABLE `content_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`section` text NOT NULL,
	`slug` text NOT NULL,
	`schema_type` text NOT NULL,
	`published_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`reading_minutes` integer NOT NULL,
	`publication_json` text NOT NULL,
	`sources_json` text,
	`hero_image_json` text,
	`primary_action_json` text,
	`properties_json` text,
	`related_json` text NOT NULL,
	`translations_json` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `content_entries_section_slug_idx` ON `content_entries` (`section`,`slug`);--> statement-breakpoint
CREATE INDEX `content_entries_section_updated_idx` ON `content_entries` (`section`,`updated_at`);--> statement-breakpoint
CREATE TABLE `content_tags` (
	`entry_id` text NOT NULL,
	`locale` text NOT NULL,
	`keyword` text NOT NULL,
	PRIMARY KEY(`entry_id`, `locale`, `keyword`),
	FOREIGN KEY (`entry_id`) REFERENCES `content_entries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `content_tags_keyword_idx` ON `content_tags` (`keyword`);