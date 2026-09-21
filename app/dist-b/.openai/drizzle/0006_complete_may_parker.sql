CREATE TABLE `external_link_settings` (
	`scope` text PRIMARY KEY NOT NULL,
	`scale_percent` integer DEFAULT 70 NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	CONSTRAINT "external_link_settings_values_check" CHECK(
        "external_link_settings"."scope" = 'footer'
        and "external_link_settings"."scale_percent" between 40 and 100
        and "external_link_settings"."updated_at" >= 1
        and length("external_link_settings"."updated_by") between 3 and 254
      )
);
