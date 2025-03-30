export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_interactions: {
        Row: {
          completion_tokens: number
          conversation_id: string
          created_at: string
          deleted_at: string | null
          id: string
          message_id: string
          model: string
          prompt_tokens: number
          total_tokens: number
          user_id: string
        }
        Insert: {
          completion_tokens?: number
          conversation_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          message_id: string
          model: string
          prompt_tokens?: number
          total_tokens?: number
          user_id: string
        }
        Update: {
          completion_tokens?: number
          conversation_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          message_id?: string
          model?: string
          prompt_tokens?: number
          total_tokens?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_interactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          tags: string[] | null
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          tags?: string[] | null
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          tags?: string[] | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          deleted_at: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_history: {
        Row: {
          amount: number
          currency: string
          deleted_at: string | null
          id: string
          payment_date: string
          payment_method: string | null
          status: string
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          currency?: string
          deleted_at?: string | null
          id?: string
          payment_date?: string
          payment_method?: string | null
          status: string
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          currency?: string
          deleted_at?: string | null
          id?: string
          payment_date?: string
          payment_method?: string | null
          status?: string
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_history_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          canceled_at: string | null
          deleted_at: string | null
          id: string
          monthly_quota: number
          next_billing_date: string | null
          plan_name: string
          start_date: string
          status: string
          user_id: string
        }
        Insert: {
          canceled_at?: string | null
          deleted_at?: string | null
          id?: string
          monthly_quota: number
          next_billing_date?: string | null
          plan_name: string
          start_date?: string
          status: string
          user_id: string
        }
        Update: {
          canceled_at?: string | null
          deleted_at?: string | null
          id?: string
          monthly_quota?: number
          next_billing_date?: string | null
          plan_name?: string
          start_date?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_quota: {
        Row: {
          deleted_at: string | null
          id: string
          last_updated: string
          monthly_quota: number
          reset_date: string
          tokens_used_this_month: number
          user_id: string
        }
        Insert: {
          deleted_at?: string | null
          id?: string
          last_updated?: string
          monthly_quota?: number
          reset_date: string
          tokens_used_this_month?: number
          user_id: string
        }
        Update: {
          deleted_at?: string | null
          id?: string
          last_updated?: string
          monthly_quota?: number
          reset_date?: string
          tokens_used_this_month?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quota_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_user_uuid: string | null
          created_at: string
          deleted_at: string | null
          email: string | null
          id: string
          last_login: string | null
          username: string
        }
        Insert: {
          auth_user_uuid?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          last_login?: string | null
          username: string
        }
        Update: {
          auth_user_uuid?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          last_login?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      message_belongs_to_user: {
        Args: {
          message_id: string
        }
        Returns: boolean
      }
      user_has_available_quota: {
        Args: {
          user_id: string
          tokens_needed: number
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
