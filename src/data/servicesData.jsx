import React from 'react';
import { Briefcase, Building, PenTool } from 'lucide-react';
import serviceInfra from '../assets/service-infra.png';
import heroBg from '../assets/hero-bg.png';
import serviceConsulting from '../assets/service-consulting.png';

export const servicesData = [
    {
        id: "proyectos-obras",
        category: "INFRAESTRUCTURA",
        title: "Gestión de Proyectos y Obras",
        shortDesc: "Soluciones concretas para maximizar oportunidades en obras nuevas, optimizando uso, renta y costos.",
        desc: (
            <div className="space-y-4">
                <p>
                    El objetivo de este servicio es brindar una solución concreta a los requerimientos del Cliente, cuando se trata de maximizar las oportunidades que se presentan cuando de una obra nueva se trata. Nos encargamos de todo el ciclo de vida del proyecto, desde la concepción hasta la entrega final.
                </p>
                <p>
                    Nuestro enfoque integral asegura que cada decisión técnica y financiera esté alineada con los objetivos comerciales del mandante.
                </p>
            </div>
        ),
        benefits: [
            "Maximización del uso y rentabilidad del espacio.",
            "Análisis de alternativas y costo de oportunidad.",
            "Gestión integradora de proyectos y construcción.",
            "Procesos transparentes y protección contractual.",
            "Supervisión cerrada de calidad y plazos.",
            "Optimización de la relación calidad/precio."
        ],
        icon: <Briefcase size={32} />,
        image: serviceInfra
    },
    {
        id: "administracion",
        category: "INFRAESTRUCTURA",
        title: "Administración",
        shortDesc: "Maximización del cuociente calidad/valor, con gestión integral de proveedores, contratos y seguros.",
        desc: (
            <div className="space-y-4">
                <p>
                    El servicio está orientado a maximizar el cuociente entre calidad de servicio y valor, cuidando de mantener los precios en un mínimo nivel, acorde con la calidad de servicio que el Cliente desea recibir.
                </p>
                <p>
                    El servicio se acompaña habitualmente con presupuestos anuales y reportes de gestión administrativos y operativos mensuales, tal que el Cliente se encuentre siempre informado de la situación general de sus inmuebles.
                </p>
            </div>
        ),
        benefits: [
            "Selección cuidadosa y gestión de proveedores.",
            "Administración activa de contratos y arriendos.",
            "Gestión de seguros y riesgos operativos.",
            "Alineamiento operativo proveedores-cliente.",
            "Instauración de pautas de mejora continua.",
            "Reportes de gestión mensuales y anuales."
        ],
        icon: <Building size={32} />,
        image: heroBg
    },
    {
        id: "consultoria",
        category: "INFRAESTRUCTURA",
        title: "Consultoría Inmobiliaria",
        shortDesc: "Asesoría integral para la gestión, compra, arriendo y valoración de activos inmobiliarios.",
        desc: (
            <div className="space-y-4">
                <p>
                    ¿Tienes problemas con la gestión de los inmuebles? ¿Necesitas una herramienta integradora? ¿No estás seguro si comprar o arrendar una propiedad? Buscamos brindarte la claridad necesaria para tomar decisiones informadas.
                </p>
                <p>
                    Desde el esquema y enfoque tradicional de mercado hasta las más innovadoras propuestas de trabajo/incentivo para representarlo con exclusividad, cuyas ventajas y beneficios repagan por sí solos nuestros honorarios.
                </p>
                <p className="font-semibold">
                    Hemos estado en el giro inmobiliario por más de 30 años: consúltanos. Podemos ayudarte.
                </p>
            </div>
        ),
        benefits: [
            "Valoración precisa de activos inmobiliarios.",
            "Asesoría en compra vs. arriendo.",
            "Estrategias de inversión y desinversión.",
            "Análisis de mercado y tendencias.",
            "Gestión de negociaciones complejas.",
            "Representación exclusiva y personalizada."
        ],
        icon: <PenTool size={32} />,
        image: serviceConsulting
    }
];
