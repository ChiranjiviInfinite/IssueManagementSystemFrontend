export interface PostRequest {
  title: string;
  description?: string;
  type: string; // e.g. 'BUG' | 'FEATURE' | 'TASK'
}