export interface Rating {
  id: string
  rate: number
  description: string
  created_at: string
  book_id?: string
  user_id?: string
}
