CREATE TABLE `external_links` (
	`id` text PRIMARY KEY NOT NULL,
	`href` text NOT NULL,
	`image_src` text NOT NULL,
	`alt` text NOT NULL,
	`height` integer DEFAULT 54 NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	CONSTRAINT "external_links_values_check" CHECK(
        length("external_links"."id") = 36
        and length("external_links"."href") between 9 and 2048
        and substr("external_links"."href", 1, 8) = 'https://'
        and length("external_links"."image_src") between 9 and 2048
        and substr("external_links"."image_src", 1, 8) = 'https://'
        and length("external_links"."alt") between 1 and 120
        and "external_links"."height" between 20 and 120
        and "external_links"."active" in (0, 1)
        and "external_links"."created_at" >= 1
        and length("external_links"."created_by") between 3 and 254
      )
);
--> statement-breakpoint
CREATE UNIQUE INDEX `external_links_href_unique` ON `external_links` (`href`);--> statement-breakpoint
CREATE INDEX `external_links_active_created_idx` ON `external_links` (`active`,`created_at`);