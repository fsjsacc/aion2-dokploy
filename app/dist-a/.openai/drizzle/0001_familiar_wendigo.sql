CREATE TABLE `analytics_daily` (
	`day` text NOT NULL,
	`event_name` text NOT NULL,
	`locale` text NOT NULL,
	`service` text NOT NULL,
	`surface` text NOT NULL,
	`target_kind` text NOT NULL,
	`target_key` text NOT NULL,
	`count` integer DEFAULT 1 NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`day`, `event_name`, `locale`, `service`, `surface`, `target_kind`, `target_key`),
	CONSTRAINT "analytics_daily_day_check" CHECK(
        length("analytics_daily"."day") = 10
        and "analytics_daily"."day" glob '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
      ),
	CONSTRAINT "analytics_daily_event_name_check" CHECK(
        length("analytics_daily"."event_name") between 1 and 64
        and "analytics_daily"."event_name" not glob '*[^a-z0-9_]*'
      ),
	CONSTRAINT "analytics_daily_locale_check" CHECK("analytics_daily"."locale" in ('zh-hant', 'en', 'ko', 'unknown')),
	CONSTRAINT "analytics_daily_service_check" CHECK("analytics_daily"."service" in ('kr-tw-live', 'global', 'unknown', 'other')),
	CONSTRAINT "analytics_daily_surface_check" CHECK("analytics_daily"."surface" in ('unknown', 'home', 'home-hero', 'home-core-entry', 'home-directory', 'faction-gate', 'content-hub', 'map-seo', 'interactive-map', 'daily-checklist', 'class-finder', 'material-calculator', 'correction-report')),
	CONSTRAINT "analytics_daily_target_kind_check" CHECK("analytics_daily"."target_kind" in ('none', 'content', 'item', 'map', 'tool')),
	CONSTRAINT "analytics_daily_target_key_check" CHECK(
        length("analytics_daily"."target_key") between 1 and 160
        and "analytics_daily"."target_key" not glob '*[^a-z0-9._:/-]*'
        and (
          ("analytics_daily"."target_kind" = 'none' and "analytics_daily"."target_key" = 'none')
          or ("analytics_daily"."target_kind" <> 'none' and "analytics_daily"."target_key" <> 'none')
        )
      ),
	CONSTRAINT "analytics_daily_counter_check" CHECK("analytics_daily"."count" >= 1 and "analytics_daily"."updated_at" >= 1)
);
--> statement-breakpoint
CREATE INDEX `analytics_daily_event_day_idx` ON `analytics_daily` (`event_name`,`day`);--> statement-breakpoint
CREATE INDEX `analytics_daily_surface_day_idx` ON `analytics_daily` (`surface`,`day`);--> statement-breakpoint
CREATE INDEX `analytics_daily_target_day_idx` ON `analytics_daily` (`target_kind`,`target_key`,`day`);--> statement-breakpoint
CREATE TABLE `analytics_ingest_windows` (
	`bucket_hash` text PRIMARY KEY NOT NULL,
	`window_start` integer NOT NULL,
	`request_count` integer DEFAULT 1 NOT NULL,
	`expires_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT "analytics_ingest_windows_hash_check" CHECK(
        length("analytics_ingest_windows"."bucket_hash") = 64
        and "analytics_ingest_windows"."bucket_hash" not glob '*[^0-9a-f]*'
      ),
	CONSTRAINT "analytics_ingest_windows_counter_check" CHECK(
        "analytics_ingest_windows"."window_start" >= 1
        and "analytics_ingest_windows"."request_count" >= 1
        and "analytics_ingest_windows"."expires_at" > "analytics_ingest_windows"."window_start"
        and "analytics_ingest_windows"."updated_at" >= "analytics_ingest_windows"."window_start"
      )
);
--> statement-breakpoint
CREATE INDEX `analytics_ingest_windows_expires_idx` ON `analytics_ingest_windows` (`expires_at`);