/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "./supabase";
import { User, WebhookPayload } from "@/types/database";

export async function createUser(
  payload: WebhookPayload
): Promise<{ data: User[] | null; error: any }> {
  const { data, error } = await supabase
    .from("users")
    .insert([payload])
    .select();

  return { data, error };
}

export async function getUserById(
  id: string
): Promise<{ data: User | null; error: any }> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

export async function getAllUsers(): Promise<{
  data: User[] | null;
  error: any;
}> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
}
