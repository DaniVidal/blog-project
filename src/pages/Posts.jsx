import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { client } from "../lib/createClient";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Pagination } from 'react-bootstrap';

export const Posts = () => {
    const [categories, setCategories] = useState([]); // retorna um array
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ciclo de vida de componentes
    // posso escrever JavaScript
    useEffect(() => {
        // Pedir para o objeto client buscar os últimos 5 posts
        client
            .getEntries({
                content_type: 'blogPost',
                limit: 5,
                skip: (currentPage - 1) * 5,
                order: "-sys.createdAt"
            })
            .then(function (entries) {
                console.log('posts', entries.items);
                setPosts(entries.items);
                setTotalPages(Math.ceil(entries.total / 5));
            });

        // Pedir para o objeto client buscar todas as categorias
        client
            .getEntries({
                content_type: 'blogCategory',
            })
            .then(function (entries) {
                console.log('categorias', entries.items);
                setCategories(entries.items);
            });
    }, [currentPage]); // array vazio indica o onload do componente

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <main className="col-md-8">
                        <h1 className="my-3">Todos os posts</h1>

                        {posts.map(post => (
                            <div className="card mb-3" key={post.sys.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{post.fields.postTitle}</h5>
                                    <p className="card-text">{post.fields.postDescription}</p>
                                    <Link to={`/post/${post.fields.postSlug}`} className="card-link">
                                        Ver post
                                    </Link>
                                </div>
                            </div>
                        ))}
                        
                        <Pagination>
                            {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                            ))}
                        </Pagination>
                        <Link to="/" className="btn btn-primary">
                            Voltar para Home
                        </Link>
                    </main>
                
                    <aside className="col-md-4">
                        <h2>Categorias</h2>
                        <Container>
                            {categories.map(category => (
                                <Row key={category.sys.id}>
                                    <Col>
                                        <Button variant="link">
                                            {category.fields.categoryTitle}
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </Container>
                    </aside>
                </div>
            </div>
        </Layout>
    )
}