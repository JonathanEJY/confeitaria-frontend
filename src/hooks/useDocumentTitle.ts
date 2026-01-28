import { useEffect } from "react";

export default function useDocumentTitle(title: string) {
  useEffect(() => {
    if (!title) return;

    document.title = title;
  }, [title]);
}
