export interface PostResponse {
  id: number;
  title: string;
  description?: string;
  type: string;
  status: string; // e.g. 'PENDING' | 'APPROVED'
  createdByUsername: string;
  assignedUpdate?: string | null;
  createdAt: string;
  updatedAt: string;
}