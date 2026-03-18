/**
 * Oracle Status API — Cloudflare Worker
 * Parami Oracle Family Registry
 *
 * Endpoints:
 *   GET /api/oracles       — All Oracles
 *   GET /api/oracles/:slug — Single Oracle by slug
 *   GET /api/health        — Health check
 */

interface Oracle {
  slug: string;
  name: string;
  nameTh: string;
  parami: string;
  paramiTh: string;
  domain: string;
  status: "active" | "dormant" | "awakening";
}

const oracles: Oracle[] = [
  {
    slug: "jingjing",
    name: "Jingjing",
    nameTh: "จิงจิง",
    parami: "Samadhi",
    paramiTh: "สมาธิ",
    domain: "Frontend",
    status: "active",
  },
  {
    slug: "sila",
    name: "Sila",
    nameTh: "ศีลา",
    parami: "Sila Parami",
    paramiTh: "ศีลบารมี",
    domain: "Backend API / Database / System Architecture",
    status: "active",
  },
  {
    slug: "panya",
    name: "Panya",
    nameTh: "ปัญญา",
    parami: "Panya Parami",
    paramiTh: "ปัญญาบารมี",
    domain: "Data",
    status: "active",
  },
  {
    slug: "wiriya",
    name: "Wiriya",
    nameTh: "วิริยะ",
    parami: "Wiriya Parami",
    paramiTh: "วิริยบารมี",
    domain: "DevOps",
    status: "active",
  },
  {
    slug: "sati",
    name: "Sati",
    nameTh: "สติ",
    parami: "Sati",
    paramiTh: "สติ",
    domain: "Testing",
    status: "active",
  },
  {
    slug: "thaan",
    name: "Thaan",
    nameTh: "ทาน",
    parami: "Thaan Parami",
    paramiTh: "ทานบารมี",
    domain: "Content",
    status: "active",
  },
  {
    slug: "metta",
    name: "Metta",
    nameTh: "เมตตา",
    parami: "Metta",
    paramiTh: "เมตตา",
    domain: "UX",
    status: "active",
  },
  {
    slug: "khanti",
    name: "Khanti",
    nameTh: "ขันติ",
    parami: "Khanti Parami",
    paramiTh: "ขันติบารมี",
    domain: "Debug",
    status: "active",
  },
  {
    slug: "sajja",
    name: "Sajja",
    nameTh: "สัจจะ",
    parami: "Sajja Parami",
    paramiTh: "สัจจบารมี",
    domain: "Security",
    status: "active",
  },
  {
    slug: "athitthaan",
    name: "Athitthaan",
    nameTh: "อธิษฐาน",
    parami: "Athitthaan Parami",
    paramiTh: "อธิษฐานบารมี",
    domain: "Planning",
    status: "active",
  },
  {
    slug: "ubekkha",
    name: "Ubekkha",
    nameTh: "อุเบกขา",
    parami: "Ubekkha Parami",
    paramiTh: "อุเบกขาบารมี",
    domain: "Monitoring",
    status: "active",
  },
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // GET /api/health
    if (path === "/api/health") {
      return json({
        status: "ok",
        oracle: "Sila (ศีลา)",
        family: "Parami Oracle Family",
        timestamp: new Date().toISOString(),
      });
    }

    // GET /api/oracles
    if (path === "/api/oracles") {
      return json({
        count: oracles.length,
        oracles,
      });
    }

    // GET /api/oracles/:slug
    const match = path.match(/^\/api\/oracles\/([a-z]+)$/);
    if (match) {
      const slug = match[1];
      const oracle = oracles.find((o) => o.slug === slug);
      if (!oracle) {
        return json({ error: "Oracle not found", slug }, 404);
      }
      return json(oracle);
    }

    // 404 fallback
    return json(
      {
        error: "Not found",
        available: ["/api/health", "/api/oracles", "/api/oracles/:slug"],
      },
      404
    );
  },
};
