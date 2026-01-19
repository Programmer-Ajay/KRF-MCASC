import { z } from "zod";


// schema for common fields;
export const commonSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.email({ message: "Invalid email address" }),
  collegeName: z.string().min(3, { message: "College name is required" }),
  class: z.string().min(1, { message: "calss/Year is required" }),
  courseName: z.string().min(3, { message: "Course name is required" }),
  mobileNo: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Mobile number must be 10 digits" }),
   gender: z.enum(["male", "female", "other"], { message: "Please select a gender" }) ,

    guardianMobile: z.string()
    .regex(/^[0-9]{10}$/, { message: "Guardian mobile must be 10 digits" })
    .optional()
    .or(z.literal("")), // Allows empty string
  
  category: z.enum(["ug", "pg", "junior college"], { 
  message: "Please select a valid category" // ✅ Correct way
}),
});


// validation schema for teams and team members
export const teamSchema = z.object({
  teamName: z
  .string()
  .min(3, { message: "Team name is too short" })
  .max(20, { message: "team name is too long" }),

  teamMembers: z
  .array(commonSchema)
  .max(3, { message: "team size can not more than 4" })
});


// Helper function: Convert flattened form data to nested structure
export const parseFlattenedFormData = (flatData: Record<string, any>) => {
  const result: Record<string, any> = {
    commonFields: {},
    dynamicFields: {},
    team: undefined
  };

  for (const [key, value] of Object.entries(flatData)) {
    if (key === "eventType") {
      result.eventType = value;
    } else if (key.startsWith("dynamicField.")) {
      // Extract dynamicField.fieldName -> fieldName
      const fieldName = key.replace("dynamicField.", "");
      result.dynamicFields[fieldName] = value;
    } else if (key.startsWith("team.")) {
      // Extract team.teamName or team.teamMembers.X.fieldName
      if (!result.team) {
        result.team = { teamName: "", teamMembers: [] };
      }
      
      if (key === "team.teamName") {
        result.team.teamName = value;
      } else if (key.startsWith("team.teamMembers.")) {
        // Parse: team.teamMembers.0.fullName -> index 0, field fullName
        const matches = key.match(/team\.teamMembers\.(\d+)\.(.+)/);
        if (matches) {
          const index = parseInt(matches[1]);
          const fieldName = matches[2];
          
          // Ensure array has enough slots
          while (result.team.teamMembers.length <= index) {
            result.team.teamMembers.push({});
          }
          
          result.team.teamMembers[index][fieldName] = value;
        }
      }
    } else {
      // Common fields: fullName, email, etc.
      result.commonFields[key] = value;
    }
  }

  return result;
};

// Export dynamic schemas from the separate file
export { eventDynamicSchemas } from "./dynamic-event-validations";

// Combined schema for validation with optional team and dynamic fields
export const eventRegistrationSchema = z.object({
  commonFields: commonSchema,
  team: teamSchema.optional(),
  dynamicFields: z.record(z.string(), z.any()),
  eventType: z.string(),
}).passthrough();
