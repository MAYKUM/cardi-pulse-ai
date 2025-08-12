import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface AIAnalysisChatProps {
  specialty: "cardiology" | "neurology" | "general-medicine" | "ophthalmology";
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

const suggestions: Record<AIAnalysisChatProps["specialty"], string[]> = {
  cardiology: [
    "Chest pain risk stratification (40M, exertional)",
    "Interpret borderline ECG with T-wave inversions",
    "Lipid management: LDL 170 mg/dL, 55F",
    "Pre-op cardiac evaluation before surgery",
  ],
  neurology: [
    "First-time seizure evaluation in adult",
    "Migraine vs. TIA red flags",
    "Acute unilateral weakness workup",
    "Parkinsonism initial management",
  ],
  "general-medicine": [
    "Hypertension workup: persistent 150/95",
    "Diabetes screening plan (BMI 32)",
    "Thyroid nodule evaluation basics",
    "Vaccination catch-up for adult",
  ],
  ophthalmology: [
    "Glaucoma risk assessment from IOP and OCT RNFL",
    "Cataract surgery workup and IOL selection basics",
    "Diabetic retinopathy screening thresholds",
    "Red eye differential: urgent vs routine",
  ],
};

const titles: Record<AIAnalysisChatProps["specialty"], string> = {
  cardiology: "Cardiology AI Analysis",
  neurology: "Neurology AI Analysis",
  "general-medicine": "General Medicine AI Analysis",
  ophthalmology: "Ophthalmology AI Analysis",
};

const descriptions: Record<AIAnalysisChatProps["specialty"], string> = {
  cardiology: "Ask cardiology-focused questions and get guideline-aware answers.",
  neurology: "Ask neurology-focused questions with careful localization & red flags.",
  "general-medicine": "Primary care guidance for assessment, workup, and management.",
  ophthalmology: "Ophthalmology-focused guidance for imaging, screening, and management.",
};

export default function AIAnalysisChat({ specialty }: AIAnalysisChatProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploaded, setUploaded] = useState<{ name: string; path: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // SEO: title, meta description, canonical
  useEffect(() => {
    const title = `${titles[specialty]} | Clinician Portal`;
    document.title = title;

    const desc = descriptions[specialty];
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }, [specialty]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  const suggestionList = useMemo(() => suggestions[specialty], [specialty]);

  const addMessage = (role: ChatMessage["role"], content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role, content, createdAt: Date.now() },
    ]);
  };

  const handleUpload = async () => {
    if (!user) {
      toast({ title: "Login required", description: "Please sign in to upload documents.", variant: "destructive" });
      return;
    }
    if (!files.length) return;

    try {
      const uploadedMeta: { name: string; path: string }[] = [];
      for (const f of files) {
        const path = `${user.id}/${Date.now()}-${f.name}`;
        const { error } = await supabase.storage.from("medical-docs").upload(path, f, {
          upsert: false,
          contentType: f.type || undefined,
        });
        if (error) throw error;
        uploadedMeta.push({ name: f.name, path });
      }
      setUploaded(uploadedMeta);
      setFiles([]);
      toast({ title: "Uploaded", description: `${uploadedMeta.length} file(s) uploaded.` });
    } catch (e) {
      console.error(e);
      toast({ title: "Upload failed", description: e instanceof Error ? e.message : "Try again.", variant: "destructive" });
    }
  };

  const send = async (content?: string) => {
    const text = (content ?? input).trim();
    if (!text) return;
    addMessage("user", text);
    setInput("");
    setIsSending(true);

    try {
      const { data, error } = await supabase.functions.invoke("medical-ai-chat", {
        body: {
          message: text,
          specialty,
          files: uploaded,
        },
      });
      if (error) throw error;
      const reply = (data as any)?.reply ?? "Sorry, I couldn't generate a response.";
      addMessage("assistant", reply);
    } catch (e) {
      console.error(e);
      addMessage("assistant", "There was an error contacting the AI. Please set the API key in Supabase Edge Function secrets and try again.");
      toast({ title: "AI error", description: e instanceof Error ? e.message : "Missing API key?", variant: "destructive" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl p-4 md:p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">{titles[specialty]}</h1>
        <p className="text-muted-foreground text-sm">{descriptions[specialty]}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-[1fr,320px]">
        <Card className="order-2 md:order-1">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={scrollRef} className="h-[52vh] md:h-[56vh] overflow-y-auto rounded-md border p-3 bg-background/50">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm mt-6">Ask a question to get started.</div>
              ) : (
                <div className="space-y-4">
                  {messages.map((m) => (
                    <article key={m.id} className={cn("rounded-md p-3", m.role === "user" ? "bg-accent/40" : "bg-secondary/40")}> 
                      <div className="text-xs text-muted-foreground mb-1">{m.role === "user" ? "You" : "Assistant"}</div>
                      <div className="prose prose-sm max-w-none whitespace-pre-wrap">{m.content}</div>
                    </article>
                  ))}
                  {isSending && (
                    <div className="text-sm text-muted-foreground">Thinking…</div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your medical question…"
                className="min-h-[80px]"
              />
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    aria-label="Upload documents"
                  />
                  <Button size="sm" variant="outline" onClick={handleUpload} disabled={!files.length}>
                    Upload
                  </Button>
                </div>
                <Button onClick={() => send()} disabled={isSending}>
                  Send
                </Button>
              </div>
              {uploaded.length > 0 && (
                <div className="text-xs text-muted-foreground">Attached: {uploaded.map((u) => u.name).join(", ")}</div>
              )}
            </div>
          </CardContent>
        </Card>

        <aside className="order-1 md:order-2">
          <Card>
            <CardHeader>
              <CardTitle>Common questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {suggestionList.map((s) => (
                  <Button key={s} variant="outline" className="justify-start" onClick={() => send(s)}>
                    {s}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>

      <section className="sr-only">
        <h2>AI Analysis for {specialty}</h2>
      </section>
    </main>
  );
}
