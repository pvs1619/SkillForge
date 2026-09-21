import { z } from "zod";

export const YEAR_OF_STUDY_OPTIONS = [
  "1st Year (Undergraduate)",
  "2nd Year (Undergraduate)",
  "3rd Year (Undergraduate)",
  "4th Year (Undergraduate)",
  "Postgraduate / Research Scholar",
] as const;

export const DEPARTMENT_OPTIONS = [
  "Computer Science & Engineering",
  "Data Science & Artificial Intelligence",
  "Information Technology",
  "Electronics & Communication Engineering",
  "Mechanical & Automation Engineering",
  "Design & Human-Computer Interaction",
  "Mathematics & Computing",
  "Management & Business Informatics",
] as const;

// Indian phone number regex: accepts 10 digits starting with 6-9, optionally prefixed by +91 or 91
const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

export const enrollmentSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required." })
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(70, "Full name cannot exceed 70 characters.")
    .regex(
      /^[a-zA-Z\s.'-]+$/,
      "Full name should only contain letters, spaces, and standard punctuation."
    ),

  email: z
    .string({ required_error: "Institutional or personal email is required." })
    .trim()
    .email("Please provide a valid email address.")
    .max(100, "Email address is too long."),

  phone: z
    .string({ required_error: "Contact phone number is required." })
    .trim()
    .regex(
      indianPhoneRegex,
      "Please enter a valid 10-digit Indian mobile number (e.g., 9876543210 or +91 9876543210)."
    ),

  yearOfStudy: z
    .string({ required_error: "Please select your current year of study." })
    .min(1, "Please select your year of study."),

  department: z
    .string({ required_error: "Please select or specify your department." })
    .min(1, "Please select your department."),

  workshopId: z
    .string({ required_error: "Please select a workshop to enroll in." })
    .min(1, "Please select a workshop."),

  learningGoal: z
    .string()
    .trim()
    .max(500, "Learning goal note cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),

  agreeToTerms: z
    .boolean({
      required_error: "You must acknowledge and accept the workshop attendance policy.",
    })
    .refine((val) => val === true, {
      message: "You must agree to the academic integrity and attendance policy.",
    }),
});

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>;
