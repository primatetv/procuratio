import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { client, urlFor } from '../sanity';

const Insights = () => {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const currentLang = i18n.language || 'es';

        // Fetch posts from Sanity, filtering by the current language
        const query = `*[_type == "post" && (language == $lang || (!defined(language) && $lang == 'es'))] | order(publishedAt desc) { 
            _id, title, slug, publishedAt, mainImage, categories[]->{title}, body 
        }`;

        client.fetch(query, { lang: currentLang })
            .then((data) => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setIsLoading(false);
            });
    }, [i18n.language]);

    // Fallback images and categories if missing from Sanity
    const fallbackImages = [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
    ];

    const generateExcerpt = (title) => {
        return `Descubre más leyendo nuestro artículo completo sobre "${title}". Haz clic para seguir leyendo.`;
    };

    return (
        <div className="insights-page bg-white min-h-screen pb-20">
            {/* HEADER SECTION */}
            <div className="bg-white pt-24 pb-12 border-b border-gray-100">
                <div className="container px-4 max-w-7xl mx-auto">
                    {/* Breadcrumb / Back Link */}
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--color-primary)] mb-6 transition-colors font-semibold tracking-wide uppercase text-sm group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {t('nav.home')} / {t('insights.title')}
                    </Link>

                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-4 leading-tight tracking-tight">
                            {t('insights.title')}
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed max-w-3xl">
                            Explora nuestras últimas publicaciones, análisis y noticias del sector, traídas a ti directamente desde nuestro panel editorial.
                        </p>
                    </div>
                </div>
            </div>

            {/* BLOG GRID */}
            <div className="container px-4 max-w-7xl mx-auto mt-12">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-2xl text-gray-500">No hay artículos publicados aún.</h3>
                        <p className="mt-2 text-gray-400">Entra a tu Sanity Studio (localhost:3333) y crea el primer artículo.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => {
                            const postImageUrl = post.mainImage ? urlFor(post.mainImage).width(800).url() : fallbackImages[index % fallbackImages.length];
                            const postDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Proximamente';
                            const category = post.categories && post.categories.length > 0 ? post.categories[0].title : 'General';

                            return (
                                <Link to={`/insights/${post.slug.current}`} key={post._id} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 cursor-pointer group">
                                    <div className="h-64 overflow-hidden">
                                        <img
                                            src={postImageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-8 flex-grow flex flex-col">
                                        <div className="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-wider">
                                            <span className="text-[var(--color-primary)]">{category}</span>
                                            <span className="text-gray-400">{postDate}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                                            {generateExcerpt(post.title)}
                                        </p>

                                        <div className="mt-auto flex items-center font-bold text-[var(--color-primary)] text-sm uppercase tracking-wide">
                                            Leer artículo <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Insights;
