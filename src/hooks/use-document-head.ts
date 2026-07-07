import { useEffect } from "react";

interface Head {
  title: string;
  description?: string;
  ogImage?: string;
}

export function useDocumentHead({ title, description, ogImage }: Head) {
  useEffect(() => {
    document.title = title;
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }
    setMeta("property", "og:title", title);
    setMeta("name", "twitter:title", title);
    if (ogImage) {
      setMeta("property", "og:image", ogImage);
      setMeta("name", "twitter:image", ogImage);
    }
  }, [title, description, ogImage]);
}
