PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_content_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`target_kind` text NOT NULL,
	`target_key` text NOT NULL,
	`locale` text NOT NULL,
	`service` text NOT NULL,
	`version` text,
	`category` text NOT NULL,
	`message` text NOT NULL,
	`evidence_url` text,
	`contact` text,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`resolved_at` integer,
	`resolution_note` text,
	`resolved_by` text,
	`requester_hash` text NOT NULL,
	CONSTRAINT "content_reports_target_kind_check" CHECK("__new_content_reports"."target_kind" in ('content', 'item', 'map', 'tool')),
	CONSTRAINT "content_reports_locale_check" CHECK("__new_content_reports"."locale" in ('zh-hant', 'en', 'ko')),
	CONSTRAINT "content_reports_service_check" CHECK("__new_content_reports"."service" in ('kr-tw-live', 'global', 'unknown', 'other')),
	CONSTRAINT "content_reports_category_check" CHECK("__new_content_reports"."category" in ('outdated', 'incorrect', 'translation', 'missing', 'broken-link', 'other')),
	CONSTRAINT "content_reports_status_check" CHECK("__new_content_reports"."status" in ('new', 'triaged', 'accepted', 'rejected', 'resolved')),
	CONSTRAINT "content_reports_lengths_check" CHECK(
        length("__new_content_reports"."id") between 1 and 64
        and length("__new_content_reports"."target_key") between 1 and 300
        and ("__new_content_reports"."version" is null or length("__new_content_reports"."version") between 1 and 80)
        and length("__new_content_reports"."message") between 10 and 2000
        and ("__new_content_reports"."evidence_url" is null or length("__new_content_reports"."evidence_url") <= 2048)
        and ("__new_content_reports"."contact" is null or length("__new_content_reports"."contact") <= 254)
        and ("__new_content_reports"."resolution_note" is null or length("__new_content_reports"."resolution_note") <= 1000)
        and ("__new_content_reports"."resolved_by" is null or length("__new_content_reports"."resolved_by") <= 254)
        and length("__new_content_reports"."requester_hash") = 64
      ),
	CONSTRAINT "content_reports_resolution_check" CHECK("__new_content_reports"."resolved_at" is null or "__new_content_reports"."status" <> 'new')
);
--> statement-breakpoint
INSERT INTO `__new_content_reports`("id", "target_kind", "target_key", "locale", "service", "version", "category", "message", "evidence_url", "contact", "status", "created_at", "updated_at", "resolved_at", "resolution_note", "resolved_by", "requester_hash") SELECT "id", "target_kind", "target_key", "locale", "service", "version", "category", "message", "evidence_url", "contact", "status", "created_at", NULL, "resolved_at", NULL, NULL, "requester_hash" FROM `content_reports`;--> statement-breakpoint
DROP TABLE `content_reports`;--> statement-breakpoint
ALTER TABLE `__new_content_reports` RENAME TO `content_reports`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `content_reports_requester_window_idx` ON `content_reports` (`requester_hash`,`created_at`);--> statement-breakpoint
CREATE INDEX `content_reports_status_created_idx` ON `content_reports` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `content_reports_target_created_idx` ON `content_reports` (`target_kind`,`target_key`,`created_at`);
