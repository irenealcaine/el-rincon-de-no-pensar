import React from "react";
import Header from "../Components/Header";
import Subtitle from "../Components/Subtitle";
import HiperLink from "../Components/HiperLink";
import menuItems from "../data/MenuItems";
import ListItems from "../Components/ListItems";
import Footer from "../Components/Footer";
import Seo from "../Components/Seo";

const Home = () => {
  const introduction1 = `Bienvenidos a 'El Rincón de no pensar', una web donde se encuentran proyectos pequeños pero llenos de encanto, todos ellos hechos con React y Tailwind. Aquí, presento una colección de creaciones modestas que, aunque demasiado pequeñas para tener su propio sitio web, merecen ser apreciadas y compartidas.`;

  return (
    <div className="texture-grain min-h-screen bg-blue-100">
      <Seo
        title="Proyectos, juegos y componentes con React"
        description="El rincón de no pensar: proyectos, juegos, componentes de React y artículos para desconectar, hechos con React y Tailwind."
      />
      <Header title={"El rincón de no pensar"} />

      <main className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
        <Subtitle subtitle={introduction1} />

        <section className="mb-16">
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-ink/20 md:w-16" />
            <h2 className="font-oswald text-sm font-bold uppercase tracking-[0.25em] text-ink/80">
              Explora el rincón
            </h2>
            <span className="h-px w-10 bg-ink/20 md:w-16" />
          </div>
          <ListItems mapItems={menuItems} />
        </section>

        <section className="mx-auto max-w-2xl rounded-2xl border-2 border-ink/10 bg-white/70 p-6 text-center shadow-card backdrop-blur-sm md:p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-clay-dark">
            Más allá del rincón
          </p>

          <p className="mt-4 text-ink-soft">
            Todo el código está disponible en{" "}
            <HiperLink
              href={"https://github.com/irenealcaine/el-rincon-de-no-pensar"}
              text={"Github"}
            />
            , siéntete libre de curiosear.
          </p>

          <div className="mx-auto my-5 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-ink/15" />
            <span className="h-1.5 w-1.5 rotate-45 bg-clay" />
            <span className="h-px w-16 bg-ink/15" />
          </div>

          <p className="text-ink-soft">
            Échale un ojo también a mi{" "}
            <HiperLink
              href={"https://irenealcainealvarez.es/"}
              text={"web personal"}
            />
            .
          </p>

          <p className="mt-4 text-ink-soft">
            Contacto:{" "}
            <HiperLink
              href={"mailto:irenealcainealvarez@gmail.com"}
              text={"irenealcainealvarez@gmail.com"}
            />
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;