const encode = (data: Record<string, string>): string =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

export const submitNetlifyForm = async (
  formName: string,
  fields: Record<string, string>,
): Promise<void> => {
  const body = encode({ "form-name": formName, ...fields });
  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`Netlify form submit failed: ${res.status}`);
};
