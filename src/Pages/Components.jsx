import React from "react";
import Footer from "../Components/Footer";
import ListItems from "../Components/ListItems";
import PageIntro from "../Components/PageIntro";
import menuItems from "../data/MenuItems";
import HiperLink from "../Components/HiperLink";

const Components = () => {
  return (
    <div className="texture-grain min-h-screen bg-blues-100">
      <main className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
        <PageIntro
          tagline={"~ piezas sueltas ~"}
          title={"Componentes"}
          description={
            "Algunos componentes de React sueltos que tengo esperanza de reciclar algún día. La mayoría de componentes de esta página no aparecen en esta sección (el sidebar, el botón...), pero siempre puedes echales un vistazo en el repositorio de la web."
          }
          backTo={"/"}
          backLabel={"Volver al inicio"}
        />
        <div className="mb-8 w-full text-center md:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-5 py-2 text-sm font-semibold text-ink/70 backdrop-blur-sm">
            ¿Quieres ver el código?{" "}
            <HiperLink
              href={"https://github.com/irenealcaine/el-rincon-de-no-pensar"}
              text={"Repositorio"}
            />
          </span>
        </div>
        <ListItems mapItems={menuItems[1].links} />
      </main>
      <Footer />
    </div>
  );
};

export default Components;