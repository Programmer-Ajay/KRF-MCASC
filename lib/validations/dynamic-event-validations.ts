import { z } from "zod";

// --- Helpers ---

// Helper for required text fields with custom messages
const createRequiredString = (fieldName: string) => 
  z.string()
   .min(1, { message: `${fieldName} cannot be empty` })
   .trim();

// Helper for URL fields (allows empty string or valid URL)
const optionalUrlSchema = z.union([
  z.url({ message: "Please enter a valid URL (e.g., https://...)" }), 
  z.literal("")
]).optional();

// --- Event Schemas ---

const seminarDynamicSchema = z.object({
  topic: createRequiredString("Topic of Interest"),
});

// const debateDynamicSchema = z.object({
//   topic: z.enum([
//     "Artificial Intelligence Impact on Society",
//     "Climate Change Solutions",
//     "Future of Education",
//     "Technology vs. Humanity",
//     "Other"
//   ] as const, {
//     message: "Please select a valid debate topic"
//   }),
//   standpoint: z.enum(["For", "Against"] as const, {
//     message: "Please select your standpoint (For or Against)"
//   }),
// });

const programmingDynamicSchema = z.object({
  language: z.enum(["C"] as const, {
    message: "Please select a programming language"
  }),
});

const shortfilmDynamicSchema = z.object({
  filmLink:optionalUrlSchema,
  duration: z.coerce.number()
    .min(1, { message: "Film duration must be at least 1 minute" })
    .max(60, { message: "Film duration cannot exceed 60 minutes" }),
  
  genre: z.enum(["Drama", "Comedy", "Thriller", "Documentary", "Animation", "Other"] as const, {
    message: "Please select a film genre"
  }),
  
  // synopsis: z.string()
  //   .min(10, { message: "Synopsis must be at least 10 characters long" })
  //   .max(500, { message: "Synopsis cannot exceed 500 characters" })
  //   .optional(),
});

const quizDynamicSchema = z.object({});
const debateDynamicSchema=z.object({})

const projectDynamicSchema = z.object({
  projectTitle: createRequiredString("Project Title"),
  projectDescription: createRequiredString("Project Description")
    .min(20, { message: "Please provide a more detailed description (min 20 chars)" }).or(z.literal("")).optional(),
  
  technology: z.union([
    z.array(z.string().min(1)).min(1, { message: "At least one technology is required" }),
    z.string().min(1, { message: "Technology Stack is required" }).transform(val => 
      val.split(",").map(t => t.trim()).filter(Boolean)
    )
  ]).refine(arr => arr.length > 0, { message: "At least one technology is required" }),
  
  githubLink: optionalUrlSchema,
  demoLink: optionalUrlSchema, 
});

// --- Master Schema Map ---

export const eventDynamicSchemas = {
  seminar: seminarDynamicSchema,
  debate: debateDynamicSchema,
  programming: programmingDynamicSchema,
  shortfilm: shortfilmDynamicSchema,
  quiz: quizDynamicSchema,
  project: projectDynamicSchema,
} as const;

export type EventFormData = z.infer<typeof seminarDynamicSchema  | 
typeof debateDynamicSchema|typeof programmingDynamicSchema | typeof shortfilmDynamicSchema | typeof quizDynamicSchema | typeof projectDynamicSchema>;
