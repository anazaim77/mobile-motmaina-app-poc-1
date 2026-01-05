import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "./axios";

export interface Consultant {
  id: string;
  name: string;
  title: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: string;
  bio: string;
  languages: string[];
  avatarUrl?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

const mockConsultants: Consultant[] = [
  {
    id: "1",
    name: "Dr. Fatima Al-Saud",
    title: "Clinical Psychologist",
    specialization: "Anxiety & Depression",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 350,
    location: "Riyadh, Saudi Arabia",
    bio: "Experienced clinical psychologist specializing in cognitive behavioral therapy for anxiety and depression. Fluent in Arabic and English.",
    languages: ["Arabic", "English"],
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Dr. Ahmed Al-Zahrani",
    title: "Psychiatrist",
    specialization: "Mood Disorders",
    rating: 4.8,
    reviewCount: 95,
    hourlyRate: 400,
    location: "Jeddah, Saudi Arabia",
    bio: "Board-certified psychiatrist with expertise in treating mood disorders and providing medication management.",
    languages: ["Arabic", "English"],
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Dr. Layla Al-Mansour",
    title: "Child Psychologist",
    specialization: "Child & Adolescent",
    rating: 5.0,
    reviewCount: 203,
    hourlyRate: 320,
    location: "Dammam, Saudi Arabia",
    bio: "Specialist in child and adolescent psychology with focus on developmental issues and family therapy.",
    languages: ["Arabic", "English", "French"],
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Dr. Omar Al-Rashid",
    title: "Counseling Psychologist",
    specialization: "Relationship Counseling",
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 300,
    location: "Riyadh, Saudi Arabia",
    bio: "Experienced in marriage and family counseling, helping couples navigate challenges and improve communication.",
    languages: ["Arabic", "English"],
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "5",
    name: "Dr. Noura Al-Harbi",
    title: "Clinical Psychologist",
    specialization: "Trauma & PTSD",
    rating: 4.9,
    reviewCount: 182,
    hourlyRate: 380,
    location: "Riyadh, Saudi Arabia",
    bio: "Specialized in trauma-focused therapy and PTSD treatment using evidence-based approaches.",
    languages: ["Arabic", "English"],
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
];

export const setupMockServer = (): void => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

  // POST /auth/login
  mock.onPost("/auth/login").reply((config) => {
    const { email, password } = JSON.parse(config.data);

    // Simple mock validation
    if (!email || !password) {
      return [400, { message: "Email and password are required" }];
    }

    // Generate deterministic token (dev-only)
    const token = `mock_token_${email}_${Date.now()}`;

    const response: LoginResponse = {
      accessToken: token,
      user: {
        id: "user_" + email.split("@")[0],
        email,
        name: email.split("@")[0],
      },
    };

    return [200, response];
  });

  // GET /consultants - with search support
  mock.onGet(/\/consultants(\?.*)?$/).reply((config) => {
    const params = new URLSearchParams(config.url?.split("?")[1]);
    const query = params.get("q")?.toLowerCase() || "";

    let filteredConsultants = mockConsultants;

    if (query) {
      filteredConsultants = mockConsultants.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.specialization.toLowerCase().includes(query) ||
          c.location.toLowerCase().includes(query),
      );
    }

    return [200, { items: filteredConsultants }];
  });

  // GET /consultants/:id
  mock.onGet(/\/consultants\/\w+/).reply((config) => {
    const id = config.url?.split("/").pop();
    const consultant = mockConsultants.find((c) => c.id === id);

    if (!consultant) {
      return [404, { message: "Consultant not found" }];
    }

    return [200, consultant];
  });

  console.log("🔧 Mock server initialized");
};
