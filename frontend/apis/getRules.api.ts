import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { TRuleResponse } from "~~/types/apis";
import { createClient } from "~~/utils/supabase/client";

export const getRules = async (): Promise<PostgrestSingleResponse<TRuleResponse[]>> => {
  const supabase = createClient();
  const response = await supabase.from("rule").select("*");
  return response;
};
