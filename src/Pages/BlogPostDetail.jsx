import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import BlogPosts from "../Components/BlogPosts";
import BackButton from "../Components/BackButton";
import Posts from "../data/Posts";
import categoryColors from "../data/categoryColors";
import { FiArrowLeft, FiArrowRight, FiSearch } from "react-icons/fi";

const BlogPostDetail = () => {
  const { id } = useParams();
  const post = Posts.find((post) => post.id === parseInt(id));
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="bg-blue-100 min-h-screen">
        <Header title={"Post no encontrado"} />
        <main className="max-w-2xl mx-auto px-4 md:px-8 pb-16 text-center">
          <div className="mx-auto mt-10 w-16 h-16 rounded-2xl bg-white/70 border border-blue-900/10 flex items-center justify-center text-blue-800/60">
            <FiSearch size={26} />
          </div>
          <p className="mt-5 text-2xl font-bold text-blue-900">
            Lo sentimos, no existe ningún post con ese identificador.
          </p>
          <BackButton to={"/projects/blog"} className="mt-6">
            Volver al blog
          </BackButton>
        </main>
        <Footer />
      </div>
    );
  }

  const prevPost = post.id - 1 > 0 ? Posts.find((p) => p.id === post.id - 1) : null;
  const nextPost =
    post.id + 1 <= Posts.length ? Posts.find((p) => p.id === post.id + 1) : null;

  const relatedPosts = Posts.filter(
    (p) =>
      p.id !== post.id &&
      p.categories.some((category) => post.categories.includes(category))
  ).slice(0, 3);

  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Blog"} />

      <main className="max-w-3xl mx-auto px-4 md:px-8 pb-16">
        <BackButton to={"/projects/blog"} className="mt-8">
          Volver al blog
        </BackButton>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                categoryColors[category] || "bg-white text-blue-900 border border-blue-900/10"
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-3xl md:text-5xl font-black text-blue-900 leading-tight">
          {post.title}
        </h1>
        <p className="mt-2 font-bold text-blue-900/50">{post.subtitle}</p>

        <img
          src={post.imageUrl}
          alt={post.title}
          className="mt-8 w-full max-h-[28rem] object-cover rounded-3xl shadow-xl"
        />

        <div className="mt-8 rounded-3xl bg-white/80 border border-blue-900/10 p-6 md:p-10 shadow-sm backdrop-blur-sm">
          <p className="text-blue-900 leading-loose md:text-lg indent-8">
            {post.excerpt}
          </p>
        </div>

        {(prevPost || nextPost) && (
          <nav className="mt-10 flex flex-col sm:flex-row gap-4">
            {prevPost && (
              <Link
                to={`/post/${prevPost.id}`}
                className="group flex-1 rounded-2xl bg-white border border-blue-900/10 p-5 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center gap-1 text-xs font-bold text-blue-900/50 uppercase">
                  <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                  Anterior
                </span>
                <span className="mt-2 block font-bold text-blue-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {prevPost.title}
                </span>
              </Link>
            )}
            {nextPost && (
              <Link
                to={`/post/${nextPost.id}`}
                className="group flex-1 rounded-2xl bg-white border border-blue-900/10 p-5 shadow-md hover:shadow-xl transition-all duration-300 text-right"
              >
                <span className="flex items-center gap-1 justify-end text-xs font-bold text-blue-900/50 uppercase">
                  Siguiente
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="mt-2 block font-bold text-blue-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </main>

      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
          <h2 className="font-['Cherry_Bomb_One'] text-2xl md:text-3xl text-blue-900 mb-6">
            Artículos relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {relatedPosts.map((related) => (
              <BlogPosts
                key={related.id}
                title={related.title}
                subtitle={related.subtitle}
                excerpt={related.excerpt}
                imageUrl={related.imageUrl}
                postUrl={related.postUrl}
                categories={related.categories}
                categoryColors={categoryColors}
              />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostDetail;