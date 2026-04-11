import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      description: z.string(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      pubDate: z.coerce.date(),
      title: z.string(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const constructors = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({
    base: "./src/content/constructors",
    pattern: "**/*.{md,mdx}",
  }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      carImage: image(),
      carImageAlt: z.string(),
      carImageLarge: image().optional(),
      carImageLargeAlt: z.string(),
      carModel: z.string(),
      championshipPosition: z.number().default(0),
      championships: z.number().default(0).optional(),
      constructorName: z.string(),
      constructorPoints: z.number().default(0),
      careerStats: z
        .object({
          firstEntry: z.number().optional(),
          racesEntered: z.number().optional(),
          driverChampionships: z.number().optional(),
          constructorChampionships: z.number().optional(),
          careerPoints: z.number().optional(),
          fastestLaps: z.number().optional(),
          grandPrixWins: z.number().optional(),
          podiumPositions: z.number().default(0).optional(),
          polePositions: z.number().optional(),
          sprintPodiums: z.number().optional(),
          sprintPoints: z.number().optional(),
          sprintPolePositions: z.number().optional(),
        })
        .optional(),
      dnf: z.number().default(0).optional(),
      description: z.string(),
      engineSupplier: z.string(),
      fastestLaps: z.number().default(0).optional(),
      grandPrixWins: z.number().default(0).optional(),
      grandPrixPoints: z.number().default(0).optional(),
      heroImage: image().optional(),
      podiumPositions: z.number().default(0).optional(),
      polePositions: z.number().default(0).optional(),
      pubDate: z.coerce.date(),
      racesEntered: z.number().default(0).optional(),
      season: z.enum(["2024", "2025", "2026"]),
      sprintPodiums: z.number().default(0).optional(),
      sprintPoints: z.number().default(0).optional(),
      sprintPolePositions: z.number().default(0).optional(),
      sprintWins: z.number().default(0).optional(),
      teamDrivers: z.array(z.string()),
      teamLogo: image().optional(),
      teamPrincipal: z.string(),
      updatedDate: z.coerce.date().optional(),
    }),
});

const drivers = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/drivers", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      age: z.number(),
      careerStats: z
        .object({
          careerPoints: z.number().optional(),
          championships: z.number().optional(),
          fastestLaps: z.number().optional(),
          grandPrixWins: z.number().optional(),
          podiumPositions: z.number().default(0).optional(),
          polePositions: z.number().optional(),
          sprintPodiums: z.number().optional(),
          sprintPoints: z.number().optional(),
          sprintPolePositions: z.number().optional(),
        })
        .optional(),
      championshipPosition: z.number().default(0),
      championships: z.number().default(0).optional(),
      countryCode: z.string(),
      description: z.string(),
      driverFirstName: z.string(),
      driverLastName: z.string(),
      driverLogo: image().optional(),
      driverNumber: z.number().default(0),
      driverPoints: z.number().default(0),
      driverTeam: z.string(),
      fastestLaps: z.number().default(0).optional(),
      grandPrixWins: z.number().default(0).optional(),
      heroImage: image().optional(),
      nationality: z.string(),
      podiums: z.number().default(0).optional(),
      polePositions: z.number().default(0).optional(),
      profileImage: image(),
      profileImageAlt: z.string(),
      profileImageLarge: image().optional(),
      profileImageLargeAlt: z.string(),
      pubDate: z.coerce.date(),
      season: z.enum(["2024", "2025", "2026"]),
      updatedDate: z.coerce.date().optional(),
    }),
});

const races = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/races", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      raceWeekendDateRange: z.string().optional(),
      raceResults: z
        .array(
          z.object({
            position: z.number(),
            carNumber: z.number().optional(),
            driver: z.string(),
            team: z.string(),
            laps: z.number().optional(),
            timeOrRetired: z.string().optional(),
            points: z.number().optional(),
          }),
        )
        .optional(),
      practice1Results: z
        .array(
          z.object({
            position: z.number(),
            carNumber: z.number().optional(),
            driver: z.string(),
            team: z.string(),
            laps: z.number().optional(),
            timeOrRetired: z.string().optional(),
            points: z.number().optional(),
          }),
        )
        .optional(),
      practice2Results: z
        .array(
          z.object({
            position: z.number(),
            carNumber: z.number().optional(),
            driver: z.string(),
            team: z.string(),
            laps: z.number().optional(),
            timeOrRetired: z.string().optional(),
            points: z.number().optional(),
          }),
        )
        .optional(),
      practice3Results: z
        .array(
          z.object({
            position: z.number(),
            carNumber: z.number().optional(),
            driver: z.string(),
            team: z.string(),
            laps: z.number().optional(),
            timeOrRetired: z.string().optional(),
            points: z.number().optional(),
          }),
        )
        .optional(),
      qualifyingResults: z
        .array(
          z.object({
            position: z.number(),
            carNumber: z.number().optional(),
            driver: z.string(),
            team: z.string(),
            laps: z.number().optional(),
            timeOrRetired: z.string().optional(),
            points: z.number().optional(),
          }),
        )
        .optional(),
      sprintResults: z
        .array(
          z.object({
            position: z.number(),
            carNumber: z.number().optional(),
            driver: z.string(),
            team: z.string(),
            laps: z.number().optional(),
            timeOrRetired: z.string().optional(),
            points: z.number().optional(),
          }),
        )
        .optional(),
      fastestLapResults: z
        .array(
          z.object({
            position: z.number(),
            carNumber: z.number().optional(),
            driver: z.string(),
            team: z.string(),
            laps: z.number().optional(),
            timeOrRetired: z.string().optional(),
            points: z.number().optional(),
          }),
        )
        .optional(),
      time: z.string().optional(),
      fastestLapConstructor: z.string().optional(),
      fastestLapDriver: z.string().optional(),
      fastestLapTime: z.string().optional(),
      heroImage: image().optional(),
      laps: z.number().default(0).optional(),
      pubDate: z.coerce.date(),
      hasSprint: z.boolean().default(false).optional(),
      raceCompleted: z.boolean().default(false),
      raceDate: z.coerce.date(),
      raceName: z.string(),
      raceNumber: z.number().default(1),
      raceTime: z.string().optional(),
      raceWeekend: z.enum(["Practice", "Qualifying", "Sprint", "Race"]),
      raceWeekendDescription: z.string(),
      raceWeekendOrder: z.number().default(0),
      season: z.enum(["2024", "2025", "2026"]),
      trackCountry: z.string(),
      trackImage: image(),
      trackImageAlt: z.string(),
      trackImageLarge: image().optional(),
      trackImageLargeAlt: z.string(),
      trackLocation: z.string(),
      trackName: z.string(),
      updatedDate: z.coerce.date().optional(),
      winningConstructor: z.string(),
      winningDriver: z.string(),
    }),
});

export const collections = { blog, constructors, drivers, races };
