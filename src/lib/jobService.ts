import { db, storage } from "@/lib/firebase";
import type { JobApplication, JobRole, JobRoleInput } from "@/types/job";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function fetchJobs(): Promise<JobRole[]> {
  try {
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: String(data.title ?? ""),
          department: String(data.department ?? ""),
          location: String(data.location ?? ""),
          type: String(data.type ?? "Full-time"),
          experience: String(data.experience ?? ""),
          description: String(data.description ?? ""),
          responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
          requirements: Array.isArray(data.requirements) ? data.requirements : [],
          benefits: Array.isArray(data.benefits) ? data.benefits : [],
          linkedinUrl: data.linkedinUrl ? String(data.linkedinUrl) : undefined,
          status: data.status === "closed" ? "closed" : "active",
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as JobRole;
      });
    }

    return [];
  } catch (err) {
    console.warn("Failed to fetch jobs from Firestore:", err);
    return [];
  }
}

export async function addJobRole(input: JobRoleInput): Promise<string> {
  const newRef = doc(collection(db, "jobs"));
  const payload: Record<string, unknown> = {
    title: input.title.trim(),
    department: input.department.trim(),
    location: input.location.trim(),
    type: input.type.trim(),
    experience: input.experience.trim(),
    description: input.description.trim(),
    responsibilities: input.responsibilities.map((r) => r.trim()).filter(Boolean),
    requirements: input.requirements.map((r) => r.trim()).filter(Boolean),
    benefits: (input.benefits ?? []).map((b) => b.trim()).filter(Boolean),
    status: input.status,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (input.linkedinUrl?.trim()) {
    payload.linkedinUrl = input.linkedinUrl.trim();
  }

  await setDoc(newRef, payload);
  return newRef.id;
}

export async function updateJobRole(id: string, input: JobRoleInput): Promise<void> {
  const jobRef = doc(db, "jobs", id);
  const payload: Record<string, unknown> = {
    title: input.title.trim(),
    department: input.department.trim(),
    location: input.location.trim(),
    type: input.type.trim(),
    experience: input.experience.trim(),
    description: input.description.trim(),
    responsibilities: input.responsibilities.map((r) => r.trim()).filter(Boolean),
    requirements: input.requirements.map((r) => r.trim()).filter(Boolean),
    benefits: (input.benefits ?? []).map((b) => b.trim()).filter(Boolean),
    status: input.status,
    updatedAt: serverTimestamp(),
  };

  if (input.linkedinUrl !== undefined) {
    payload.linkedinUrl = input.linkedinUrl.trim() || null;
  }

  // If this is a seed job being edited for the first time, setDoc it so it becomes a real document
  if (id.startsWith("seed-job-")) {
    await setDoc(jobRef, {
      ...payload,
      createdAt: serverTimestamp(),
    });
  } else {
    await updateDoc(jobRef, payload);
  }
}

export async function deleteJobRole(id: string): Promise<void> {
  try {
    const jobRef = doc(db, "jobs", id);
    await deleteDoc(jobRef);
  } catch (err) {
    console.warn(`Could not delete document ${id} from Firestore:`, err);
  }
}

export async function submitJobApplication(
  jobId: string,
  jobTitle: string,
  applicant: {
    applicantName: string;
    email: string;
    phone: string;
    experienceYears: string;
    coverNote?: string;
  },
  resumeFile?: File | null,
): Promise<void> {
  const appRef = doc(collection(db, "job_applications"));
  let attachments: { name: string; url: string }[] = [];

  if (resumeFile) {
    try {
      const fileStorageRef = ref(storage, `job_applications/${appRef.id}/${resumeFile.name}`);
      await uploadBytes(fileStorageRef, resumeFile);
      const url = await getDownloadURL(fileStorageRef);
      attachments = [{ name: resumeFile.name, url }];
    } catch (storageErr) {
      console.warn("Could not upload resume to Firebase Storage:", storageErr);
    }
  }

  const payload = {
    jobId,
    jobTitle,
    applicantName: applicant.applicantName.trim(),
    email: applicant.email.trim(),
    phone: applicant.phone.trim(),
    experienceYears: applicant.experienceYears.trim(),
    coverNote: applicant.coverNote?.trim() ?? "",
    attachments,
    createdAt: serverTimestamp(),
  };

  await setDoc(appRef, payload);
}

export async function fetchJobApplications(): Promise<JobApplication[]> {
  try {
    const q = query(collection(db, "job_applications"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as JobApplication[];
  } catch (err) {
    console.warn("Failed to fetch job applications:", err);
    return [];
  }
}
