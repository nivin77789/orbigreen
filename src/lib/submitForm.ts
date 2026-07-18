import { WEB3FORMS_ACCESS_KEY } from "@/lib/constants";

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

export async function submitWebsiteForm(
  form: HTMLFormElement,
  options?: {
    subject?: string;
    fileInput?: HTMLInputElement | null;
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
