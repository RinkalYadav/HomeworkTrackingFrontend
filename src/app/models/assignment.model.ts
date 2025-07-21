export interface Assignment {
  id: number;
  title: string;
  subject?: string;     // ✅ Add this
  className?: string;   // ✅ Add this
   description?: string;
  deadline?: string; // Or Date if you're using Date type in your backend
}
