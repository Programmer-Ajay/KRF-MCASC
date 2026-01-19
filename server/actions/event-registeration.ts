// src/server/actions/event-registration.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { FormState } from "@/types";
import {
  eventRegistrationSchema,
  parseFlattenedFormData,
  eventDynamicSchemas } from "@/lib/validations/events-validations";
import { createEventRegistration } from "@/server/services/event-register-service";
import { revalidatePath } from "next/cache";

    import { canUserRegister } from "@/server/services/event-register-service";
/**
 * Server action to handle event registration form submission
 */


export async function registerEventAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Step 1: Authentication Check
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return {
        success: false,
        message: "Please login to continue.",
      };
    }

    // Step 2: Parse Form Data
    const rawData = Object.fromEntries(formData.entries());
    const parsedData = parseFlattenedFormData(rawData);

    // Step 3: Validation
    const validationResult = validateRegistrationData(parsedData);
    if (!validationResult.success) {
      return {
        success: false,
        message: "Please fix the validation errors.",
        errors: validationResult.errors,
      };
    }

    // Step 4: Call Service Layer
    const result = await createEventRegistration(
      user.id,
      validationResult.data
    );

    if (!result.success) {
      return {
        success: false,
        message: result.error || "Registration failed.",
      };
    }

    // // Step 5: Revalidate relevant paths
    // revalidatePath("/dashboard/my-registrations");
    // revalidatePath("/events");

    return {
      success: true,
      message:
        result.data?.type === "team"
          ? `Team "${result.data.teamName}" registered successfully! 🎉`
          : "Registration successful! 🎉",
    };
  } catch (error: any) {
    console.error("Register event action error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}


/**
 * Validate registration data with Zod schemas
 */
function validateRegistrationData(parsedData: any): {
  success: boolean;
  data?: any;
  errors?: Record<string, string[]>;
} {
  const flatErrors: Record<string, string[]> = {};

  // Validate common fields and team structure
  const mainValidation = eventRegistrationSchema.safeParse(parsedData);

  if (!mainValidation.success) {
    mainValidation.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      // Clean up path for better UX
      const fieldPath = path
        .replace(/^commonFields\./, "")
        .replace(/^team\./, "team.");

      if (!flatErrors[fieldPath]) {
        flatErrors[fieldPath] = [];
      }
      flatErrors[fieldPath].push(issue.message);
    });
  }

  // Validate dynamic/event-specific fields
  let dynamicCleanData = {};
  const eventType = parsedData.eventType as keyof typeof eventDynamicSchemas;
  const dynamicSchema = eventDynamicSchemas[eventType];

  if (dynamicSchema) {
    const dynamicValidation = dynamicSchema.safeParse(
      parsedData.dynamicFields
    );

    if (!dynamicValidation.success) {
      dynamicValidation.error.issues.forEach((issue) => {
        const fieldPath = `dynamicField.${issue.path.join(".")}`;
        if (!flatErrors[fieldPath]) {
          flatErrors[fieldPath] = [];
        }
        flatErrors[fieldPath].push(issue.message);
      });
    } else {
      dynamicCleanData = dynamicValidation.data;
    }
  }

  // Return errors if any exist
  if (Object.keys(flatErrors).length > 0) {
    return {
      success: false,
      errors: flatErrors,
    };
  }

  // Return validated data
  return {
    success: true,
    data: {
      ...mainValidation.data,
      dynamicFields: dynamicCleanData,
    },
  };
}

/**
 * Check if user can register for an event
 */
export async function checkRegistrationEligibility(competitionId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "Please login to check eligibility.",
      };
    }


    const result = await canUserRegister(user.id, competitionId);

    return {
      success: result.allowed,
      message: result.reason,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error checking eligibility.",
    };
  }
}