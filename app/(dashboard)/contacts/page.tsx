import { ContactsManager } from "@/components/contacts/contacts-manager";
import { getWorkspaceData } from "@/lib/data";

export default async function ContactsPage() {
  const { contacts } = await getWorkspaceData();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Relationship management</p>
        <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">Contacts</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track partner relationships, notes, and activity history.</p>
      </div>
      <ContactsManager contacts={contacts} />
    </div>
  );
}
