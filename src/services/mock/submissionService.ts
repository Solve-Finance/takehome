/**
 * Mock Submission Service
 *
 * Simulates a third-party service that finalizes approved loan applications.
 * In a real system, this would make an API call to submit the application
 * to the loan origination system.
 */

export interface SubmissionRequest {
  applicationId: string;
  applicantName: string;
  loanAmount: number;
  // Add other fields as needed
}

export interface SubmissionResponse {
  applicationId: string;
  success: boolean;
  submissionId: string;
  timestamp: Date;
}

/**
 * Submit an approved loan application.
 * This mock implementation always succeeds.
 *
 * @param request - The submission request
 * @returns Promise that resolves with the submission result
 */
export async function submitApplication(
  request: SubmissionRequest
): Promise<SubmissionResponse> {
  // Simulate a small amount of network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Always succeeds - generate a mock submission ID
  const submissionId = `SUB-${Date.now()}-${request.applicationId}`;

  return {
    applicationId: request.applicationId,
    success: true,
    submissionId,
    timestamp: new Date(),
  };
}
