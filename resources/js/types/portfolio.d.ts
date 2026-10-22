export interface ProfileDTO {
    displayName: string;
    headline: string;
    heroSummary: string;
    aboutMarkdown: string;
    location: string | null;
    publicEmail?: string | null;
    hasResume: boolean;
    portraitUrl: string | null;
    portraitWidth?: number | null;
    portraitHeight?: number | null;
}

export interface ExperienceDTO {
    id: number;
    title: string;
    organization: string | null;
    employmentType: string | null;
    location: string | null;
    startYear: number;
    startMonth: number | null;
    endYear: number | null;
    endMonth: number | null;
    isCurrent: boolean;
    periodLabel: string;
    descriptionMarkdown: string | null;
}

export interface SkillItemDTO {
    id: number;
    name: string;
    context: string | null;
}

export interface SkillGroupDTO {
    id: number;
    name: string;
    description: string | null;
    skills: SkillItemDTO[];
}

export interface ProjectCardDTO {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    roleSummary: string;
    featured?: boolean;
    coverUrl: string | null;
    coverWidth?: number | null;
    coverHeight?: number | null;
    skills: string[];
}

export interface ProjectDetailDTO extends ProjectCardDTO {
    problemMarkdown: string;
    solutionMarkdown: string;
    tradeoffsMarkdown: string | null;
    outcomesMarkdown: string | null;
    projectUrl: string | null;
    repositoryUrl: string | null;
    media: Array<{
        id: number;
        url: string;
        altText: string | null;
        caption: string | null;
        width?: number | null;
        height?: number | null;
    }>;
}

export interface SocialLinkDTO {
    id: number;
    label: string;
    url: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}
