/**
 * Slug utility functions for consistent slug extraction across the application
 */

import type { CollectionEntry } from "astro:content";

/**
 * Extracts a slug from a collection entry ID
 * Handles nested paths like "2025/driver-name" by returning just the final segment
 *
 * @param entry - The collection entry to extract the slug from
 * @returns The slug (final path segment) or empty string if not found
 *
 * @example
 * const slug = getSlugFromEntry(driverEntry);
 * // For entry with id "2025/lewis-hamilton", returns: "lewis-hamilton"
 */
export function getSlugFromEntry(
  entry: CollectionEntry<"drivers" | "constructors" | "races" | "blog">,
): string {
  const rawId = entry?.id || "";
  return String(rawId).replace(/\/+$/, "").split("/").pop() || "";
}

/**
 * Builds a URL path for a season-specific entity (driver, constructor, race)
 *
 * @param entry - The collection entry
 * @param entityType - The type of entity ("drivers", "constructors", "races")
 * @returns The full URL path
 *
 * @example
 * const href = buildSeasonEntityPath(driverEntry, "drivers");
 * // Returns: "/seasons/2025/drivers/lewis-hamilton"
 */
export function buildSeasonEntityPath(
  entry: CollectionEntry<"drivers" | "constructors" | "races">,
  entityType: "drivers" | "constructors" | "races",
): string {
  const slug = getSlugFromEntry(entry);
  const season = entry.data?.season || "2025";
  return `/seasons/${season}/${entityType}/${slug}`;
}
