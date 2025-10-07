/**
 * Mock Decisioning Service
 *
 * Simulates a third-party decisioning service that evaluates loan applications.
 * In a real system, this would make an API call to an external service.
 */

export interface DecisioningRequest {
  applicationId: string;
  applicantName: string;
  loanAmount: number;
  // Add other fields as needed
}

export interface DecisioningResponse {
  applicationId: string;
  decision: 'APPROVED' | 'DENIED';
  timestamp: Date;
}

/**
 * Request a decision on a loan application.
 * Simulates ~30 seconds of processing latency.
 *
 * @param request - The decisioning request
 * @returns Promise that resolves with the decision
 */
export async function requestDecision(
  request: DecisioningRequest
): Promise<DecisioningResponse> {
  // Simulate 30 seconds of processing time
  await new Promise((resolve) => setTimeout(resolve, 30000));

  // Simple decision logic for demo purposes
  // In reality, this would be determined by the external service
  const decision = request.loanAmount <= 50000 ? 'APPROVED' : 'DENIED';

  return {
    applicationId: request.applicationId,
    decision,
    timestamp: new Date(),
  };
}
