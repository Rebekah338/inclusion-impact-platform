import { supabase } from "@/lib/supabase";
import FaqClient from "./FaqClient";

export const metadata = {
  title: "FAQ | The Inclusion Edit",
  description: "Answers to common questions about The Inclusion Edit's consultancy, training, bespoke resources and Impact Platform.",
};

export default async function FaqPage() {
  const { data: faqs } = await supabase
    .from("faqs")
    .select("*")
    .eq("active", true)
    .order("sort_order");

  const categories = faqs
    ? [...new Set(faqs.map((f: any) => f.category))]
    : [];

  const grouped = categories.map((cat) => ({
    category: cat,
    items: faqs?.filter((f: any) => f.category === cat) ?? [],
  }));

  return <FaqClient grouped={grouped} />;
}
