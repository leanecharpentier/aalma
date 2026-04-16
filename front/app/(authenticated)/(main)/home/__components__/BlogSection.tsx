import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { BlogArticle } from "@/features/dashboard/actions/fetch-blog-articles";

interface BlogSectionProps {
  articles: BlogArticle[];
}

function Badge({ label }: { label: string }) {
  return (
    <span className="flex items-center w-fit border border-gray-500 rounded-full px-2 py-1 text-xs font-bold text-gray-500">
      {label}
    </span>
  );
}

function DiscoverLink() {
  return (
    <div className="flex items-center justify-end">
      <button
        type="button"
        className="flex items-center gap-1 p-1 rounded-full text-xs font-bold text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
      >
        Decouvrir
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}

function ArticleCardWithImage({ article }: { article: BlogArticle }) {
  return (
    <div className="flex flex-col gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3 h-89 w-68.5 shrink-0">
      <div className="relative flex-1 rounded-lg overflow-hidden">
        <Image
          src={article.image as string}
          alt="Article sante mentale"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-3.5">
        <Badge label={article.badge} />
        <div className="flex flex-col gap-2 text-gray-900">
          <h3 className="text-base font-bold">{article.title}</h3>
          <p className="text-xs">{article.source}</p>
        </div>
      </div>
      <DiscoverLink />
    </div>
  );
}

function ArticleCardText({ article }: { article: BlogArticle }) {
  return (
    <div className="flex flex-1 flex-col justify-between bg-gray-50 border border-gray-100 rounded-xl p-3 min-h-0">
      <div className="flex flex-col gap-3.5">
        <Badge label={article.badge} />
        <div className="flex flex-col gap-2 text-gray-900">
          <h3 className="text-base font-bold">{article.title}</h3>
          <p className="text-xs">{article.source}</p>
        </div>
      </div>
      <DiscoverLink />
    </div>
  );
}

export default function BlogSection({ articles }: BlogSectionProps) {
  const imageArticle = articles.find((a) => a.image);
  const textArticles = articles.filter((a) => !a.image);

  return (
    <div className="flex flex-1 flex-col gap-5 bg-gray-40 rounded-xl p-5 overflow-hidden shadow-card-light min-w-0">
      <h2 className="text-base font-bold text-gray-900">Blog</h2>

      <div className="flex flex-1 gap-5 min-h-0">
        {imageArticle && <ArticleCardWithImage article={imageArticle} />}

        <div className="flex flex-1 flex-col gap-5 min-w-0 min-h-0">
          {textArticles.map((article) => (
            <ArticleCardText key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
