export type UserRole = "student" | "staff" | "admin"

export interface Profile {
  id: string;
  full_name: string;
  student_index: string;
  role: UserRole;
  created_at: string;

}
