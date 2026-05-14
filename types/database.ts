export type SponsorStatus =
  | "prospecting"
  | "contacted"
  | "meeting_scheduled"
  | "negotiating"
  | "sponsored"
  | "rejected";

export type OutreachType =
  | "cold_email"
  | "follow_up"
  | "linkedin_message"
  | "judge_invitation";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Organization {
  id: string;
  owner_id: string;
  name: string;
  type: "student_org" | "hackathon" | "nonprofit" | "club" | "other";
  university: string | null;
  funding_goal: number;
  created_at: string;
}

export interface Sponsor {
  id: string;
  organization_id: string;
  company_name: string;
  contact_name: string | null;
  email: string | null;
  linkedin_url: string | null;
  notes: string | null;
  sponsorship_amount: number;
  last_contacted_at: string | null;
  status: SponsorStatus;
  tags: string[];
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  organization_id: string;
  sponsor_id: string | null;
  name: string;
  email: string | null;
  linkedin_url: string | null;
  title: string | null;
  company: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OutreachMessage {
  id: string;
  organization_id: string;
  sponsor_id: string | null;
  contact_id: string | null;
  type: OutreachType;
  subject: string | null;
  body: string;
  metadata: Json;
  created_at: string;
}

export interface Activity {
  id: string;
  organization_id: string;
  sponsor_id: string | null;
  contact_id: string | null;
  actor_id: string;
  type: string;
  summary: string;
  created_at: string;
}

export interface Reminder {
  id: string;
  organization_id: string;
  sponsor_id: string | null;
  contact_id: string | null;
  title: string;
  due_at: string;
  completed_at: string | null;
  suggested_message_id: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & Pick<Profile, "id">;
        Update: Partial<Profile>;
        Relationships: [];
      };
      organizations: {
        Row: Organization;
        Insert: Partial<Organization> & Pick<Organization, "owner_id" | "name">;
        Update: Partial<Organization>;
        Relationships: [];
      };
      sponsors: {
        Row: Sponsor;
        Insert: Partial<Sponsor> & Pick<Sponsor, "organization_id" | "company_name">;
        Update: Partial<Sponsor>;
        Relationships: [];
      };
      contacts: {
        Row: Contact;
        Insert: Partial<Contact> & Pick<Contact, "organization_id" | "name">;
        Update: Partial<Contact>;
        Relationships: [];
      };
      outreach_messages: {
        Row: OutreachMessage;
        Insert: Partial<OutreachMessage> & Pick<OutreachMessage, "organization_id" | "type" | "body">;
        Update: Partial<OutreachMessage>;
        Relationships: [];
      };
      activities: {
        Row: Activity;
        Insert: Partial<Activity> & Pick<Activity, "organization_id" | "actor_id" | "type" | "summary">;
        Update: Partial<Activity>;
        Relationships: [];
      };
      reminders: {
        Row: Reminder;
        Insert: Partial<Reminder> & Pick<Reminder, "organization_id" | "title" | "due_at">;
        Update: Partial<Reminder>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      organization_type: Organization["type"];
      sponsor_status: SponsorStatus;
      outreach_type: OutreachType;
    };
    CompositeTypes: Record<string, never>;
  };
}
