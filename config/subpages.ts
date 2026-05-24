export type SubpageId =
  | "program-leadership"
  | "program-service"
  | "program-public-image"
  | "program-fellowship"
  | "events-upcoming"
  | "events-signature"
  | "events-calendar"
  | "resources-brand"
  | "resources-reports";

export type SubpageData = {
  title: string;
  category: string;
  icon: string;
  content: string; // raw HTML string (rendered via dangerouslySetInnerHTML)
};

export const subpagesData: Record<SubpageId, SubpageData> = {
  "program-leadership": {
    title: "Leadership Development Academy",
    category: "CAPACITY BUILDING",
    icon: "graduation-cap",
    content: `
      <div class="space-y-5">
        <p class="text-slate-600 dark:text-slate-300">Specialized operational training to certify regional officers and develop management skills.</p>
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
            <h5 class="font-bold text-[#0B1426] dark:text-white text-sm">PETS Academy</h5>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">President-Elect Training Seminars on strategic club coordination and project alignment.</p>
          </div>
          <div class="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
            <h5 class="font-bold text-[#0B1426] dark:text-white text-sm">RZI Elect Workbook</h5>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Interactive workbook turning academic theory into verified district actions.</p>
          </div>
        </div>
        <a href="https://library.rsamdio.org/resources/rzi-workbook_reference.pdf" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full bg-[#D41B69] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#8A0F3E] transition">View RZI Workbook PDF</a>
      </div>
    `,
  },
  "program-service": {
    title: "Regional Service & Impact Portfolio",
    category: "COMMUNITY SERVICE",
    icon: "hand-heart",
    content: `
      <div class="space-y-5">
        <p class="text-slate-600 dark:text-slate-300">Large-scale civic projects targeting core global challenges: clean environment, education, and health.</p>
        <div class="grid gap-3 sm:grid-cols-3">
          <div class="rounded-2xl border border-[#FCE8F1] dark:border-white/10 bg-[#FCE8F1]/40 dark:bg-white/5 p-4">
            <div class="text-[#D41B69] font-bold text-sm mb-1">Green South Asia</div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Environmental conservation drives and recycling programs.</p>
          </div>
          <div class="rounded-2xl border border-[#FFF4DB] dark:border-white/10 bg-[#FFF4DB]/50 dark:bg-white/5 p-4">
            <div class="text-[#C87900] dark:text-[#F7A81B] font-bold text-sm mb-1">CSR Partnerships</div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Aligning corporate grants with local community needs.</p>
          </div>
          <div class="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
            <div class="text-[#17458F] font-bold text-sm mb-1">Global Grants</div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Pathways for Rotaractors to scale district operations.</p>
          </div>
        </div>
      </div>
    `,
  },
  "program-public-image": {
    title: "Public Image & Branding Guidelines",
    category: "PUBLIC RELATIONS",
    icon: "megaphone",
    content: `
      <div class="space-y-5">
        <p class="text-slate-600 dark:text-slate-300">Consistent branding increases visibility and credibility of the Rotaract movement.</p>
        <div class="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5 space-y-3">
          <h5 class="font-bold text-[#D41B69] text-sm">Core Brand Rules</h5>
          <p class="text-slate-600 dark:text-slate-300 text-sm">Always pair the official Rotaract wordmark with the brand wheel correctly. Use Cranberry (#D41B69) and Gold (#F7A81B) per specifications.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="https://library.rsamdio.org/resources/public-image.pdf" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full bg-[#D41B69] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#8A0F3E] transition">Public Image Guide</a>
          <a href="https://library.rsamdio.org/" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/10 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/20 transition">Download Logo PNGs</a>
        </div>
      </div>
    `,
  },
  "program-fellowship": {
    title: "Regional Fellowship & Friendship Exchange",
    category: "FELLOWSHIP",
    icon: "heart-handshake",
    content: `
      <div class="space-y-5">
        <p class="text-slate-600 dark:text-slate-300">Bilateral Youth Exchange programs and cross-district friendship conventions.</p>
        <div class="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5 space-y-3">
          <h5 class="font-bold text-[#0B1426] dark:text-white text-sm">Programs</h5>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li class="flex gap-2 items-start">✅ Cultural homestays between member nations.</li>
            <li class="flex gap-2 items-start">✅ Regional exchange delegations for district assemblies.</li>
            <li class="flex gap-2 items-start">✅ Consolidated fellowship networking meetups.</li>
          </ul>
        </div>
      </div>
    `,
  },
  "events-upcoming": {
    title: "Upcoming MDIO Events & Conventions",
    category: "EVENTS",
    icon: "calendar-days",
    content: `
      <div class="space-y-5">
        <p class="text-slate-600 dark:text-slate-300">Major regional activities for the current leadership term.</p>
        <div class="space-y-3">
          <div class="rounded-2xl border border-[#FCE8F1] dark:border-white/10 bg-[#FCE8F1]/30 dark:bg-white/5 p-4 flex gap-4 items-start">
            <div class="rounded-xl bg-[#D41B69] text-white p-2.5 text-center shrink-0 min-w-[52px]">
              <div class="text-sm font-bold">JUL</div><div class="text-[10px] opacity-80">2026</div>
            </div>
            <div><h4 class="font-bold text-[#0B1426] dark:text-white text-sm">South Asia Rotaract Presidents Academy</h4><p class="text-xs text-[#D41B69] mt-0.5">Regional Officer Leadership training.</p></div>
          </div>
          <div class="rounded-2xl border border-[#FFF4DB] dark:border-white/10 bg-[#FFF4DB]/40 dark:bg-white/5 p-4 flex gap-4 items-start">
            <div class="rounded-xl bg-[#F7A81B] text-[#0B1426] p-2.5 text-center shrink-0 min-w-[52px]">
              <div class="text-sm font-bold">OCT</div><div class="text-[10px] opacity-70">2026</div>
            </div>
            <div><h4 class="font-bold text-[#0B1426] dark:text-white text-sm">South Asia Civic Impact & CSR Summit</h4><p class="text-xs text-[#C87900] mt-0.5">Community project allocations.</p></div>
          </div>
          <div class="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 flex gap-4 items-start">
            <div class="rounded-xl bg-[#17458F] text-white p-2.5 text-center shrink-0 min-w-[52px]">
              <div class="text-sm font-bold">MAY</div><div class="text-[10px] opacity-80">2027</div>
            </div>
            <div><h4 class="font-bold text-[#0B1426] dark:text-white text-sm">South Asia Rotaract Convention (RSACon)</h4><p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Annual regional delegate convention.</p></div>
          </div>
        </div>
      </div>
    `,
  },
  "events-signature": {
    title: "Signature Regional Forums",
    category: "EVENTS",
    icon: "star",
    content: `
      <div class="space-y-5">
        <p class="text-slate-600 dark:text-slate-300">Recognizing outstanding club efforts and leadership accomplishments across South Asia.</p>
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="rounded-2xl border border-[#FFF4DB] dark:border-white/10 bg-[#FFF4DB]/40 dark:bg-white/5 p-5">
            <h5 class="font-bold text-[#C87900] dark:text-[#F7A81B] text-sm">Outstanding Project Awards</h5>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">Annual regional award panel recognizing highly impactful community initiatives.</p>
          </div>
          <div class="rounded-2xl border border-[#FCE8F1] dark:border-white/10 bg-[#FCE8F1]/40 dark:bg-white/5 p-5">
            <h5 class="font-bold text-[#D41B69] text-sm">Chairperson's Roundtable</h5>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">Executive summit for DRRs to align regional strategic policies.</p>
          </div>
        </div>
      </div>
    `,
  },
  "events-calendar": {
    title: "Strategic Operational Calendar",
    category: "EVENTS",
    icon: "calendar-check",
    content: `
      <div class="space-y-5">
        <p class="text-slate-600 dark:text-slate-300">Operational schedules, training deadlines, and cross-district service dates.</p>
        <div class="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6">
          <div class="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 mb-3">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>
          <div class="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span class="p-2 opacity-30">28</span><span class="p-2 opacity-30">29</span><span class="p-2 opacity-30">30</span>
            <span class="p-2 bg-[#D41B69] rounded-xl text-white">1</span><span class="p-2">2</span><span class="p-2">3</span><span class="p-2">4</span>
            <span class="p-2">5</span><span class="p-2">6</span><span class="p-2">7</span><span class="p-2">8</span><span class="p-2">9</span><span class="p-2">10</span><span class="p-2">11</span>
            <span class="p-2">12</span><span class="p-2">13</span><span class="p-2 bg-[#F7A81B] rounded-xl text-[#0B1426]">14</span><span class="p-2">15</span><span class="p-2">16</span><span class="p-2">17</span><span class="p-2">18</span>
            <span class="p-2">19</span><span class="p-2">20</span><span class="p-2">21</span><span class="p-2">22</span><span class="p-2">23</span><span class="p-2">24</span><span class="p-2 bg-[#17458F] rounded-xl text-white">25</span>
            <span class="p-2">26</span><span class="p-2">27</span><span class="p-2">28</span><span class="p-2">29</span><span class="p-2">30</span><span class="p-2">31</span>
          </div>
        </div>
      </div>
    `,
  },
  "resources-brand": {
    title: "Brand Assets & Guidelines",
    category: "RESOURCES",
    icon: "palette",
    content: `
      <div class="space-y-5">
        <p class="text-slate-600 dark:text-slate-300">Download high-resolution vector logos and standard typography styling codes for your club.</p>
        <div class="rounded-2xl border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5 space-y-4">
          <h5 class="font-bold text-[#D41B69] text-sm">Color Palette Specifications</h5>
          <div class="grid grid-cols-3 gap-3 text-center text-xs">
            <div class="rounded-xl bg-[#D41B69] p-3 text-white shadow-sm"><strong class="block">Cranberry</strong>#D41B69</div>
            <div class="rounded-xl bg-[#F7A81B] p-3 text-[#0B1426] shadow-sm"><strong class="block">Gold</strong>#F7A81B</div>
            <div class="rounded-xl bg-[#0B1426] p-3 text-white shadow-sm"><strong class="block">Deep Navy</strong>#0B1426</div>
          </div>
        </div>
        <a href="https://library.rsamdio.org/#brand-identity" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-full bg-[#D41B69] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#8A0F3E] transition">Download Full Brand Kit</a>
      </div>
    `,
  },
  "resources-reports": {
    title: "Impact Reports & Disclosures",
    category: "RESOURCES",
    icon: "file-text",
    content: `
      <div class="space-y-5">
        <p class="text-slate-600 dark:text-slate-300">Official public annual reviews, community program audits, and financial disclosures.</p>
        <div class="space-y-2.5">
          <a href="https://library.rsamdio.org/resources/documenting_expenses_en.pdf" target="_blank" rel="noopener" class="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 hover:border-[#D41B69]/30 hover:bg-[#FCE8F1]/30 dark:hover:bg-white/10 transition text-sm">
            <span class="flex items-center gap-3 text-[#0B1426] dark:text-white font-medium">📄 Financial Expense Guidelines PDF</span>
            <span class="text-slate-400">↓</span>
          </a>
          <a href="https://library.rsamdio.org/resources/grants-how-rotaractors-can-participate-frequently-asked-questions-en.pdf" target="_blank" rel="noopener" class="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 hover:border-[#F7A81B]/40 hover:bg-[#FFF4DB]/30 dark:hover:bg-white/10 transition text-sm">
            <span class="flex items-center gap-3 text-[#0B1426] dark:text-white font-medium">📄 Grants Participation FAQs PDF</span>
            <span class="text-slate-400">↓</span>
          </a>
        </div>
      </div>
    `,
  },
};
