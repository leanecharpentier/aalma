export type BlogArticle = {
  id: string;
  title: string;
  source: string;
  badge: string;
  image?: string;
};

// TODO: Replace with apiFetch<BlogArticle[]>("/dashboard/blog")
export async function fetchBlogArticles(): Promise<BlogArticle[]> {
  return [
    {
      id: "blog-1",
      title: "Charte nationale sante mentale",
      source: "28 aout 2026 - Gouvernement",
      badge: "Grande cause",
      image: "/images/home/blog-article.jpg",
    },
    {
      id: "blog-2",
      title: "Sante mentale au travail : les 4 grands constats 2025",
      source: "Janvier 2026 - Moka.care x GHU Paris",
      badge: "Article",
    },
    {
      id: "blog-3",
      title:
        "SISM 2025 — « Pour notre sante mentale, reparons le lien social »",
      source: "6-19 octobre 2025 - Semaines d'Information sur la Sante Mentale",
      badge: "Evenement",
    },
  ];
}
