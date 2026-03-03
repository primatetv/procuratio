import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'mi6o3w4q', // As provided by the user
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-03-03',
    token: process.env.SANITY_TOKEN || '' // Will be provided dynamically
})

async function seedData() {
    console.log('🌱 Starting to seed demo articles...')

    // CREATE CATEGORIES
    const category1 = await client.create({
        _type: 'category',
        title: 'Infraestructura',
        description: 'Gestión y optimización de infraestructura corporativa.'
    })

    const category2 = await client.create({
        _type: 'category',
        title: 'Sostenibilidad',
        description: 'Prácticas eco-amigables y sostenibilidad B2B.'
    })

    const category3 = await client.create({
        _type: 'category',
        title: 'Tecnología',
        description: 'Innovación y digitalización para empresas.'
    })

    // CREATE AN AUTHOR
    const author = await client.create({
        _type: 'author',
        name: 'Equipo Procuratio',
        bio: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'El panel de expertos asociados a Procuratio.' }],
            }
        ]
    })

    // CREATE POST 1
    console.log('📝 Creating Post 1...')
    await client.create({
        _type: 'post',
        title: 'Gestión Eficiente de Infraestructura Crítica en el Sector Corporativo',
        slug: { _type: 'slug', current: 'gestion-eficiente-infraestructura' },
        author: { _type: 'reference', _ref: author._id },
        mainImage: undefined, // Leaving empty so UI uses fallback URL
        categories: [{ _type: 'reference', _ref: category1._id }],
        publishedAt: new Date().toISOString(),
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'La gestión de infraestructura crítica en grandes corporaciones ha dejado de ser una tarea puramente operativa para convertirse en un pilar estratégico del negocio. En un mundo donde la disponibilidad y la eficiencia dictan el ritmo del mercado, las empresas líderes están adoptando enfoques más sofisticados y proactivos.' }]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'El Cambio de Paradigma en el Mantenimiento' }]
            },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'Tradicionalmente, el mantenimiento correctivo era la norma. Hoy, el mantenimiento predictivo, impulsado por sensores IoT y análisis de datos, permite anticipar fallos antes de que ocurran.' }]
            },
            {
                _type: 'block',
                style: 'blockquote',
                children: [{ _type: 'span', text: 'La infraestructura no es solo el edificio o los equipos; es el ecosistema que permite que tu talento brille y tu negocio escale.' }]
            },
            {
                _type: 'block',
                style: 'h2',
                children: [{ _type: 'span', text: 'Sostenibilidad como Eje Central' }]
            },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'La eficiencia energética ya no es una opción "deseable", sino una exigencia normativa y ética. Implementar sistemas de gestión de energía (SGE) y actualizar componentes críticos (como HVAC o iluminación) puede reducir la huella de carbono de un edificio corporativo hasta en un 30% en los primeros dos años.' }]
            }
        ]
    })

    // CREATE POST 2
    console.log('📝 Creating Post 2...')
    await client.create({
        _type: 'post',
        title: 'Estrategias de Carbono Neutral: Transformando la Operativa B2B',
        slug: { _type: 'slug', current: 'estrategias-carbono-neutral' },
        author: { _type: 'reference', _ref: author._id },
        categories: [{ _type: 'reference', _ref: category2._id }],
        publishedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'La transición hacia operaciones carbono neutral ya no es un eslogan de marketing, sino un requerimiento imperativo de partners e inversores globales.' }]
            },
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'Abordamos en este artículo cómo las medidas de mitigación directas afectan los resultados financieros.' }]
            }
        ]
    })

    // CREATE POST 3
    console.log('📝 Creating Post 3...')
    await client.create({
        _type: 'post',
        title: 'Digitalización de Activos Inmobiliarios: El Futuro del Management',
        slug: { _type: 'slug', current: 'digitalizacion-activos-inmobiliarios' },
        author: { _type: 'reference', _ref: author._id },
        categories: [{ _type: 'reference', _ref: category3._id }],
        publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        body: [
            {
                _type: 'block',
                style: 'normal',
                children: [{ _type: 'span', text: 'Implementar "Gemelos Digitales" (Digital Twins) para la gestión del portafolio inmobiliario reduce los costos de revisión física y aumenta drásticamente la capacidad de predicción de desgaste.' }]
            },
            {
                _type: 'block',
                style: 'blockquote',
                children: [{ _type: 'span', text: 'El activo más valioso de un portfolio hoy no es el tabique, sino los datos que genera dicho espacio.' }]
            },
        ]
    })

    console.log('✅ Done seeding data.')
}

seedData().catch(err => {
    console.error('Error seeding data:', err)
    process.exit(1)
})
