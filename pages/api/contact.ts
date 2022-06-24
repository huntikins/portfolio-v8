// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;

    const { data, error } = await supabase.from("messages").insert(body);

    if (!error) {
      res.status(200).json(data)
    } else {
      res.status(500).json(error)
    }
  } else {
    
  }
}
