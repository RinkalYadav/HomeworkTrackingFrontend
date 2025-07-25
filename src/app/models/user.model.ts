export interface User {
  username: string;
  password: string;
  role?: 'STUDENT' | 'TEACHER' | 'PARENT' | '';
  classes?: string;
  email?: string;  // ✅ Add this line
  studentClass?: string;   // for student 👈 add this
}
