"use server";

import { enrollmentSchema, EnrollmentFormData } from "@/lib/validations/enrollment-schema";
import { getWorkshopById } from "@/lib/data/workshops";

export interface ActionSuccessResponse {
  success: true;
  message: string;
  enrollmentId: string;
  timestamp: string;
  data: {
    fullName: string;
    email: string;
    phone: string;
    workshopTitle: string;
    yearOfStudy: string;
    department: string;
    learningGoal?: string;
  };
}

export interface ActionErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type ActionResponse = ActionSuccessResponse | ActionErrorResponse;

/**
 * Sanitizes plain string inputs to prevent XSS / script injection attacks.
 */
function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, "") // Strip raw tag brackets
    .trim();
}

/**
 * Normalizes Indian mobile phone numbers to a consistent clean format.
 */
function normalizePhone(phone: string): string {
  // Remove non-digit characters except leading +
  const digits = phone.replace(/\D/g, "");
  // If 12 digits starting with 91, extract last 10
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  return phone.trim();
}

/**
 * Native Next.js Server Action to handle student enrollment.
 * Demonstrates:
 * 1. Server-side validation using the same shared Zod schema
 * 2. Input sanitization and normalization
 * 3. Business logic validation (verifying workshop ID against server catalogue)
 * 4. Structured type-safe mutation response
 */
export async function enrollStudent(
  formData: EnrollmentFormData
): Promise<ActionResponse> {
  try {
    // Artificial small delay to demonstrate genuine loading states
    await new Promise((resolve) => setTimeout(resolve, 600));

    // 1. Validate payload on the server using Zod
    const validationResult = enrollmentSchema.safeParse(formData);

    if (!validationResult.success) {
      const flattenedErrors = validationResult.error.flatten().fieldErrors;
      return {
        success: false,
        message: "Server validation failed. Please check the provided fields.",
        errors: flattenedErrors as Record<string, string[]>,
      };
    }

    const validData = validationResult.data;

    // 2. Business logic validation: verify workshop existence on server
    const workshop = getWorkshopById(validData.workshopId);
    if (!workshop) {
      return {
        success: false,
        message: "The selected workshop does not exist in the academic catalogue.",
        errors: {
          workshopId: ["Selected workshop could not be verified in the catalogue."],
        },
      };
    }

    // 3. Sanitize and normalize input values
    const sanitizedFullName = sanitizeString(validData.fullName);
    const sanitizedEmail = validData.email.toLowerCase().trim();
    const sanitizedPhone = normalizePhone(validData.phone);
    const sanitizedLearningGoal = validData.learningGoal
      ? sanitizeString(validData.learningGoal)
      : undefined;

    // 4. Generate deterministic enrollment confirmation identifier
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const enrollmentId = `SF-${new Date().getFullYear()}-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    // Log the simulated server-side registration (server console only)
    console.log(
      `[ServerAction:enrollStudent] Registered ${sanitizedFullName} (${sanitizedEmail}) for workshop "${workshop.title}" (ID: ${enrollmentId})`
    );

    // 5. Return structured success response
    return {
      success: true,
      message: `Enrollment confirmed! Your reservation for "${workshop.title}" has been registered.`,
      enrollmentId,
      timestamp,
      data: {
        fullName: sanitizedFullName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        workshopTitle: workshop.title,
        yearOfStudy: validData.yearOfStudy,
        department: validData.department,
        learningGoal: sanitizedLearningGoal,
      },
    };
  } catch (err) {
    console.error("[ServerAction:enrollStudent] Unexpected error:", err);
    return {
      success: false,
      message: "An unexpected server error occurred while processing your enrollment.",
    };
  }
}
