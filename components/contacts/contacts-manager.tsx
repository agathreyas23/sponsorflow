"use client";

import { useMemo, useState } from "react";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Contact } from "@/types/database";

const blank = {
  name: "",
  email: "",
  linkedin_url: "",
  title: "",
  company: "",
  notes: ""
};

export function ContactsManager({ contacts: initialContacts }: { contacts: Contact[] }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(blank);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return contacts.filter((contact) =>
      [contact.name, contact.email, contact.company, contact.title].filter(Boolean).join(" ").toLowerCase().includes(needle)
    );
  }, [contacts, query]);

  function startEdit(contact: Contact) {
    setEditingId(contact.id);
    setForm({
      name: contact.name,
      email: contact.email ?? "",
      linkedin_url: contact.linkedin_url ?? "",
      title: contact.title ?? "",
      company: contact.company ?? "",
      notes: contact.notes ?? ""
    });
  }

  function reset() {
    setEditingId(null);
    setForm(blank);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) return;

    if (editingId) {
      void fetch(`/api/contacts/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          email: form.email || null,
          linkedin_url: form.linkedin_url || null,
          title: form.title || null,
          company: form.company || null,
          notes: form.notes || null
        })
      });
      setContacts((current) =>
        current.map((contact) =>
          contact.id === editingId
            ? {
                ...contact,
                ...form,
                email: form.email || null,
                linkedin_url: form.linkedin_url || null,
                title: form.title || null,
                company: form.company || null,
                notes: form.notes || null,
                updated_at: new Date().toISOString()
              }
            : contact
        )
      );
    } else {
      void fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          email: form.email || null,
          linkedin_url: form.linkedin_url || null,
          title: form.title || null,
          company: form.company || null,
          notes: form.notes || null
        })
      });
      setContacts((current) => [
        {
          id: crypto.randomUUID(),
          organization_id: "local",
          sponsor_id: null,
          name: form.name,
          email: form.email || null,
          linkedin_url: form.linkedin_url || null,
          title: form.title || null,
          company: form.company || null,
          notes: form.notes || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        ...current
      ]);
    }

    reset();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search by name, company, title, or email" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <Button variant="secondary" onClick={reset}>
            <Plus />
            New contact
          </Button>
        </div>
        <div className="grid gap-3">
          {filtered.map((contact) => (
            <Card key={contact.id} className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[contact.title, contact.company].filter(Boolean).join(" at ") || "No role added"}
                  </p>
                  <p className="mt-2 text-sm">{contact.email ?? "No email"}</p>
                  {contact.notes ? <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{contact.notes}</p> : null}
                  <div className="mt-3 text-xs text-muted-foreground">Last activity {new Date(contact.updated_at).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" aria-label={`Edit ${contact.name}`} onClick={() => startEdit(contact)}>
                    <Edit3 />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${contact.name}`}
                    onClick={() => {
                      void fetch(`/api/contacts/${contact.id}`, { method: "DELETE" });
                      setContacts((current) => current.filter((item) => item.id !== contact.id));
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Card className="h-fit p-5">
        <h2 className="text-base font-semibold">{editingId ? "Edit contact" : "Add contact"}</h2>
        <form className="mt-4 space-y-4" onSubmit={submit}>
          <Field label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} required />
          <Field label="Email" type="email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
          <Field label="Company" value={form.company} onChange={(value) => setForm((current) => ({ ...current, company: value }))} />
          <Field label="Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} />
          <Field label="LinkedIn" value={form.linkedin_url} onChange={(value) => setForm((current) => ({ ...current, linkedin_url: value }))} />
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
          </div>
          <div className="flex gap-2">
            <Button type="submit">{editingId ? "Save changes" : "Add contact"}</Button>
            <Button type="button" variant="ghost" onClick={reset}>
              Clear
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
    </div>
  );
}
