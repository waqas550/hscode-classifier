export interface HSCodeRequest {
  product_description: string;
  language: string;
}

export interface HSCodeResponse {
  interpreted_description: string;
  hs_code: string;
  explanation: string;
  response_language: string;
}

export class HSCodeError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'HSCodeError';
  }
} 