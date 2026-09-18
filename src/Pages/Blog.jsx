import React, { useState } from "react";
import Header from "../Components/Header";
import BlogPosts from "../Components/BlogPosts";
import FeaturedPost from "../Components/FeaturedPost";
import Posts from "../data/Posts.js";
import categoryColors from "../data/categoryColors.js";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { FiSearch, FiCheck } from "react-icons/fi";

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Blog"} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-8 mb-10">
          <div>
            <p className="font-['Cherry_Bomb_One'] text-blue-800/70 text-base tracking-wide">
              ~ apuntes, ideas y reflexiones ~
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-blue-950 mt-1 leading-tight">
              Artículos del rincón
            </h2>
            <p className="text-blue-900/60 mt-2 max-w-xl">
              Una colección de escritos sobre salud, viajes, finanzas y
              sostenibilidad para curiosear y aprender.
            </p>
          </div>
          <Button
            type={"violet"}
            onClickValue={() => navigate("/projects")}
            value={"Ver proyectos"}
          />
        </section>

        <section className="flex flex-col lg:flex-row lg:items-center gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                  selectedCategory === category
                    ? "bg-blue-800 text-white border-blue-800 shadow-md scale-105"
                    : "bg-white/70 text-blue-900/70 border-blue-900/10 hover:bg-white hover:border-blue-800/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative lg:ml-auto w-full lg:w-72">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-900/40" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar artículos..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/80 border border-blue-900/10 outline-none text-sm focus:ring-2 focus:ring-blue-500/40 placeholder:text-blue-900/40"
            />
          </div>
        </section>

        {showFeatured && (
          <section className="mb-8 lg:mb-10">
            <FeaturedPost post={featuredPost} />
          </section>
        )}

        {filteredPosts.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
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
            <p className="mt-5 text-lg font-bold text-blue-950">
              No hay artículos que coincidan con tu búsqueda
            </p>
            <p className="mt-1 text-blue-900/50">
              Prueba con otra palabra o selecciona otra categoría.
            </p>
          </section>
        )}

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
                  className="flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-3 text-white placeholder:text-blue-200/70 outline-none focus:ring-2 focus:ring-white/40"
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