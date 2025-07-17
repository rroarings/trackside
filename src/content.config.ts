import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		heroImageAlt: z.string().optional(),
	}),
});

const constructors = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/constructors', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		constructorName: z.string(),
		carModel: z.string().optional(),
		description: z.string(),
		season: z.enum(['2024', '2025']),
		teamDrivers: z.array(z.string()),
		teamPrincipal: z.string(),
		engineSupplier: z.string(),
		chassis: z.string(),
		carImage: image(),
		carImageLarge: image().optional(),
		carImageAlt: z.string(),
		carImageLargeAlt: z.string(),
		teamLogo: image().optional(),
		constructorPoints: z.number().default(0),
		championshipPosition: z.number().default(0),
		championships: z.number().default(0).optional(),
		grandPrixWins: z.number().default(0).optional(),
		polePositions: z.number().default(0).optional(),
		fastestLaps: z.number().default(0).optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

const drivers = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/drivers', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		driverFirstName: z.string(),
		driverLastName: z.string(),
		driverTeam: z.string(),
		description: z.string(),
		season: z.enum(['2024', '2025']),
		nationality: z.string(),
		countryCode: z.string(),
		age: z.number(),
		profileImage: image(),
		profileImageLarge: image().optional(),
		profileImageAlt: z.string(),
		profileImageLargeAlt: z.string(),
		driverLogo: image().optional(),
		constructorPoints: z.number().default(0),
		championshipPosition: z.number().default(0),
		championships: z.number().default(0).optional(),
		grandPrixWins: z.number().default(0).optional(),
		polePositions: z.number().default(0).optional(),
		fastestLaps: z.number().default(0).optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

const races = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/races', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		trackImage: image(),
		trackImageLarge: image().optional(),
		trackImageAlt: z.string(),
		trackImageLargeAlt: z.string(),
		trackName: z.string(),
		trackLocation: z.string(),
		trackCountry: z.string(),
		raceDate: z.coerce.date(),
		raceTime: z.string().optional(),
		raceWeekend: z.enum(['Practice', 'Qualifying', 'Sprint', 'Race']),
		raceWeekendOrder: z.number().default(0),
		raceWeekendDescription: z.string(),
		season: z.enum(['2024', '2025']),
		winningDriver: z.string(),
		winningConstructor: z.string(),
		fastestLapDriver: z.string().optional(),
		fastestLapConstructor: z.string().optional(),
		fastestLapTime: z.string().optional(),
		raceNumber: z.number().default(1),
		raceCompleted: z.boolean().default(false),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

export const collections = { blog, constructors, drivers, races };
