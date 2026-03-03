import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { client, urlFor } from '../sanity';

const FeaturedInsights = () => {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currentLang = i18n.language || 'es';

        // Fetch up to 3 posts from Sanity matching the active locale
        const query = `*[_type == "post" && (language == $lang || (!defined(language) && $lang == 'es'))] | order(publishedAt desc)[0...3] { 
            _id, title, slug, publishedAt, mainImage, categories[]->{title} 
        }`;

        client.fetch(query, { lang: currentLang })
            .then((data) => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching featured posts:", error);
                setIsLoading(false);
            });
    }, [i18n.language]);

    const fallbackImages = [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <section className="insights-section">
            <div className="container">
                <div className="section-header-flex">
                    <h2 className="section-title" style={{ marginBottom: 0 }}>{t('insights.title')}</h2>
                    <Link to="/insights" className="view-all-link">{t('insights.viewAll')} <ArrowRight size={16} /></Link>
                </div>

                <div className="insights-grid">
                    {isLoading ? (
                        <div className="col-span-full flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            Aún no hay artículos destacados. <br /> Publica desde el panel Sanity Studio.
                        </div>
                    ) : (
                        posts.map((post, index) => {
                            const postImageUrl = post.mainImage ? urlFor(post.mainImage).width(800).url() : fallbackImages[index % fallbackImages.length];
                            const postDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Proximamente';
                            const category = post.categories && post.categories.length > 0 ? post.categories[0].title : 'General';

                            return (
                                <Link to={`/insights/${post.slug?.current}`} key={post._id} className="insight-card">
                                    <div className="insight-image">
                                        <img src={postImageUrl} alt={post.title} />
                                    </div>
                                    <div className="insight-content">
                                        <div className="insight-meta">
                                            <span className="insight-cat">{category}</span>
                                            <span className="insight-date">{postDate}</span>
                                        </div>
                                        <h3 className="insight-title">{post.title}</h3>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>

            <style>{`
        .insights-section {
          background-color: #F4F4F4;
          padding: 6rem 0;
        }

        .section-header-flex {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 3rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #ddd;
        }

        .view-all-link {
            color: var(--color-primary);
            font-weight: 700;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
        }

        .insights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            min-height: 200px;
        }
        
        /* col-span-full for empty/loading states */
        .col-span-full {
             grid-column: 1 / -1;
        }

        .insight-card {
            background: white;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            text-decoration: none;
        }

        .insight-card:hover {
            box-shadow: 0 15px 30px rgba(0,0,0,0.1);
            transform: translateY(-5px);
        }

        .insight-image {
            height: 250px;
            overflow: hidden;
        }

        .insight-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        .insight-card:hover .insight-image img {
            transform: scale(1.05);
        }

        .insight-content {
            padding: 2rem;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .insight-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 0.8rem;
            font-size: 0.75rem;
            font-weight: 700;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .insight-cat {
            color: var(--color-primary);
        }

        .insight-title {
            font-size: 1.4rem;
            color: var(--color-text-dark);
            line-height: 1.3;
            transition: color 0.2s;
        }

        .insight-card:hover .insight-title {
            color: var(--color-primary);
        }
      `}</style>
        </section>
    );
};

export default FeaturedInsights;
