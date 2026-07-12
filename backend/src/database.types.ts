export type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string
          email: string
          full_name: string
          contact_number: string
          college_name: string
          city: string
          course_background: string
          created_at: string
          source: string
          ip_hash: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          contact_number: string
          college_name: string
          city: string
          course_background: string
          created_at?: string
          source?: string
          ip_hash?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          contact_number?: string
          college_name?: string
          city?: string
          course_background?: string
          created_at?: string
          source?: string
          ip_hash?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
