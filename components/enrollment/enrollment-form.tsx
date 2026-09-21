"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  enrollmentSchema,
  EnrollmentFormData,
  YEAR_OF_STUDY_OPTIONS,
  DEPARTMENT_OPTIONS,
} from "@/lib/validations/enrollment-schema";
import { enrollStudent, ActionResponse } from "@/lib/actions/enrollment-action";
import { Workshop } from "@/lib/data/workshops";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Calendar,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";

interface EnrollmentFormProps {
  workshops: Workshop[];
  defaultWorkshopId?: string;
}

export function EnrollmentForm({
  workshops,
  defaultWorkshopId,
}: EnrollmentFormProps) {
  const [submissionResult, setSubmissionResult] = React.useState<
    Extract<ActionResponse, { success: true }> | null
  >(null);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      yearOfStudy: "",
      department: "",
      workshopId: defaultWorkshopId || (workshops[0] ? workshops[0].id : ""),
      learningGoal: "",
      agreeToTerms: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: EnrollmentFormData) => {
    setServerError(null);

    try {
      // Call native Next.js Server Action
      const response = await enrollStudent(data);

      if (response.success) {
        setSubmissionResult(response);
        toast.success("Enrollment confirmed!", {
          description: response.message,
        });
      } else {
        setServerError(response.message);
        toast.error("Registration failed", {
          description: response.message,
        });

        // Set field-specific server errors if returned
        if (response.errors) {
          for (const [field, fieldErrors] of Object.entries(response.errors)) {
            if (fieldErrors && fieldErrors.length > 0) {
              setError(field as keyof EnrollmentFormData, {
                type: "server",
                message: fieldErrors[0],
              });
            }
          }
        }
      }
    } catch {
      const fallbackMsg =
        "A network or server communication error occurred. Please try again.";
      setServerError(fallbackMsg);
      toast.error("Submission Error", { description: fallbackMsg });
    }
  };

  // SUCCESS CONFIRMATION STATE
  if (submissionResult) {
    return (
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-card p-8 shadow-sm">
        <div className="flex items-center gap-3 border-b border-border/80 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              You&apos;re enrolled.
            </h2>
            <p className="text-xs text-muted-foreground">
              Confirmation Ref:{" "}
              <span className="font-mono font-semibold text-foreground">
                {submissionResult.enrollmentId}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <p className="text-foreground leading-relaxed">
            Your seat reservation for{" "}
            <strong className="text-primary font-semibold">
              {submissionResult.data.workshopTitle}
            </strong>{" "}
            has been successfully registered with the department.
          </p>

          <div className="rounded-lg bg-muted/60 p-4 border border-border/70 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Student:</span>
              <span className="font-medium text-foreground">
                {submissionResult.data.fullName}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Registered Email:</span>
              <span className="font-medium text-foreground">
                {submissionResult.data.email}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Academic Unit:</span>
              <span className="font-medium text-foreground">
                {submissionResult.data.department} ({submissionResult.data.yearOfStudy})
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Submission Timestamp:</span>
              <span className="font-mono text-muted-foreground">
                {new Date(submissionResult.timestamp).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-md bg-secondary/70 border border-emerald-200/60 dark:border-emerald-800/60 text-xs text-secondary-foreground">
            <div className="flex items-start gap-2">
              <UserCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                A confirmation summary and calendar invite have been queued for your registered email address. Please bring your student ID card to the physical lab session.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
          <Link href="/workshops">
            <Button variant="outline" className="gap-2">
              <span>Back to Workshops</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            onClick={() => {
              setSubmissionResult(null);
              reset();
            }}
          >
            Register another student
          </Button>
        </div>
      </div>
    );
  }

  // ACTIVE ENROLLMENT FORM
  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-xs">
      <div className="border-b border-border/80 pb-5 mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Workshop Registration
        </h2>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Please fill out your university academic credentials. All fields marked with * are required.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mb-6 rounded-md border border-rose-300 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/50 p-4 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2.5"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
          <span>{serverError}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
        aria-label="Workshop Enrollment Form"
      >
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName" className="text-xs font-semibold">
            Full Name <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="e.g. Aarav Sharma"
            error={!!errors.fullName}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            disabled={isSubmitting}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p
              id="fullName-error"
              className="text-xs text-destructive font-medium"
              role="alert"
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold">
              Email Address <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="student@university.edu"
              error={!!errors.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-xs text-destructive font-medium"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold">
              Mobile Number (India) <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="9876543210"
              error={!!errors.phone}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              disabled={isSubmitting}
              {...register("phone")}
            />
            {errors.phone && (
              <p
                id="phone-error"
                className="text-xs text-destructive font-medium"
                role="alert"
              >
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Year of Study & Department Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Year of Study */}
          <div className="space-y-1.5">
            <Label htmlFor="yearOfStudy" className="text-xs font-semibold">
              Year of Study <span className="text-rose-500">*</span>
            </Label>
            <Controller
              control={control}
              name="yearOfStudy"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="yearOfStudy"
                    error={!!errors.yearOfStudy}
                    aria-invalid={!!errors.yearOfStudy}
                    aria-describedby={
                      errors.yearOfStudy ? "yearOfStudy-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Select current year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEAR_OF_STUDY_OPTIONS.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.yearOfStudy && (
              <p
                id="yearOfStudy-error"
                className="text-xs text-destructive font-medium"
                role="alert"
              >
                {errors.yearOfStudy.message}
              </p>
            )}
          </div>

          {/* Department */}
          <div className="space-y-1.5">
            <Label htmlFor="department" className="text-xs font-semibold">
              Department / Discipline <span className="text-rose-500">*</span>
            </Label>
            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="department"
                    error={!!errors.department}
                    aria-invalid={!!errors.department}
                    aria-describedby={
                      errors.department ? "department-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENT_OPTIONS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.department && (
              <p
                id="department-error"
                className="text-xs text-destructive font-medium"
                role="alert"
              >
                {errors.department.message}
              </p>
            )}
          </div>
        </div>

        {/* Workshop Selection */}
        <div className="space-y-1.5">
          <Label htmlFor="workshopId" className="text-xs font-semibold">
            Select Workshop <span className="text-rose-500">*</span>
          </Label>
          <Controller
            control={control}
            name="workshopId"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSubmitting}
              >
                <SelectTrigger
                  id="workshopId"
                  error={!!errors.workshopId}
                  aria-invalid={!!errors.workshopId}
                  aria-describedby={
                    errors.workshopId ? "workshopId-error" : undefined
                  }
                >
                  <SelectValue placeholder="Choose a workshop" />
                </SelectTrigger>
                <SelectContent>
                  {workshops.map((w) => (
                    <SelectItem key={w.id} value={w.id}>
                      {w.title} ({w.category} • {w.difficulty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.workshopId && (
            <p
              id="workshopId-error"
              className="text-xs text-destructive font-medium"
              role="alert"
            >
              {errors.workshopId.message}
            </p>
          )}
        </div>

        {/* Learning Goal (Optional) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="learningGoal" className="text-xs font-semibold">
              Learning Goals or Prior Experience (Optional)
            </Label>
            <span className="text-[10px] text-muted-foreground">Max 500 chars</span>
          </div>
          <Textarea
            id="learningGoal"
            rows={3}
            placeholder="Briefly describe what you hope to build or clarify during this session..."
            error={!!errors.learningGoal}
            aria-invalid={!!errors.learningGoal}
            aria-describedby={
              errors.learningGoal ? "learningGoal-error" : undefined
            }
            disabled={isSubmitting}
            {...register("learningGoal")}
          />
          {errors.learningGoal && (
            <p
              id="learningGoal-error"
              className="text-xs text-destructive font-medium"
              role="alert"
            >
              {errors.learningGoal.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-start space-x-3">
            <Controller
              control={control}
              name="agreeToTerms"
              render={({ field }) => (
                <Checkbox
                  id="agreeToTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                  error={!!errors.agreeToTerms}
                  aria-invalid={!!errors.agreeToTerms}
                  aria-describedby={
                    errors.agreeToTerms ? "agreeToTerms-error" : undefined
                  }
                  className="mt-0.5"
                />
              )}
            />
            <Label
              htmlFor="agreeToTerms"
              className="text-xs leading-normal font-normal text-muted-foreground cursor-pointer"
            >
              I commit to arriving on time with required prerequisites and adhere to the university academic conduct code during practical lab exercises. <span className="text-rose-500">*</span>
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p
              id="agreeToTerms-error"
              className="text-xs text-destructive font-medium pl-7"
              role="alert"
            >
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground">
            Protected by end-to-end Zod server validation and sanitization.
          </p>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto font-medium px-6 gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing Enrollment...</span>
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4" />
                <span>Confirm Enrollment</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
