export interface Author {
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
}

export interface KeyFact {
  label: string;
  value: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryTag: string;
  categoryColor: string;
  excerpt: string;
  content: string;
  pullQuote?: string;
  author: Author;
  date: string;
  isoDate: string;
  readTime: string;
  readTimeFull?: string;
  image: string;
  featured: boolean;
  keyFacts?: KeyFact[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  memberSince: string;
  avatarUrl: string;
}

export interface ContactMessage {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
  newsletter: boolean;
}
