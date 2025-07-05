import { supabase } from "../api/supabaseClient";

export const boardMembersLoader = async () => {
  try {
    const { data, error } = await supabase.from("board_members").select("*");
    if (error) {
      throw new Response("Failed to fetch board members", { status: 500 });
    }
    return data;
  } catch (error) {
    console.error("Error loading board members:", error);
    return [];
  }
};
