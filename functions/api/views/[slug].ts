interface Env {
  VIEWS: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const slug = params.slug as string;

  try {
    const views = await env.VIEWS.get(slug);
    return Response.json({ views: parseInt(views || "0") });
  } catch {
    return Response.json({ views: 0 });
  }
};

export const onRequestPost: PagesFunction<Env> = async ({ params, env }) => {
  const slug = params.slug as string;

  try {
    const current = parseInt((await env.VIEWS.get(slug)) || "0");
    const next = current + 1;
    await env.VIEWS.put(slug, next.toString());
    return Response.json({ views: next });
  } catch {
    return Response.json({ views: 0 });
  }
};
