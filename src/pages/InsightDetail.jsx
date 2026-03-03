import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { client, urlFor } from '../sanity';
import { PortableText } from '@portabletext/react';

const InsightDetail = () => {
    const { id } = useParams(); // Using `id` as the slug parameter from the router
    const { t, i18n } = useTranslation();

    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        const currentLang = i18n.language || 'es';

        const query = `*[_type == "post" && slug.current == $slug && (language == $lang || (!defined(language) && $lang == 'es'))][0]{
            title,
            publishedAt,
            mainImage,
            body,
            categories[]->{title},
            author->{name, "imageUrl": image.asset->url}
        }`;

        client.fetch(query, { slug: id, lang: currentLang })
            .then((data) => {
                setArticle(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch article", err);
                setIsLoading(false);
            });

    }, [id, i18n.language]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Enlace copiado al portapapeles');
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-white">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Artículo no encontrado</h2>
                <Link to="/insights" className="text-[var(--color-primary)] hover:underline flex items-center">
                    <ArrowLeft size={16} className="mr-2" /> Volver al blog
                </Link>
            </div>
        );
    }

    // Default fallbacks in case data is partial
    const authorName = article.author?.name || "Equipo Procuratio";
    const authorRole = "Redacción";
    const authorImage = article.author?.imageUrl || "https://ui-avatars.com/api/?name=EP&background=1D1740&color=fff";
    const postDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Reciente";
    const category = article.categories && article.categories.length > 0 ? article.categories[0].title : "General";

    const fallbackImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000";
    const coverImage = article.mainImage ? urlFor(article.mainImage).width(2000).url() : fallbackImage;

    // Portable Text Custom components to apply styles to Sanity content
    const ptComponents = {
        types: {
            image: ({ value }) => {
                if (!value?.asset?._ref) return null;
                return (
                    <img
                        alt={value.alt || 'article image'}
                        loading="lazy"
                        src={urlFor(value).width(800).fit('max').auto('format')}
                        className="rounded-xl my-8 shadow-md"
                    />
                );
            }
        },
        marks: {
            link: ({ children, value }) => {
                const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
                return (
                    <a href={value.href} rel={rel} target="_blank" className="text-[var(--color-gold)] hover:underline">
                        {children}
                    </a>
                )
            }
        }
    };

    return (
        <div className="insight-detail-page bg-white min-h-screen pb-24 font-sans text-gray-800">
            {/* 1. HERO HEADER WITH COVER IMAGE */}
            <div className="relative pt-32 pb-16 lg:pb-24 bg-[#111] overflow-hidden text-white border-b border-[#1D1740]/20 mb-16 shadow-lg">
                <div className="absolute inset-0 z-0 bg-black">
                    <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover opacity-40 transform scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] to-transparent opacity-90"></div>
                </div>

                <div className="container px-4 max-w-4xl mx-auto relative z-10">
                    <Link to="/insights" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-10 transition-colors text-sm font-semibold tracking-wide uppercase group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver a Artículos
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-bold uppercase tracking-widest text-[#fff]">
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-md">{category}</span>
                        <span className="text-gray-300 font-medium">{postDate}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-8 leading-tight tracking-tight drop-shadow-md">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-4 border-t border-white/20 pt-8 mt-4">
                        <img src={authorImage} alt={authorName} className="w-14 h-14 rounded-full border-2 border-white/20 shadow-sm object-cover" />
                        <div>
                            <p className="font-bold text-white text-lg leading-tight">{authorName}</p>
                            <p className="text-sm text-gray-300 font-medium">{authorRole}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. MAIN CONTENT AREA */}
            <div className="container px-4 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 relative">

                {/* Social Share Sidebar (Desktop Only Sticky) */}
                <div className="hidden lg:block lg:w-20 shrink-0 relative lg:pt-8">
                    <div className="sticky top-32 flex flex-col gap-5 items-center bg-gray-50/80 p-4 rounded-[2rem] border border-gray-100 backdrop-blur-sm shadow-sm py-8 text-gray-400">
                        <span className="text-[10px] font-bold uppercase tracking-widest mb-2 [writing-mode:vertical-lr] rotate-180">Compartir</span>
                        <div className="w-8 h-[1px] bg-gray-200 my-2"></div>
                        <button onClick={handleShare} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-all hover:shadow-lg hover:-translate-y-1" aria-label="Copy link">
                            <Copy size={18} />
                        </button>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all hover:shadow-lg hover:-translate-y-1" aria-label="Share on LinkedIn">
                            <Linkedin size={18} />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all hover:shadow-lg hover:-translate-y-1" aria-label="Share on Twitter">
                            <Twitter size={18} />
                        </a>
                    </div>
                </div>

                {/* Article Body constraints */}
                <div className="max-w-3xl flex-grow mx-auto lg:mx-0">

                    {/* Rendered Content from Sanity using PortableText */}
                    <div className="blog-content prose prose-lg md:prose-xl max-w-none text-gray-600 mb-20">
                        {article.body ? (
                            <PortableText value={article.body} components={ptComponents} />
                        ) : (
                            <p>Contenido del artículo vacío.</p>
                        )}
                    </div>

                    {/* Social Share (Mobile Only) */}
                    <div className="lg:hidden flex flex-wrap gap-4 items-center justify-center border-t border-b border-gray-100 py-8 mb-12 bg-gray-50 rounded-2xl">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mr-2">Compartir:</span>
                        <button onClick={handleShare} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)] transition-colors shadow-sm border border-gray-200">
                            <Copy size={20} />
                        </button>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0A66C2] transition-colors shadow-sm border border-gray-200">
                            <Linkedin size={20} />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${article.title}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1DA1F2] transition-colors shadow-sm border border-gray-200">
                            <Twitter size={20} />
                        </a>
                    </div>

                    {/* Navigation between articles (Can be enhanced with actual query to fetch next/prev posts) */}
                    <div className="pt-8 flex flex-col md:flex-row justify-between items-stretch gap-6">
                        <Link to="/insights" className="flex-1 flex flex-col items-start gap-2 p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[var(--color-primary)] hover:shadow-xl transition-all group">
                            <div className="flex items-center gap-2 text-[var(--color-primary)] mb-2">
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-xs font-bold uppercase tracking-wider">Volver al Home de Artículos</span>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>

            <style>{`
                /* Advanced styling for the injected rich text content */
                .blog-content {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: #4B5563; /* text-gray-600 */
                }
                .blog-content p {
                    margin-bottom: 2rem;
                }
                .blog-content p:first-of-type {
                    font-size: 1.25rem; /* Lead paragraph slightly larger */
                    line-height: 1.8;
                    color: #4B5563; /* text-gray-600 */
                    font-weight: 400;
                    margin-top: 2rem; /* Added space between image and first paragraph */
                    margin-bottom: 3rem;
                }
                .blog-content h2 {
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    margin-top: 3.5rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.3;
                }
                .blog-content h3 {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--color-primary);
                    margin-top: 3rem;
                    margin-bottom: 1.2rem;
                }
                .blog-content ul {
                    list-style-type: none;
                    padding-left: 0;
                    margin-bottom: 2.5rem;
                }
                .blog-content ul li {
                    position: relative;
                    padding-left: 2.5rem;
                    margin-bottom: 1.2rem;
                    background: #f9fafb;
                    padding: 1rem 1.5rem 1rem 3rem;
                    border-radius: 0.75rem;
                    border: 1px solid #f3f4f6;
                }
                .blog-content ul li::before {
                    content: '';
                    position: absolute;
                    left: 1.2rem;
                    top: 1.6rem;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: var(--color-gold); /* Gold bullet points */
                }
                .blog-content ul li strong {
                    color: var(--color-primary);
                }
                .blog-content blockquote {
                    position: relative;
                    margin: 4rem 0;
                    padding: 3rem 3rem 3rem 4rem;
                    background-color: var(--color-primary);
                    color: white;
                    border-radius: 1.5rem;
                    font-size: 1.5rem;
                    line-height: 1.6;
                    font-weight: 500;
                    font-style: italic;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }
                .blog-content blockquote::before {
                    content: '"';
                    position: absolute;
                    left: 1rem;
                    top: -1rem;
                    font-size: 6rem;
                    color: var(--color-gold);
                    opacity: 0.3;
                    font-family: serif;
                    line-height: 1;
                }
                @media (max-width: 768px) {
                    .blog-content h2 { font-size: 1.8rem; }
                    .blog-content p:first-of-type { font-size: 1.2rem; }
                    .blog-content blockquote { font-size: 1.2rem; padding: 2rem; }
                }
            `}</style>
        </div>
    );
};

export default InsightDetail;
