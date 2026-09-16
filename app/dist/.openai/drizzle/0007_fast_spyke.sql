PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_analytics_daily` (
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
        length("__new_analytics_daily"."day") = 10
        and "__new_analytics_daily"."day" glob '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'
      ),
	CONSTRAINT "analytics_daily_event_name_check" CHECK(
        length("__new_analytics_daily"."event_name") between 1 and 64
        and "__new_analytics_daily"."event_name" not glob '*[^a-z0-9_]*'
      ),
	CONSTRAINT "analytics_daily_locale_check" CHECK("__new_analytics_daily"."locale" in ('zh-hans', 'en', 'fr', 'de', 'es', 'ja', 'pt-br', 'ru', 'ko', 'zh-hant', 'unknown')),
	CONSTRAINT "analytics_daily_service_check" CHECK("__new_analytics_daily"."service" in ('kr-tw-live', 'global', 'unknown', 'other')),
	CONSTRAINT "analytics_daily_surface_check" CHECK("__new_analytics_daily"."surface" in ('unknown', 'home', 'home-hero', 'home-core-entry', 'home-directory', 'faction-gate', 'content-hub', 'map-seo', 'interactive-map', 'daily-checklist', 'class-finder', 'material-calculator', 'correction-report')),
	CONSTRAINT "analytics_daily_target_kind_check" CHECK("__new_analytics_daily"."target_kind" in ('none', 'content', 'item', 'map', 'tool')),
	CONSTRAINT "analytics_daily_target_key_check" CHECK(
        length("__new_analytics_daily"."target_key") between 1 and 160
        and "__new_analytics_daily"."target_key" not glob '*[^a-z0-9._:/-]*'
        and (
          ("__new_analytics_daily"."target_kind" = 'none' and "__new_analytics_daily"."target_key" = 'none')
          or ("__new_analytics_daily"."target_kind" <> 'none' and "__new_analytics_daily"."target_key" <> 'none')
        )
      ),
	CONSTRAINT "analytics_daily_counter_check" CHECK("__new_analytics_daily"."count" >= 1 and "__new_analytics_daily"."updated_at" >= 1)
);
--> statement-breakpoint
INSERT INTO `__new_analytics_daily`("day", "event_name", "locale", "service", "surface", "target_kind", "target_key", "count", "updated_at") SELECT "day", "event_name", "locale", "service", "surface", "target_kind", "target_key", "count", "updated_at" FROM `analytics_daily`;--> statement-breakpoint
DROP TABLE `analytics_daily`;--> statement-breakpoint
ALTER TABLE `__new_analytics_daily` RENAME TO `analytics_daily`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `analytics_daily_event_day_idx` ON `analytics_daily` (`event_name`,`day`);--> statement-breakpoint
CREATE INDEX `analytics_daily_surface_day_idx` ON `analytics_daily` (`surface`,`day`);--> statement-breakpoint
CREATE INDEX `analytics_daily_target_day_idx` ON `analytics_daily` (`target_kind`,`target_key`,`day`);--> statement-breakpoint
CREATE TABLE `__new_analytics_journey_events` (
	`id` text PRIMARY KEY NOT NULL,
	`consent_version` integer NOT NULL,
	`visitor_hash` text NOT NULL,
	`session_hash` text NOT NULL,
	`network_hash` text NOT NULL,
	`ip_ciphertext` text,
	`ip_iv` text,
	`ip_key_version` integer,
	`country` text NOT NULL,
	`device_class` text NOT NULL,
	`browser_family` text NOT NULL,
	`os_family` text NOT NULL,
	`path` text NOT NULL,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`event_name` text NOT NULL,
	`locale` text NOT NULL,
	`service` text NOT NULL,
	`surface` text NOT NULL,
	`target_kind` text NOT NULL,
	`target_key` text NOT NULL,
	`occurred_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	CONSTRAINT "analytics_journey_events_identity_check" CHECK(
        length("__new_analytics_journey_events"."id") between 1 and 64
        and "__new_analytics_journey_events"."consent_version" in (1, 2)
        and length("__new_analytics_journey_events"."visitor_hash") = 64
        and "__new_analytics_journey_events"."visitor_hash" not glob '*[^0-9a-f]*'
        and length("__new_analytics_journey_events"."session_hash") = 64
        and "__new_analytics_journey_events"."session_hash" not glob '*[^0-9a-f]*'
        and length("__new_analytics_journey_events"."network_hash") = 64
        and "__new_analytics_journey_events"."network_hash" not glob '*[^0-9a-f]*'
      ),
	CONSTRAINT "analytics_journey_events_encrypted_ip_check" CHECK(
        (
          "__new_analytics_journey_events"."consent_version" = 1
          and "__new_analytics_journey_events"."ip_ciphertext" is null
          and "__new_analytics_journey_events"."ip_iv" is null
          and "__new_analytics_journey_events"."ip_key_version" is null
        ) or (
          "__new_analytics_journey_events"."consent_version" = 2
          and length("__new_analytics_journey_events"."ip_ciphertext") between 24 and 84
          and "__new_analytics_journey_events"."ip_ciphertext" not glob '*[^A-Za-z0-9_-]*'
          and length("__new_analytics_journey_events"."ip_iv") = 16
          and "__new_analytics_journey_events"."ip_iv" not glob '*[^A-Za-z0-9_-]*'
          and "__new_analytics_journey_events"."ip_key_version" = 1
        )
      ),
	CONSTRAINT "analytics_journey_events_country_check" CHECK(
        "__new_analytics_journey_events"."country" = 'unknown'
        or (
          length("__new_analytics_journey_events"."country") = 2
          and "__new_analytics_journey_events"."country" not glob '*[^A-Z]*'
        )
      ),
	CONSTRAINT "analytics_journey_events_device_check" CHECK("__new_analytics_journey_events"."device_class" in ('desktop', 'mobile', 'tablet', 'other', 'unknown')),
	CONSTRAINT "analytics_journey_events_browser_check" CHECK("__new_analytics_journey_events"."browser_family" in ('chrome', 'edge', 'firefox', 'safari', 'samsung', 'other', 'unknown')),
	CONSTRAINT "analytics_journey_events_os_check" CHECK("__new_analytics_journey_events"."os_family" in ('windows', 'macos', 'ios', 'android', 'linux', 'chromeos', 'other', 'unknown')),
	CONSTRAINT "analytics_journey_events_path_check" CHECK(
        length("__new_analytics_journey_events"."path") between 1 and 300
        and substr("__new_analytics_journey_events"."path", 1, 1) = '/'
        and "__new_analytics_journey_events"."path" not glob '*[?#%\]*'
        and "__new_analytics_journey_events"."path" not glob '*[^/a-z0-9._:-]*'
      ),
	CONSTRAINT "analytics_journey_events_marketing_check" CHECK(
        ("__new_analytics_journey_events"."utm_source" is null or (
          length("__new_analytics_journey_events"."utm_source") between 1 and 80
          and "__new_analytics_journey_events"."utm_source" not glob '*[^a-z0-9._-]*'
        ))
        and ("__new_analytics_journey_events"."utm_medium" is null or (
          length("__new_analytics_journey_events"."utm_medium") between 1 and 80
          and "__new_analytics_journey_events"."utm_medium" not glob '*[^a-z0-9._-]*'
        ))
        and ("__new_analytics_journey_events"."utm_campaign" is null or (
          length("__new_analytics_journey_events"."utm_campaign") between 1 and 120
          and "__new_analytics_journey_events"."utm_campaign" not glob '*[^a-z0-9._-]*'
        ))
      ),
	CONSTRAINT "analytics_journey_events_event_check" CHECK(
        length("__new_analytics_journey_events"."event_name") between 1 and 64
        and "__new_analytics_journey_events"."event_name" not glob '*[^a-z0-9_]*'
      ),
	CONSTRAINT "analytics_journey_events_locale_check" CHECK("__new_analytics_journey_events"."locale" in ('zh-hans', 'en', 'fr', 'de', 'es', 'ja', 'pt-br', 'ru', 'ko', 'zh-hant', 'unknown')),
	CONSTRAINT "analytics_journey_events_service_check" CHECK("__new_analytics_journey_events"."service" in ('kr-tw-live', 'global', 'unknown', 'other')),
	CONSTRAINT "analytics_journey_events_surface_check" CHECK("__new_analytics_journey_events"."surface" in ('unknown', 'home', 'home-hero', 'home-core-entry', 'home-directory', 'faction-gate', 'content-hub', 'map-seo', 'interactive-map', 'daily-checklist', 'class-finder', 'material-calculator', 'correction-report')),
	CONSTRAINT "analytics_journey_events_target_check" CHECK(
        "__new_analytics_journey_events"."target_kind" in ('none', 'content', 'item', 'map', 'tool')
        and length("__new_analytics_journey_events"."target_key") between 1 and 160
        and "__new_analytics_journey_events"."target_key" not glob '*[^a-z0-9._:/-]*'
        and (
          ("__new_analytics_journey_events"."target_kind" = 'none' and "__new_analytics_journey_events"."target_key" = 'none')
          or ("__new_analytics_journey_events"."target_kind" <> 'none' and "__new_analytics_journey_events"."target_key" <> 'none')
        )
      ),
	CONSTRAINT "analytics_journey_events_expiry_check" CHECK(
        "__new_analytics_journey_events"."occurred_at" >= 1
        and "__new_analytics_journey_events"."expires_at" = "__new_analytics_journey_events"."occurred_at" + 2592000000
      )
);
--> statement-breakpoint
INSERT INTO `__new_analytics_journey_events`("id", "consent_version", "visitor_hash", "session_hash", "network_hash", "ip_ciphertext", "ip_iv", "ip_key_version", "country", "device_class", "browser_family", "os_family", "path", "utm_source", "utm_medium", "utm_campaign", "event_name", "locale", "service", "surface", "target_kind", "target_key", "occurred_at", "expires_at") SELECT "id", "consent_version", "visitor_hash", "session_hash", "network_hash", "ip_ciphertext", "ip_iv", "ip_key_version", "country", "device_class", "browser_family", "os_family", "path", "utm_source", "utm_medium", "utm_campaign", "event_name", "locale", "service", "surface", "target_kind", "target_key", "occurred_at", "expires_at" FROM `analytics_journey_events`;--> statement-breakpoint
DROP TABLE `analytics_journey_events`;--> statement-breakpoint
ALTER TABLE `__new_analytics_journey_events` RENAME TO `analytics_journey_events`;--> statement-breakpoint
CREATE INDEX `analytics_journey_events_visitor_time_idx` ON `analytics_journey_events` (`visitor_hash`,`occurred_at`);--> statement-breakpoint
CREATE INDEX `analytics_journey_events_session_time_idx` ON `analytics_journey_events` (`session_hash`,`occurred_at`);--> statement-breakpoint
CREATE INDEX `analytics_journey_events_event_time_idx` ON `analytics_journey_events` (`event_name`,`occurred_at`);--> statement-breakpoint
CREATE INDEX `analytics_journey_events_path_time_idx` ON `analytics_journey_events` (`path`,`occurred_at`);--> statement-breakpoint
CREATE INDEX `analytics_journey_events_expires_idx` ON `analytics_journey_events` (`expires_at`);--> statement-breakpoint
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
	CONSTRAINT "content_reports_locale_check" CHECK("__new_content_reports"."locale" in ('zh-hans', 'en', 'fr', 'de', 'es', 'ja', 'pt-br', 'ru', 'ko', 'zh-hant')),
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
INSERT INTO `__new_content_reports`("id", "target_kind", "target_key", "locale", "service", "version", "category", "message", "evidence_url", "contact", "status", "created_at", "updated_at", "resolved_at", "resolution_note", "resolved_by", "requester_hash") SELECT "id", "target_kind", "target_key", "locale", "service", "version", "category", "message", "evidence_url", "contact", "status", "created_at", "updated_at", "resolved_at", "resolution_note", "resolved_by", "requester_hash" FROM `content_reports`;--> statement-breakpoint
DROP TABLE `content_reports`;--> statement-breakpoint
ALTER TABLE `__new_content_reports` RENAME TO `content_reports`;--> statement-breakpoint
CREATE INDEX `content_reports_requester_window_idx` ON `content_reports` (`requester_hash`,`created_at`);--> statement-breakpoint
CREATE INDEX `content_reports_status_created_idx` ON `content_reports` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `content_reports_target_created_idx` ON `content_reports` (`target_kind`,`target_key`,`created_at`);