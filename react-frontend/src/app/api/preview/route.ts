import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL não fornecida" }, { status: 400 });
  }

  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const metadata = {
      title: $('meta[property="og:title"]').attr("content") || $("title").text(),
      description: $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content"),
      image: $('meta[property="og:image"]').attr("content"),
      site: $('meta[property="og:site_name"]').attr("content") || new URL(url).hostname,
      url,
    };

    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar metadados" }, { status: 500 });
  }
}
