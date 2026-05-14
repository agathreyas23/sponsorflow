import { demoActivities, demoContacts, demoReminders, demoSponsors } from "@/lib/sample-data";
import { createClient } from "@/lib/supabase/server";
import type { Activity, Contact, Reminder, Sponsor } from "@/types/database";

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getWorkspaceData(): Promise<{
  sponsors: Sponsor[];
  contacts: Contact[];
  activities: Activity[];
  reminders: Reminder[];
}> {
  if (!hasSupabaseEnv()) {
    return {
      sponsors: demoSponsors,
      contacts: demoContacts,
      activities: demoActivities,
      reminders: demoReminders
    };
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      sponsors: demoSponsors,
      contacts: demoContacts,
      activities: demoActivities,
      reminders: demoReminders
    };
  }

  const { data: organizations } = await supabase.from("organizations").select("id").eq("owner_id", user.id).limit(1);
  const organizationId = organizations?.[0]?.id;

  if (!organizationId) {
    return {
      sponsors: [],
      contacts: [],
      activities: [],
      reminders: []
    };
  }

  const [sponsors, contacts, activities, reminders] = await Promise.all([
    supabase.from("sponsors").select("*").eq("organization_id", organizationId).order("position"),
    supabase.from("contacts").select("*").eq("organization_id", organizationId).order("updated_at", { ascending: false }),
    supabase.from("activities").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false }).limit(8),
    supabase
      .from("reminders")
      .select("*")
      .eq("organization_id", organizationId)
      .is("completed_at", null)
      .order("due_at", { ascending: true })
      .limit(8)
  ]);

  return {
    sponsors: sponsors.data ?? [],
    contacts: contacts.data ?? [],
    activities: activities.data ?? [],
    reminders: reminders.data ?? []
  };
}
