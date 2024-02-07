import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { client } from "../lib/createClient";

export const Home = () => {
  // ciclo de vida de componentes
  // posso escrever JavaScript
  useEffect(() => {
    // Pedir para o objeto client buscar os últimos 5 posts
    client
      .getEntries({
        content_type: 'blogPost',
      })
      .then(function (entries) {
        console.log('posts', entries.items);
        // setCategories(entries.items);
      });

    // Pedir para o objeto client buscar todas as categorias
    client
      .getEntries({
        content_type: 'blogCategory',
      })
      .then(function (entries) {
        console.log('categorias', entries.items);
        // setCategories(entries.items);
      });
  }, []); // array vazio indica o onload do componente

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <main className="col-md-8">
            <h1 className="my-3">Últimos posts</h1>

            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Titulo do post</h5>
                <p className="card-text">Descrição do post</p>
              </div>
            </div>

            <a href="#" className='btn btn-primary'>Ver todos os posts</a>
          </main>
      
          <aside className="col-md-4">
            <h2>Categorias</h2>
            <ul>
              <li>Título da categoria</li>
            </ul>
          </aside>
        </div>
      </div>
    </Layout>
  )
}