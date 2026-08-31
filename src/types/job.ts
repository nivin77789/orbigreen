export type JobStatus = "active" | "closed";

export interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // e.g. "Full-time", "Part-time", "Contract"
  experience: string; // e.g. "3-5 years"
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  linkedinUrl?: string;
  status: JobStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type JobRoleInput = Omit<JobRole, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
};

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  experienceYears: string;
  coverNote?: string;
  attachments?: { name: string; url: string }[];
  createdAt: unknown;
}
