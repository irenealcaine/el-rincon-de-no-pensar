import React, { useRef, useState } from "react";
import BlogPosts from "../Components/BlogPosts";
import FeaturedPost from "../Components/FeaturedPost";
import PageIntro from "../Components/PageIntro";
import Paginator from "../Components/Paginator";
import Posts from "../data/Posts.js";
import categoryColors from "../data/categoryColors.js";
import Footer from "../Components/Footer";
import { FiSearch, FiCheck } from "react-icons/fi";

const PAGE_SIZE = 3;

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const gridRef = useRef(null);

  const featuredPost = Posts.find((post) => post.featured);
  const otherPosts = Posts.filter((post) => !post.featured);

  const categories = [
    "Todos",
    ...new Set(Posts.flatMap((post) => post.categories)),
  ];

  const matchesFilters = (post) => {
    const matchesCategory =
      selectedCategory === "Todos" || post.categories.includes(selectedCategory);
    const matchesSearch = `${post.title} ${post.subtitle}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  };

  const showFeatured = featuredPost && matchesFilters(featuredPost);
  const filteredPosts = otherPosts.filter(matchesFilters);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="bg-blue-100 min-h-screen">

      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <PageIntro
          tagline={"~ apuntes, ideas y reflexiones ~"}
          title={"Artículos del rincón"}
          description={
            "Una colección de escritos sobre salud, viajes, finanzas y sostenibilidad para curiosear y aprender."
          }
          backTo={"/projects"}
          backLabel={"Ver proyectos"}
        />

        <section className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
          <div className="w-full lg:hidden">
            <label htmlFor="blog-category" className="sr-only">
              Filtrar por categoría
            </label>
            <select
              id="blog-category"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full rounded-full bg-white/80 border border-blue-900/10 px-4 py-2.5 text-sm font-bold text-blue-900 outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden lg:flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                  selectedCategory === category
                    ? "bg-blue-800 text-white border-blue-800 shadow-md scale-105"
                    : "bg-white/70 text-blue-900/80 border-blue-900/10 hover:bg-white hover:border-blue-800/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative lg:ml-auto w-full lg:w-72">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-900/80" />
            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Buscar artículos..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/80 border border-blue-900/10 outline-none text-sm focus:ring-2 focus:ring-blue-500/40 placeholder:text-blue-900/80"
            />
          </div>
        </section>

        {showFeatured && (
          <section className="mb-8 lg:mb-10">
            <FeaturedPost post={featuredPost} />
          </section>
        )}

        {filteredPosts.length > 0 ? (
          <section
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 scroll-mt-24"
          >
            {paginatedPosts.map((post) => (
              <BlogPosts
                key={post.id}
                title={post.title}
                subtitle={post.subtitle}
                excerpt={post.excerpt}
                imageUrl={post.imageUrl}
                postUrl={post.postUrl}
                categories={post.categories}
                categoryColors={categoryColors}
              />
            ))}
          </section>
        ) : (
          <section className="text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-white/70 border border-blue-900/10 flex items-center justify-center text-blue-800/60">
              <FiSearch size={26} />
            </div>
            <p className="mt-5 text-lg font-bold text-blue-900">
              No hay artículos que coincidan con tu búsqueda
            </p>
            <p className="mt-1 text-blue-900/80">
              Prueba con otra palabra o selecciona otra categoría.
            </p>
          </section>
        )}

        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <section className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 to-blue-700 p-8 md:p-12 text-white shadow-xl">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="relative">
            <p className="font-['Cherry_Bomb_One'] text-2xl md:text-3xl">
              ¿Te gusta lo que lees?
            </p>
            <p className="mt-2 max-w-lg text-blue-100">
              Suscríbete para recibir los nuevos artículos del rincón
              directamente en tu correo. Sin spam, prometido.
            </p>
            {subscribed ? (
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/15 border border-white/20 px-5 py-4 backdrop-blur-sm max-w-md">
                <FiCheck className="shrink-0 text-emerald-300" size={22} />
                <p className="font-bold">
                  ¡Gracias! Revisa tu correo para confirmar la suscripción.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-3 text-white placeholder:text-blue-100/90 outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white text-blue-900 font-bold px-6 py-3 hover:bg-blue-50 transition active:scale-95"
                >
                  Suscribirme
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;