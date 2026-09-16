PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_external_links` (
	`id` text PRIMARY KEY NOT NULL,
	`href` text NOT NULL,
	`badge_type` text DEFAULT 'image' NOT NULL,
	`image_src` text,
	`alt` text NOT NULL,
	`height` integer DEFAULT 54 NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	CONSTRAINT "external_links_values_check" CHECK(
        length("__new_external_links"."id") = 36
        and length("__new_external_links"."href") between 9 and 2048
        and substr("__new_external_links"."href", 1, 8) = 'https://'
        and "__new_external_links"."badge_type" in ('image', 'text')
        and (
          (
            "__new_external_links"."badge_type" = 'image'
            and length("__new_external_links"."image_src") between 9 and 2048
            and substr("__new_external_links"."image_src", 1, 8) = 'https://'
          )
          or (
            "__new_external_links"."badge_type" = 'text'
            and "__new_external_links"."image_src" is null
          )
        )
        and length("__new_external_links"."alt") between 1 and 120
        and "__new_external_links"."height" between 20 and 120
        and "__new_external_links"."active" in (0, 1)
        and "__new_external_links"."created_at" >= 1
        and length("__new_external_links"."created_by") between 3 and 254
      )
);
--> statement-breakpoint
INSERT INTO `__new_external_links`("id", "href", "badge_type", "image_src", "alt", "height", "active", "created_at", "created_by") SELECT "id", "href", 'image', "image_src", "alt", "height", "active", "created_at", "created_by" FROM `external_links`;--> statement-breakpoint
DROP TABLE `external_links`;--> statement-breakpoint
ALTER TABLE `__new_external_links` RENAME TO `external_links`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `external_links_href_unique` ON `external_links` (`href`);--> statement-breakpoint
CREATE INDEX `external_links_active_created_idx` ON `external_links` (`active`,`created_at`);
