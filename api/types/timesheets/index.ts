export interface Timesheet {
  id: number;
  start_date: string;
  end_date: string;
  user_id: number;
  folder_id: number;
  task_id: number;
  created_at: string;
  updated_at: string;
}

export type CreateTimesheet = Omit<
  Timesheet,
  "id" | "user_id" | "end_date" | "created_at" | "updated_at"
>;
