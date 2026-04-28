export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      chapter: {
        Row: {
          id: string
          position: number
          thumbnail_id: string | null
          title: string
          volume_id: string
        }
        Insert: {
          id?: string
          position: number
          thumbnail_id?: string | null
          title: string
          volume_id: string
        }
        Update: {
          id?: string
          position?: number
          thumbnail_id?: string | null
          title?: string
          volume_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_thumbnail_id_fkey"
            columns: ["thumbnail_id"]
            isOneToOne: false
            referencedRelation: "media_asset"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chapter_volume_id_fkey"
            columns: ["volume_id"]
            isOneToOne: false
            referencedRelation: "volume"
            referencedColumns: ["id"]
          },
        ]
      }
      character_image: {
        Row: {
          entity_id: string
          id: string
          label: string
          media_asset_id: string
        }
        Insert: {
          entity_id: string
          id?: string
          label: string
          media_asset_id: string
        }
        Update: {
          entity_id?: string
          id?: string
          label?: string
          media_asset_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_image_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_image_media_asset_id_fkey"
            columns: ["media_asset_id"]
            isOneToOne: false
            referencedRelation: "media_asset"
            referencedColumns: ["id"]
          },
        ]
      }
      entity: {
        Row: {
          created_at: string | null
          id: string
          slug: string
          thumbnail_id: string | null
          title: string
          type: Database["public"]["Enums"]["entity_type"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          slug: string
          thumbnail_id?: string | null
          title: string
          type: Database["public"]["Enums"]["entity_type"]
        }
        Update: {
          created_at?: string | null
          id?: string
          slug?: string
          thumbnail_id?: string | null
          title?: string
          type?: Database["public"]["Enums"]["entity_type"]
        }
        Relationships: [
          {
            foreignKeyName: "entity_thumbnail_id_fkey"
            columns: ["thumbnail_id"]
            isOneToOne: false
            referencedRelation: "media_asset"
            referencedColumns: ["id"]
          },
        ]
      }
      kb_chunk: {
        Row: {
          content: string
          entity_id: string
          id: string
          position: number
          unlock_page_id: string
        }
        Insert: {
          content: string
          entity_id: string
          id?: string
          position: number
          unlock_page_id: string
        }
        Update: {
          content?: string
          entity_id?: string
          id?: string
          position?: number
          unlock_page_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kb_chunk_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kb_chunk_unlock_page_id_fkey"
            columns: ["unlock_page_id"]
            isOneToOne: false
            referencedRelation: "page"
            referencedColumns: ["id"]
          },
        ]
      }
      media_asset: {
        Row: {
          created_at: string | null
          id: string
          thumbnail_url: string | null
          type: Database["public"]["Enums"]["media_type"]
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          thumbnail_url?: string | null
          type: Database["public"]["Enums"]["media_type"]
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          thumbnail_url?: string | null
          type?: Database["public"]["Enums"]["media_type"]
          url?: string
        }
        Relationships: []
      }
      music_track: {
        Row: {
          created_at: string | null
          end_time: number | null
          id: string
          loop: boolean | null
          media_asset_id: string
          start_time: number | null
        }
        Insert: {
          created_at?: string | null
          end_time?: number | null
          id?: string
          loop?: boolean | null
          media_asset_id: string
          start_time?: number | null
        }
        Update: {
          created_at?: string | null
          end_time?: number | null
          id?: string
          loop?: boolean | null
          media_asset_id?: string
          start_time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "music_track_media_asset_id_fkey"
            columns: ["media_asset_id"]
            isOneToOne: false
            referencedRelation: "media_asset"
            referencedColumns: ["id"]
          },
        ]
      }
      page: {
        Row: {
          background_id: string | null
          chapter_id: string
          content: string
          global_position: number
          id: string
          music_behavior: Database["public"]["Enums"]["music_behavior"]
          music_track_id: string | null
          position: number
          status: Database["public"]["Enums"]["page_status"]
          thumbnail_id: string | null
          title: string | null
        }
        Insert: {
          background_id?: string | null
          chapter_id: string
          content: string
          global_position: number
          id?: string
          music_behavior?: Database["public"]["Enums"]["music_behavior"]
          music_track_id?: string | null
          position: number
          status?: Database["public"]["Enums"]["page_status"]
          thumbnail_id?: string | null
          title?: string | null
        }
        Update: {
          background_id?: string | null
          chapter_id?: string
          content?: string
          global_position?: number
          id?: string
          music_behavior?: Database["public"]["Enums"]["music_behavior"]
          music_track_id?: string | null
          position?: number
          status?: Database["public"]["Enums"]["page_status"]
          thumbnail_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_page_music"
            columns: ["music_track_id"]
            isOneToOne: false
            referencedRelation: "music_track"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_background_id_fkey"
            columns: ["background_id"]
            isOneToOne: false
            referencedRelation: "media_asset"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_thumbnail_id_fkey"
            columns: ["thumbnail_id"]
            isOneToOne: false
            referencedRelation: "media_asset"
            referencedColumns: ["id"]
          },
        ]
      }
      page_character: {
        Row: {
          character_image_id: string
          id: string
          page_id: string
          position_slot: Database["public"]["Enums"]["position_slots"]
          z_index: number
        }
        Insert: {
          character_image_id: string
          id?: string
          page_id: string
          position_slot: Database["public"]["Enums"]["position_slots"]
          z_index?: number
        }
        Update: {
          character_image_id?: string
          id?: string
          page_id?: string
          position_slot?: Database["public"]["Enums"]["position_slots"]
          z_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "page_character_character_image_id_fkey"
            columns: ["character_image_id"]
            isOneToOne: false
            referencedRelation: "character_image"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_character_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "page"
            referencedColumns: ["id"]
          },
        ]
      }
      volume: {
        Row: {
          id: string
          position: number
          thumbnail_id: string | null
          title: string
        }
        Insert: {
          id?: string
          position: number
          thumbnail_id?: string | null
          title: string
        }
        Update: {
          id?: string
          position?: number
          thumbnail_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "volume_thumbnail_id_fkey"
            columns: ["thumbnail_id"]
            isOneToOne: false
            referencedRelation: "media_asset"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      entity_type: "character" | "concept" | "location" | "item"
      media_type: "image" | "audio" | "youtube"
      music_behavior: "continue" | "change" | "stop"
      page_status: "draft" | "published"
      position_slots: "centre" | "left" | "right"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      entity_type: ["character", "concept", "location", "item"],
      media_type: ["image", "audio", "youtube"],
      music_behavior: ["continue", "change", "stop"],
      page_status: ["draft", "published"],
      position_slots: ["centre", "left", "right"],
    },
  },
} as const
