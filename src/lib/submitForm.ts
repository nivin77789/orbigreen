import { WEB3FORMS_ACCESS_KEY } from "@/lib/constants";
import { db, storage } from "@/lib/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export class FormSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FormSubmitError";
  }
}

function getAccessKey(): string {
  return import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? WEB3FORMS_ACCESS_KEY;
}

async function uploadAttachments(
  collectionName: "contacts" | "quotations",
  docId: string,
  files: FileList,
): Promise<{ name: string; url: string }[]> {
  return Promise.all(
    Array.from(files).map(async (file) => {
      const fileRef = ref(storage, `${collectionName}/${docId}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      return { name: file.name, url };
    }),
  );
}

async function saveSubmissionToFirestore(
  collectionName: "contacts" | "quotations",
  form: HTMLFormElement,
  fileInput?: HTMLInputElement | null,
): Promise<void> {
  const formData = new FormData(form);
  const record: Record<string, unknown> = {};

  formData.forEach((value, key) => {
    if (key === "botcheck" || key === "attachments" || value instanceof File) return;
    record[key] = String(value);
  });

  record.createdAt = serverTimestamp();

  try {
    const docRef = doc(collection(db, collectionName));

    if (fileInput?.files?.length) {
      record.attachments = await uploadAttachments(collectionName, docRef.id, fileInput.files);
    }

    await setDoc(docRef, record);
  } catch {
    // Non-fatal: the email notification below is the primary delivery channel.
  }
}

export async function submitWebsiteForm(
  form: HTMLFormElement,
  options?: {
    subject?: string;
    fileInput?: HTMLInputElement | null;
    collection?: "contacts" | "quotations";
  },
): Promise<void> {
  const formData = new FormData(form);
  formData.append("access_key", getAccessKey());
  formData.append("subject", options?.subject ?? "[Orbigreen] New contact message");

  if (options?.fileInput?.files?.length) {
    formData.delete("attachments");
    Array.from(options.fileInput.files).forEach((file) => {
      formData.append("attachment", file);
    });
  }

  if (options?.collection) {
    void saveSubmissionToFirestore(options.collection, form, options.fileInput);
  }

  let response: Response;
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new FormSubmitError("Unable to send your message. Please check your connection.");
  }

  if (!response.ok) {
    throw new FormSubmitError("Unable to send your message. Please try again.");
  }

  let data: { success?: boolean; message?: string };
  try {
    data = (await response.json()) as { success?: boolean; message?: string };
  } catch {
    throw new FormSubmitError("Unable to send your message. Please try again.");
  }

  if (!data.success) {
    throw new FormSubmitError(data.message || "Unable to send your message. Please try again.");
  }
}
