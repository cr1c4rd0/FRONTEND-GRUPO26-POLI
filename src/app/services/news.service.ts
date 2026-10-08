import { Injectable, signal, computed } from '@angular/core';
import { NewsItem, UserProfile } from '../models/news.model';

const STORAGE_KEYS = {
  NEWS: 'synapse_news_data',
  FAVORITES: 'synapse_favorites_list',
  PROFILE: 'synapse_user_profile',
  INITIALIZED: 'synapse_initialized_v2'
};

export const DEFAULT_NEWS_SEED: NewsItem[] = [
  {
    "id": "NEWS-01",
    "title": "Un nuevo modelo de IA reduce en 40% el consumo energético de los centros de datos",
    "slug": "modelo-ia-reduce-consumo-energetico-centros-datos",
    "category": "Inteligencia Artificial",
    "categoryTag": "ia",
    "categoryColor": "#7C5CFF",
    "excerpt": "Investigadores presentan una arquitectura de red neuronal que optimiza el uso de recursos en infraestructuras de cómputo a gran escala, marcando un hito para la sostenibilidad tecnológica.",
    "content": "Investigadores internacionales presentaron una revolucionaria arquitectura de red neuronal capaz de optimizar dinámicamente la distribución de cargas de trabajo entre servidores en centros de datos masivos. Mediante el uso de algoritmos predictivos basados en aprendizaje por refuerzo profundo, el sistema anticipa picos de tráfico y redistribuye las operaciones de procesamiento con milisegundos de anticipación.\n\nEl estudio, evaluado en infraestructuras de nube que albergan más de cien mil nodos computacionales, demostró una disminución promedio del 40% en el consumo energético global, además de reducir drásticamente la huella de carbono asociada a la refrigeración de los racks.\n\nExpertos del sector destacan que esta innovación no solo representa un alivio significativo en los costos operativos de las empresas de telecomunicaciones y computación en la nube, sino que también marca un precedente fundamental hacia la sostenibilidad ecológica de la inteligencia artificial moderna.",
    "pullQuote": "“La optimización algorítmica no solo ahorra gigavatios; define el estándar ecológico que la inteligencia artificial debe adoptar en la próxima década.”",
    "author": {
      "name": "María Rendón",
      "role": "Especialista en IA y Computación Verde",
      "initials": "MR",
      "avatarColor": "#7C5CFF"
    },
    "date": "12 sep 2026",
    "isoDate": "2026-09-12",
    "readTime": "6 min",
    "readTimeFull": "6 min de lectura",
    "image": "https://images.unsplash.com/photo-1621203860694-c0fc09ea64bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODkzMjI1NzR8&ixlib=rb-4.1.0&q=80&w=1080",
    "featured": true,
    "keyFacts": [
      { "label": "Ahorro energético", "value": "40.2%" },
      { "label": "Nodos probados", "value": "+100,000" },
      { "label": "Reducción de huella CO2", "value": "35%" },
      { "label": "Disponibilidad comercial", "value": "Q4 2026" }
    ]
  },
  {
    "id": "NEWS-02",
    "title": "Bootstrap 6 llega con soporte nativo para modo oscuro",
    "slug": "bootstrap-6-soporte-nativo-modo-oscuro",
    "category": "Software",
    "categoryTag": "software",
    "categoryColor": "#34D399",
    "excerpt": "La nueva versión del framework simplifica la construcción de interfaces adaptables sin CSS adicional.",
    "content": "El equipo de desarrollo de Bootstrap ha liberado formalmente la versión 6 de su popular framework de código abierto. Esta entrega introduce un motor renovado de variables CSS semánticas que permite la alternancia instantánea entre esquemas de color claro y oscuro con una sola directiva de atributo en el elemento raíz.\n\nAdemás del soporte de color mejorado, Bootstrap 6 incluye componentes modulares reconstruidos en JavaScript moderno sin dependencias externas pesadas, una cuadrícula con CSS Grid nativo de doce y dieciséis columnas, y utilidades de espaciado fluidas que responden de manera orgánica al ancho del viewport sin necesidad de media queries complejas.\n\nLa comunidad de desarrolladores frontend ha recibido la actualización con gran entusiasmo, destacando la facilidad con la que se pueden migrar proyectos existentes desde Bootstrap 5.3 sin romper la compatibilidad regresiva en selectores clave.",
    "pullQuote": "“Bootstrap 6 elimina la fricción entre el diseño en temas oscuros y la rapidez de prototipado que siempre caracterizó al framework.”",
    "author": {
      "name": "Juan Esteban Serna",
      "role": "Frontend Developer & Editor",
      "initials": "JS",
      "avatarColor": "#34D399"
    },
    "date": "10 sep 2026",
    "isoDate": "2026-09-10",
    "readTime": "3 min",
    "readTimeFull": "3 min de lectura",
    "image": "https://images.unsplash.com/photo-1649451844835-7f9d1dc6b0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODkzMjIxNjB8&ixlib=rb-4.1.0&q=80&w=1080",
    "featured": false,
    "keyFacts": [
      { "label": "Variables CSS agregadas", "value": "+140" },
      { "label": "Reducción de bundle", "value": "22%" },
      { "label": "Soporte CSS Grid", "value": "100% nativo" },
      { "label": "Compatibilidad", "value": "Evergreen Browsers" }
    ]
  },
  {
    "id": "NEWS-03",
    "title": "Detectan vulnerabilidad crítica en routers domésticos",
    "slug": "detectan-vulnerabilidad-critica-routers-domesticos",
    "category": "Ciberseguridad",
    "categoryTag": "security",
    "categoryColor": "#F87171",
    "excerpt": "Fabricantes lanzan parches urgentes tras el hallazgo de una falla que exponía redes locales.",
    "content": "Investigadores en ciberseguridad revelaron una vulnerabilidad zero-day de severidad 9.8 en el firmware de múltiples marcas de enrutadores inalámbricos de uso doméstico y para pequeñas oficinas. La brecha permite a atacantes remotos ejecutar código no autenticado mediante el envío de paquetes DNS especialmente manipulados.\n\nLa falla, bautizada como RouterWave, expone el tráfico cifrado local y facilita la inyección de redirecciones maliciosas sin alertar a los usuarios. Los principales consorcios de hardware han emitido parches de seguridad de máxima prioridad y recomiendan a todos los administradores y usuarios actualizar el firmware de sus equipos inmediatamente.\n\nAsimismo, las agencias de ciberdefensa instan a desactivar la administración remota mediante WAN y a cambiar las contraseñas predeterminadas de los dispositivos.",
    "pullQuote": "“La seguridad perimetral de los hogares sigue siendo el eslabón más frágil en la cadena de protección de datos personales.”",
    "author": {
      "name": "Carlos Vélez",
      "role": "Analista Senior de Ciberdefensa",
      "initials": "CV",
      "avatarColor": "#F87171"
    },
    "date": "10 sep 2026",
    "isoDate": "2026-09-10",
    "readTime": "5 min",
    "readTimeFull": "5 min de lectura",
    "image": "https://images.unsplash.com/photo-1614064745729-79e39d1b39b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODkzMjIxNjB8&ixlib=rb-4.1.0&q=80&w=1080",
    "featured": false,
    "keyFacts": [
      { "label": "Puntuación CVSS", "value": "9.8 / 10" },
      { "label": "Dispositivos afectados", "value": "1.4 millones" },
      { "label": "Fabricantes involucrados", "value": "6 líderes" },
      { "label": "Estado del parche", "value": "Disponible" }
    ]
  },
  {
    "id": "NEWS-04",
    "title": "Startup colombiana de robótica cierra ronda de $8M",
    "slug": "startup-colombiana-robotica-cierra-ronda-8m",
    "category": "Startups",
    "categoryTag": "startups",
    "categoryColor": "#FBBF24",
    "excerpt": "La compañía busca expandir su tecnología de automatización a mercados de Latinoamérica.",
    "content": "Una prometedora empresa emergente de robótica con sede en Medellín ha cerrado exitosamente una ronda de inversión Serie A por 8 millones de dólares liderada por fondos de capital de riesgo internacionales y regionales. La compañía desarrolla brazos robóticos articulados asistidos por visión artificial para la clasificación y embalaje en almacenes de logística.\n\nCon esta nueva inyección de capital, la empresa planea duplicar su equipo de ingenieros, expandir su planta piloto de manufactura y desembarcar comercialmente en los mercados de México, Brasil y Chile durante el próximo año.\n\nEl ecosistema emprendedor latinoamericano celebra el logro como una confirmación del talento en ingeniería avanzada e industria 4.0 que se consolida en la región.",
    "pullQuote": "“Demostramos que en Colombia podemos crear tecnología de punta en automatización robótica de clase mundial.”",
    "author": {
      "name": "Juan Manuel Saldarriaga",
      "role": "Corresponsal de Innovación y Negocios",
      "initials": "JM",
      "avatarColor": "#FBBF24"
    },
    "date": "9 sep 2026",
    "isoDate": "2026-09-09",
    "readTime": "4 min",
    "readTimeFull": "4 min de lectura",
    "image": "https://images.unsplash.com/photo-1661882217431-b64b303fb1d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODkzMjIxNjF8&ixlib=rb-4.1.0&q=80&w=1080",
    "featured": false,
    "keyFacts": [
      { "label": "Monto levantado", "value": "$8,000,000 USD" },
      { "label": "Fase de financiamiento", "value": "Serie A" },
      { "label": "Mercados de expansión", "value": "3 países" },
      { "label": "Nuevos empleos tech", "value": "+45 plazas" }
    ]
  },
  {
    "id": "NEWS-05",
    "title": "Nuevo chip promete duplicar la autonomía de laptops",
    "slug": "nuevo-chip-promete-duplicar-autonomia-laptops",
    "category": "Hardware",
    "categoryTag": "hardware",
    "categoryColor": "#22D3EE",
    "excerpt": "El procesador de bajo consumo llegará a equipos comerciales a inicios de 2027.",
    "content": "Un consorcio internacional de semiconductores dio a conocer su nueva microarquitectura litográfica basada en nodos de 2 nanómetros con transistores de compuerta envolvente completa (GAA). Esta estructura física permite un incremento drástico en la densidad de cálculo mientras reduce las pérdidas por corrientes parásitas en un 55%.\n\nLas primeras pruebas de laboratorio en portátiles de consumo ultradelgado evidenciaron tiempos de batería continua que superan las 28 horas de reproducción multimedia y tareas de productividad intensivas, sin recurrir a ventiladores ruidosos.\n\nLos fabricantes más importantes de computadoras ya han recibido las primeras muestras funcionales y prevén presentar modelos comerciales al público en el CES del próximo año.",
    "pullQuote": "“La barrera de las 24 horas continuas de uso real en computadores portátiles finalmente ha sido superada.”",
    "author": {
      "name": "Cristian Ricardo",
      "role": "Líder de Redacción Técnica",
      "initials": "CR",
      "avatarColor": "#22D3EE"
    },
    "date": "9 sep 2026",
    "isoDate": "2026-09-09",
    "readTime": "3 min",
    "readTimeFull": "3 min de lectura",
    "image": "https://images.unsplash.com/photo-1672307613484-3254a04651fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODkzMjIxNjF8&ixlib=rb-4.1.0&q=80&w=1080",
    "featured": false,
    "keyFacts": [
      { "label": "Autonomía continua", "value": "28+ horas" },
      { "label": "Nodo litográfico", "value": "2 nm GAA" },
      { "label": "Eficiencia térmica", "value": "+55%" },
      { "label": "Lanzamiento estimado", "value": "Q1 2027" }
    ]
  },
  {
    "id": "NEWS-06",
    "title": "Asistentes de IA ahora pueden razonar sobre imágenes médicas con precisión clínica",
    "slug": "asistentes-ia-razonan-imagenes-medicas-precision-clinica",
    "category": "Inteligencia Artificial",
    "categoryTag": "ia",
    "categoryColor": "#7C5CFF",
    "excerpt": "Un estudio clínico muestra resultados prometedores en diagnóstico asistido por IA.",
    "content": "Un equipo internacional de investigadores presentó un nuevo sistema de inteligencia artificial multimodal capaz de interpretar radiografías, tomografías axiales computarizadas y resonancias magnéticas con un nivel de precisión comparable e incluso superior en casos atípicos al de especialistas humanos certificados.\n\nEl modelo fue rigurosamente entrenado con más de dos millones de imágenes clínicas anonimizadas y validadas por juntas médicas de doce países. A diferencia de modelos anteriores que solo clasificaban probabilidades, este sistema genera una explicación detallada paso a paso justificando su razonamiento diagnóstico.\n\nDurante las pruebas clínicas en entornos hospitalarios reales, el sistema logró identificar patrones sutiles asociados a microtumores y neumopatías tempranas que en ocasiones pasaban desapercibidos en revisiones preliminares de urgencia.\n\nLos desarrolladores aseguran que el modelo se integrará como herramienta de apoyo —nunca de reemplazo— en la red de hospitales públicos durante la primera fase de implementación, prevista para el segundo semestre de 2027.",
    "pullQuote": "“Esta tecnología no reemplaza al médico, pero puede reducir hasta en un 30% el tiempo de diagnóstico en casos complejos.”",
    "author": {
      "name": "Juan Esteban Serna",
      "role": "Editor de Tecnología",
      "initials": "JS",
      "avatarColor": "#7C5CFF"
    },
    "date": "8 sep 2026",
    "isoDate": "2026-09-08",
    "readTime": "6 min",
    "readTimeFull": "6 min de lectura",
    "image": "https://images.unsplash.com/photo-1711409645921-ef3db0501f96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODkzMjIyMTh8&ixlib=rb-4.1.0&q=80&w=1080",
    "featured": false,
    "keyFacts": [
      { "label": "Precisión reportada", "value": "94.2%" },
      { "label": "Imágenes de entrenamiento", "value": "2.1 millones" },
      { "label": "Hospitales piloto", "value": "12 países" },
      { "label": "Fase de despliegue", "value": "2027" }
    ]
  },
  {
    "id": "NEWS-07",
    "title": "Lanzan framework open source para apps offline-first",
    "slug": "lanzan-framework-open-source-apps-offline-first",
    "category": "Software",
    "categoryTag": "software",
    "categoryColor": "#34D399",
    "excerpt": "La herramienta permite sincronización automática de datos sin conexión constante.",
    "content": "Un colectivo global de ingenieros de software ha liberado la primera versión estable de un nuevo framework enfocado en el paradigma offline-first para aplicaciones web y móviles. La biblioteca implementa algoritmos de tipos de datos replicados sin conflictos (CRDTs) con almacenamiento primario en IndexedDB y sincronización transparente cuando se restablece la conexión a internet.\n\nLa principal ventaja es que los desarrolladores ya no deben escribir lógica compleja de resolución de conflictos manuales ni preocuparse por caídas repentinas de red en zonas rurales o dispositivos en movimiento.\n\nLa herramienta ya cuenta con conectores directos para SQLite, PostgreSQL y Firebase, y está disponible con licencia MIT en los principales repositorios comunitarios.",
    "pullQuote": "“Las aplicaciones modernas deben asumir que la conexión siempre fallará y funcionar perfectamente sin ella.”",
    "author": {
      "name": "María Rendón",
      "role": "Arquitecta de Software Distribuido",
      "initials": "MR",
      "avatarColor": "#34D399"
    },
    "date": "8 sep 2026",
    "isoDate": "2026-09-08",
    "readTime": "4 min",
    "readTimeFull": "4 min de lectura",
    "image": "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODkzMjIxNjJ8&ixlib=rb-4.1.0&q=80&w=1080",
    "featured": false,
    "keyFacts": [
      { "label": "Arquitectura de datos", "value": "CRDTs" },
      { "label": "Peso de la librería", "value": "12 KB gzipped" },
      { "label": "Licencia", "value": "MIT (Open Source)" },
      { "label": "Sincronización", "value": "P2P & Cloud" }
    ]
  }
];

