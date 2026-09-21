CREATE TABLE `content_reports` (
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
	`resolved_at` integer,
	`requester_hash` text NOT NULL,
	CONSTRAINT "content_reports_target_kind_check" CHECK("content_reports"."target_kind" in ('content', 'item', 'map', 'tool')),
	CONSTRAINT "content_reports_locale_check" CHECK("content_reports"."locale" in ('zh-hant', 'en', 'ko')),
	CONSTRAINT "content_reports_service_check" CHECK("content_reports"."service" in ('kr-tw-live', 'global', 'unknown', 'other')),
	CONSTRAINT "content_reports_category_check" CHECK("content_reports"."category" in ('outdated', 'incorrect', 'translation', 'missing', 'broken-link', 'other')),
	CONSTRAINT "content_reports_status_check" CHECK("content_reports"."status" in ('new', 'triaged', 'accepted', 'rejected', 'resolved')),
	CONSTRAINT "content_reports_lengths_check" CHECK(
        length("content_reports"."id") between 1 and 64
        and length("content_reports"."target_key") between 1 and 300
        and ("content_reports"."version" is null or length("content_reports"."version") between 1 and 80)
        and length("content_reports"."message") between 10 and 2000
        and ("content_reports"."evidence_url" is null or length("content_reports"."evidence_url") <= 2048)
        and ("content_reports"."contact" is null or length("content_reports"."contact") <= 254)
        and length("content_reports"."requester_hash") = 64
      ),
	CONSTRAINT "content_reports_resolution_check" CHECK("content_reports"."resolved_at" is null or "content_reports"."status" <> 'new')
);
--> statement-breakpoint
CREATE INDEX `content_reports_requester_window_idx` ON `content_reports` (`requester_hash`,`created_at`);--> statement-breakpoint
CREATE INDEX `content_reports_status_created_idx` ON `content_reports` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `content_reports_target_created_idx` ON `content_reports` (`target_kind`,`target_key`,`created_at`);