import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle2, ChevronRight, FileText, Mail, Phone, ArrowRight as ArrowRightIcon, ShieldCheck, Clock } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const ServiceDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const service = servicesData.find(s => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center p-8 animate-fade-in">
                    <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">{t('serviceDetail.notFound')}</h2>
                    <Link to="/" className="btn btn-outline flex items-center justify-center gap-2">
                        <ArrowLeft size={20} /> {t('serviceDetail.backHome')}
                    </Link>
                </div>
            </div>
        );
    }

    const tKey = `services.items.${service.id}`;
    const features = t(`${tKey}.benefits`, { returnObjects: true });
    const description = t(`${tKey}.desc`, { returnObjects: true });

    return (
        <div className="service-detail-page bg-white font-sans text-gray-700">
            {/* 1. HEADER SECTION (Clean white background) */}
            <div className="bg-white pt-24 pb-0">
                <div className="container px-4 max-w-7xl mx-auto">
                    {/* Breadcrumb / Back Link */}
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--color-primary)] mb-4 transition-colors text-sm font-semibold tracking-wide uppercase group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {t('nav.services')} / {t(`${tKey}.category`)}
                    </Link>

                    <div className="max-w-4xl">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-2 leading-tight tracking-tight">
                            {t(`${tKey}.title`)}
                        </h1>
                        <p className="text-lg text-gray-500 font-light leading-relaxed max-w-3xl mb-4">
                            {t(`${tKey}.shortDesc`)}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. VISUAL HERO (Separate from text) */}
            <div className="container px-4 max-w-7xl mx-auto mb-16 relative z-10">
                <div className="w-full aspect-[21/9] md:aspect-[2.5/1] rounded-xl overflow-hidden shadow-lg bg-gray-100 relative">
                    <img
                        src={service.image}
                        alt={t(`${tKey}.title`)}
                        className="w-full h-full object-cover"
                    />
                    {/* Subtle gradient at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
            </div>

            {/* 3. MAIN CONTENT GRID */}
            <div className="container px-4 max-w-7xl mx-auto !pb-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">

                    {/* LEFT COLUMN: Deep Dive (8 cols) */}
                    <div className="lg:col-span-8">
                        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-3 flex items-center gap-3 mt-8">
                            <span className="w-8 h-1 bg-[var(--color-secondary)] inline-block rounded-full"></span>
                            {t('serviceDetail.descTitle')}
                        </h2>

                        <div className="prose prose-lg text-gray-600 max-w-none mb-8 leading-loose text-lg">
                            <div className="space-y-4">
                                {Array.isArray(description) && description.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-8 flex items-center gap-2">
                                <ShieldCheck className="text-[var(--color-secondary)]" />
                                {t('serviceDetail.whyChoose')}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Array.isArray(features) && features.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
                                        <div className="mt-1 shrink-0 text-green-600">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className="text-gray-700 font-medium text-sm leading-relaxed">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Interactive Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-8 lg:mt-8">

                        {/* EXPERT CONTACT CARD */}
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 lg:sticky lg:top-32">
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">{t('serviceDetail.sidebar.title')}</h3>
                                <p className="text-sm text-gray-500">{t('serviceDetail.sidebar.subtitle')}</p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <a href="mailto:contacto@procuratio.cl" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[var(--color-secondary)] group-hover:bg-[var(--color-secondary)] group-hover:text-white transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('serviceDetail.sidebar.email')}</p>
                                        <p className="text-sm font-semibold text-gray-700">contacto@procuratio.cl</p>
                                    </div>
                                </a>

                                <a href="tel:+56912345678" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('serviceDetail.sidebar.phone')}</p>
                                        <p className="text-sm font-semibold text-gray-700">+56 9 1234 5678</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50/50">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('serviceDetail.sidebar.schedule')}</p>
                                        <p className="text-sm font-semibold text-gray-700">{t('serviceDetail.sidebar.scheduleVal')}</p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="/#contact"
                                className="block w-full py-4 bg-[var(--color-primary)] text-white text-center font-bold rounded-lg hover:bg-[var(--color-secondary)] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                            >
                                {t('serviceDetail.sidebar.cta')}
                            </a>
                        </div>

                        {/* DOCUMENTATION WIDGET */}
                        <div className="bg-[var(--color-bg-light)] rounded-xl p-6 border border-gray-200">
                            <h4 className="font-bold text-[var(--color-primary)] mb-4 text-sm uppercase tracking-wider">{t('serviceDetail.docs.title')}</h4>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-[var(--color-secondary)] hover:shadow-sm transition-all group">
                                <FileText className="text-gray-400 group-hover:text-[var(--color-secondary)]" size={24} />
                                <div>
                                    <p className="text-sm font-bold text-gray-700 group-hover:text-[var(--color-primary)]">{t('serviceDetail.docs.brochure')}</p>
                                    <p className="text-xs text-gray-400">PDF • 2.4 MB</p>
                                </div>
                                <ArrowRightIcon size={16} className="ml-auto text-gray-300 group-hover:text-[var(--color-secondary)] -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
