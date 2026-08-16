import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, ArrowRight, ArrowUpDown, Megaphone, CalendarDays } from "lucide-react";

import {
  fetchEngagements,
  ENGAGEMENT_CATEGORIES,
  type EngagementCategory,
  type MappedArticle,
} from "../utils/strapi";

// Display metadata for each engagement category
const CATEGORY_INFO: Record<
  EngagementCategory,
  { title: string; icon: React.ComponentType<{ className?: string }> }
> = {
  announcement: {
    title: "Announcements",
    icon: Megaphone,
  },
  event: {
    title: "Events",
    icon: CalendarDays,
  },
};

function formatTimestamp(dateString: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

const AnnouncementsPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MappedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<EngagementCategory | "all">("all");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    document.title = "ReadyAI - Announcements & Events";
    const load = async () => {
      try {
        setLoading(true);
        const engagements = await fetchEngagements();
        setItems(engagements);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch announcements from Strapi:", err);
        setError("Failed to load announcements. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Only show category tabs that actually have content
  const categoriesWithContent = useMemo(
    () => ENGAGEMENT_CATEGORIES.filter((c) => items.some((i) => i.category === c)),
    [items]
  );

  const onSelect = (slug: string) => {
    navigate(`/insights/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>ReadyAI - Announcements & Events</title>
        <meta
          name="description"
          content="ReadyAI announcements, press features, and events."
        />
      </Helmet>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-28 pb-14 md:pt-36 md:pb-18">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-6">
                Announcements & <span className="text-accent">Events</span>
              </h1>
              <p className="text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
                Where to find ReadyAI next — announcements, press features, and events
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading announcements...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No announcements or events yet. Check back soon.</p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            {/* Filter + Sort Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-14">
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {(["all", ...categoriesWithContent] as (EngagementCategory | "all")[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-200 ${
                      activeCategory === category
                        ? "bg-primary text-white shadow-md"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-accent hover:text-accent"
                    }`}
                  >
                    {category === "all" ? "All" : CATEGORY_INFO[category].title}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-center md:justify-end gap-2 shrink-0">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
                  {([
                    { value: "desc", label: "Newest" },
                    { value: "asc", label: "Oldest" },
                  ] as { value: "desc" | "asc"; label: string }[]).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortOrder(option.value)}
                      className={`px-4 py-1.5 rounded-full font-sans font-semibold text-sm transition-all duration-200 ${
                        sortOrder === option.value
                          ? "bg-primary text-white shadow-sm"
                          : "text-gray-600 hover:text-accent"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grouped by category */}
            {categoriesWithContent
              .filter((category) => activeCategory === "all" || category === activeCategory)
              .map((category) => {
                const categoryItems = items
                  .filter((i) => i.category === category)
                  .sort((a, b) => {
                    const diff =
                      new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime();
                    return sortOrder === "asc" ? diff : -diff;
                  });
                if (categoryItems.length === 0) return null;
                const info = CATEGORY_INFO[category];
                const Icon = info.icon;
                return (
                  <section key={category} className="mb-16 last:mb-0 scroll-mt-28">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl md:text-3xl font-normal text-primary">
                          {info.title}
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categoryItems.map((item) => (
                        <EngagementCard key={item.id} item={item} onSelect={onSelect} />
                      ))}
                    </div>
                  </section>
                );
              })}
          </>
        )}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-medium text-white mb-6">
            Want to connect with the ReadyAI team?
          </h2>
          <p className="font-sans text-lg text-white/90 mb-8 leading-relaxed">
            Catch us at an upcoming event, or book time to talk through your enterprise AI strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://meetings-na2.hubspot.com/carol-eastman" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-sans font-semibold hover:bg-accent-dark transition-all shadow-lg hover:shadow-xl">
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Card for a single engagement item
const EngagementCard: React.FC<{ item: MappedArticle; onSelect: (slug: string) => void }> = ({
  item,
  onSelect,
}) => {
  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {item.imgURL && (
        <div className="relative overflow-hidden">
          <img
            src={item.imgURL}
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatTimestamp(item.publicationDate)}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.description}</p>

        <button
          onClick={() => onSelect(item.slug)}
          className="mt-auto inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors duration-200 group/btn"
        >
          Learn More
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </article>
  );
};

export default AnnouncementsPage;
