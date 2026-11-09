import { Metadata } from "next";
import ListenAndReadClient from "./ListenAndReadClient";

export const metadata: Metadata = {
  title: "Listen & Read | The Inclusion Edit",
  description: "Podcast episodes and blog articles on equity, diversity and inclusion; from The Inclusion Edit.",
};

export default function ListenAndReadPage() {
  return <ListenAndReadClient />;
}
