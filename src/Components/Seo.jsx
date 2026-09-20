import { useEffect } from "react";

const BASE_URL = "https://elrincondenopensar.netlify.app";

const setMeta = (attr, name, content) => {
  const selector =
    attr === "property"
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const Seo = ({ title, description, path = "/" }) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | El rincón de no pensar`
      : "El rincón de no pensar";
    const canonical = `${BASE_URL}${path}`;

    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonical);
  }, [title, description, path]);

  return null;
};

export default Seo;