import type { Product } from "../../models";
import ProductCard from "./ProductCard";

export default function ProductList() {
  return (
    <section className="grid grid-cols-3 gap-4 mt-10 p-5">
      {data.map((curr) => (
        <ProductCard
          key={curr.name}
          name={curr.name}
          description={curr.description}
          price={curr.price}
        />
      ))}
    </section>
  );
}

const data: Product[] = [
  {
    name: "Landing Page Design",
    description:
      "Design and implementation of a conversion-focused, responsive landing page with basic animations.",
    price: 350,
  },
  {
    name: "Corporate Website (5 pages)",
    description:
      "Complete company website up to 5 pages, light CMS integration, basic SEO and deployment guidance.",
    price: 1200,
  },
  {
    name: "E‑commerce Store Setup",
    description:
      "Full online store setup (Shopify or WooCommerce), payment configuration and initial product import.",
    price: 2800,
  },
  {
    name: "Single‑Page App (React/Vue)",
    description:
      "Development of an interactive SPA with routing, state management and basic unit tests.",
    price: 2200,
  },
  {
    name: "Backend API (Node/Express)",
    description:
      "Secure RESTful API with authentication, OpenAPI documentation and deployment-ready configuration.",
    price: 1800,
  },
  {
    name: "Mobile App Prototype (Figma)",
    description:
      "Clickable mobile prototype with user flows, interactive screens and usability notes in Figma.",
    price: 800,
  },
  {
    name: "UI/UX Design Kit",
    description:
      "Complete UI kit: components, style guide, desktop and mobile mockups, and design tokens.",
    price: 900,
  },
  {
    name: "Logo Design",
    description:
      "Vector logo creation with color and monochrome variants, plus source files (SVG, AI, PNG).",
    price: 600,
  },
  {
    name: "Brand Identity Package",
    description:
      "Full brand kit including logo, color palette, typography rules and usage guidelines.",
    price: 1200,
  },
  {
    name: "Explainer Motion Graphics (60s)",
    description:
      "60-second animated explainer with storyboard, optional voiceover and royalty-free music.",
    price: 1500,
  },
  {
    name: "Video Editing (up to 10 min)",
    description:
      "Editing, color grading and audio mixing for a video up to 10 minutes, delivered MP4.",
    price: 400,
  },
  {
    name: "Photo Retouching (per image)",
    description:
      "Professional image retouch: color correction, object removal and web optimization.",
    price: 40,
  },
  {
    name: "SEO Audit & Recommendations",
    description:
      "Technical and content SEO audit with prioritized action list to improve organic visibility.",
    price: 450,
  },
  {
    name: "Web Performance Optimization",
    description:
      "Performance audit (Lighthouse), critical fixes: caching, lazy loading and bundle splitting.",
    price: 500,
  },
  {
    name: "Accessibility Audit (WCAG AA)",
    description:
      "Accessibility review, report of issues and remediation plan to reach WCAG AA compliance.",
    price: 650,
  },
  {
    name: "Content Writing (5 pages)",
    description:
      "SEO-friendly copywriting for five pages (home, services, about, contact, blog intro).",
    price: 350,
  },
  {
    name: "Technical Documentation (API + Guides)",
    description:
      "Comprehensive API documentation with examples, integration guides and code snippets.",
    price: 900,
  },
  {
    name: "Social Media Kit (3 templates)",
    description:
      "Three editable social templates plus three banner images sized for major platforms.",
    price: 300,
  },
];