export const DEFAULT_FAVORITES_SEED = ["NEWS-01", "NEWS-03", "NEWS-04", "NEWS-05"];

export const DEFAULT_PROFILE_SEED: UserProfile = {
  name: "Cristian Ricardo",
  email: "cristianricardo87@gmail.com",
  role: "Líder de proyecto / Frontend en SYNAPSE.TECH",
  bio: "Líder de proyecto / Frontend en SYNAPSE.TECH",
  memberSince: "ago 2026",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&w=200"
};

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  readonly news = signal<NewsItem[]>([]);
  readonly favorites = signal<string[]>([]);
  readonly profile = signal<UserProfile>(DEFAULT_PROFILE_SEED);

  readonly favoriteCount = computed(() => this.favorites().length);

  readonly featuredNews = computed(() => {
    const list = this.news();
    return list.find(item => item.featured) || list[0] || null;
  });

  readonly favoriteNews = computed(() => {
    const favIds = this.favorites();
    return this.news().filter(item => favIds.includes(item.id));
  });

  constructor() {
    this.initStorage();
  }

  private initStorage() {
    if (typeof window === 'undefined') return;

    try {
      // Noticias
      const storedNews = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (storedNews) {
        this.news.set(JSON.parse(storedNews));
      } else {
        this.news.set(DEFAULT_NEWS_SEED);
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(DEFAULT_NEWS_SEED));
      }

      // Favoritos
      const storedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (storedFavs) {
        this.favorites.set(JSON.parse(storedFavs));
      } else {
        this.favorites.set(DEFAULT_FAVORITES_SEED);
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(DEFAULT_FAVORITES_SEED));
      }

      // Perfil
      const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (storedProfile) {
        this.profile.set(JSON.parse(storedProfile));
      } else {
        this.profile.set(DEFAULT_PROFILE_SEED);
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE_SEED));
      }
    } catch (e) {
      this.news.set(DEFAULT_NEWS_SEED);
      this.favorites.set(DEFAULT_FAVORITES_SEED);
      this.profile.set(DEFAULT_PROFILE_SEED);
    }
  }

  getNewsById(id: string): NewsItem | undefined {
    return this.news().find(item => item.id === id);
  }

  getNewsByCategory(category: string): NewsItem[] {
    if (!category || category === 'todas') return this.news();
    return this.news().filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  isFavorite(id: string): boolean {
    return this.favorites().includes(id);
  }

  toggleFavorite(id: string): boolean {
    const current = this.favorites();
    let isAdded = false;
    let updated: string[];

    if (current.includes(id)) {
      updated = current.filter(item => item !== id);
      isAdded = false;
    } else {
      updated = [...current, id];
      isAdded = true;
    }

    this.favorites.set(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    }
    return isAdded;
  }

  saveNews(item: Partial<NewsItem>): NewsItem {
    const list = [...this.news()];
    let savedItem: NewsItem;

    if (item.id) {
      const idx = list.findIndex(n => n.id === item.id);
      if (idx >= 0) {
        savedItem = { ...list[idx], ...item } as NewsItem;
        list[idx] = savedItem;
      } else {
        savedItem = item as NewsItem;
        list.unshift(savedItem);
      }
    } else {
      // Generar nuevo ID
      const maxNum = list.reduce((max, n) => {
        const match = n.id.match(/NEWS-(\d+)/);
        return match ? Math.max(max, parseInt(match[1], 10)) : max;
      }, 0);
      const newId = `NEWS-${String(maxNum + 1).padStart(2, '0')}`;
      savedItem = {
        id: newId,
        title: item.title || 'Nueva Noticia',
        slug: (item.title || 'nueva-noticia').toLowerCase().replace(/\s+/g, '-'),
        category: item.category || 'Tecnología',
        categoryTag: (item.categoryTag || 'ia').toLowerCase(),
        categoryColor: item.categoryColor || '#7C5CFF',
        excerpt: item.excerpt || '',
        content: item.content || '',
        pullQuote: item.pullQuote || '',
        author: item.author || {
          name: 'Cristian Ricardo',
          role: 'Editor de Tecnología',
          initials: 'CR',
          avatarColor: '#7C5CFF'
        },
        date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
        isoDate: new Date().toISOString().split('T')[0],
        readTime: item.readTime || '4 min',
        readTimeFull: item.readTimeFull || '4 min de lectura',
        image: item.image || 'https://images.unsplash.com/photo-1621203860694-c0fc09ea64bd?q=80&w=1080',
        featured: !!item.featured,
        keyFacts: item.keyFacts || [
          { label: 'Estado', value: 'Publicado' },
          { label: 'Revisión', value: 'Editorial' }
        ]
      };
      list.unshift(savedItem);
    }

    this.news.set(list);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(list));
    }
    return savedItem;
  }

  deleteNews(id: string): boolean {
    const list = this.news().filter(n => n.id !== id);
    this.news.set(list);

    // Quitar de favoritos si estaba
    if (this.favorites().includes(id)) {
      const updatedFavs = this.favorites().filter(f => f !== id);
      this.favorites.set(updatedFavs);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavs));
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(list));
    }
    return true;
  }

  resetToDefault(): void {
    this.news.set(DEFAULT_NEWS_SEED);
    this.favorites.set(DEFAULT_FAVORITES_SEED);
    this.profile.set(DEFAULT_PROFILE_SEED);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(DEFAULT_NEWS_SEED));
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(DEFAULT_FAVORITES_SEED));
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE_SEED));
    }
  }

  updateProfile(profile: Partial<UserProfile>): UserProfile {
    const updated = { ...this.profile(), ...profile };
    this.profile.set(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    }
    return updated;
  }
}
