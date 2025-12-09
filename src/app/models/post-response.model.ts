export interface PostResponse {
  id: number;
  title: string;
  description?: string;
  type: string;
  status: string; 
  createdByUsername: string;
  assignedUpdate?: string | null;
  createdAt: string;
  updatedAt: string;
}