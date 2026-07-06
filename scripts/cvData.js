/**
 * CV data — structured work history for the hidden /cv page.
 *
 * Categories:
 *   "product"  — Cavai platform / dev work
 *   "creative" — Cavai creative campaigns & showreels
 *   "music"    — Universal Music / freelance content production
 *   "other"    — Side projects, school-adjacent, misc
 */

export const cvData = [
  // ────────────────────────────────────────────
  // 2026
  // ────────────────────────────────────────────
  {
    year: 2026,
    entries: [
      {
        month: 'Juli',
        items: [
          {
            title: 'Rich text-formatering i tekst, knapper og flow-operatorer',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend', 'engine'],
            links: [
              { label: 'PR #1900', url: 'https://github.com/Cavai/Application-Frontend/pull/1900' },
              { label: 'CE #749', url: 'https://github.com/Cavai/Creative-Engine/pull/749' },
              { label: 'Release note', url: 'https://cavai-release-notes.pages.dev/releases/af-8.29.0/' },
            ],
            // TODO: uncomment when AF 8.29.0 is released and deployed to release notes site
            // video: { src: 'https://cavai-release-notes.pages.dev/releases/af-8.29.0/rich-text.mp4', chapters: [{ title: 'Formatting in blocks', time: 0 }, { title: 'Formatting in flow', time: 33 }] },
          },
          {
            title: 'Forbedret template-velger med søk og workspace-gruppering',
            client: 'Cavai Product',
            category: 'product',
            tags: ['improvement', 'frontend'],
            links: [
              { label: 'PR #1897', url: 'https://github.com/Cavai/Application-Frontend/pull/1897' },
              { label: 'Release note', url: 'https://cavai-release-notes.pages.dev/releases/af-8.29.0/' },
            ],
            // TODO: uncomment when AF 8.29.0 is released and deployed to release notes site
            // video: { src: 'https://cavai-release-notes.pages.dev/releases/af-8.29.0/templates.mp4', chapters: [{ title: 'Picking a template', time: 0 }, { title: 'Search, filter, and workspace browsing', time: 5 }] },
          },
          {
            title: 'Bugfixes: preview overlay, template-rekkefølge, italic fonts',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'frontend', 'engine'],
            links: [
              { label: 'Release note', url: 'https://cavai-release-notes.pages.dev/releases/af-8.28.0/' },
            ],
          },
        ],
      },
      {
        month: 'Juni',
        items: [
          {
            title: 'Crossfade-animasjon for change-operatorer',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend', 'engine'],
            links: [
              { label: 'PR #1896', url: 'https://github.com/Cavai/Application-Frontend/pull/1896' },
              { label: 'CE #748', url: 'https://github.com/Cavai/Creative-Engine/pull/748' },
            ],
            video: {
              src: 'https://cavai-release-notes.pages.dev/releases/af-8.27.0/crossfade.mp4',
            },
          },
          {
            title: 'Font-optimalisering: subsetting, embedding, TTF/OTF-støtte',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend', 'engine'],
            links: [
              { label: 'PR #1887', url: 'https://github.com/Cavai/Application-Frontend/pull/1887' },
              { label: 'CE #744', url: 'https://github.com/Cavai/Creative-Engine/pull/744' },
            ],
            video: {
              src: 'https://cavai-release-notes.pages.dev/releases/af-8.27.0/font-optimization.mp4',
            },
          },
          {
            title: 'Automatisk WebP-konvertering av bilder',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'backend'],
            links: [
              { label: 'BE #564', url: 'https://github.com/Cavai/Application-Backend/pull/564' },
            ],
          },
          {
            title: 'Show/Hide bevarer blokk-tilstand, eksport-fix og Xandr-makro',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'engine', 'frontend'],
            links: [
              { label: 'CE #745', url: 'https://github.com/Cavai/Creative-Engine/pull/745' },
              { label: 'PR #1889', url: 'https://github.com/Cavai/Application-Frontend/pull/1889' },
            ],
          },
          {
            title: 'World Cup Poll',
            client: 'Cavai',
            category: 'creative',
            links: [
              { label: 'Preview', url: 'https://my.cavai.com/creatives/50878-53134-54741-91310/build#design' },
            ],
          },
          {
            title: 'Audi dobbel fullskjerm',
            client: 'Cavai',
            category: 'creative',
            links: [
              { label: 'Preview', url: 'https://my.cavai.com/creatives/51251-51861-55170-93389/build#design' },
            ],
          },
          {
            title: 'Specsavers arm-strekker',
            client: 'Cavai',
            category: 'creative',
            links: [
              { label: 'Preview', url: 'https://my.cavai.com/creatives/51251-51861-55170-93552/build#design' },
            ],
          },
          {
            title: 'Nordea Black Card fullskjerm',
            client: 'Cavai',
            category: 'creative',
            links: [
              { label: 'Preview', url: 'https://my.cavai.com/creatives/50134-50179-55277-94550/build#design' },
            ],
          },
        ],
      },
      {
        month: 'Mai',
        items: [
          {
            title: 'Ford Puma fullscreen',
            client: 'Cavai',
            category: 'creative',
            links: [
              { label: 'Preview', url: 'https://my.cavai.com/creatives/0-53491-55030-92343/build#design' },
            ],
          },
          {
            title: 'Block Grouping: multi-select, drag & drop, konfigurasjon',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend', 'engine'],
            links: [
              { label: 'PR #1859', url: 'https://github.com/Cavai/Application-Frontend/pull/1859' },
              { label: 'CAV-16', url: 'https://linear.app/cavai/issue/CAV-16' },
            ],
            // TODO: uncomment when deployed to Cloudflare Pages
            // video: { src: 'https://cavai-release-notes.pages.dev/2026-05/block-grouping-demo.mp4', chapters: [...] },
          },
          {
            title: 'Fullscreen v2 format',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'CAV-26', url: 'https://linear.app/cavai/issue/CAV-26' },
            ],
          },
          {
            title: 'Text Shadow, Per-Side Borders & Button States',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend', 'engine'],
            links: [
              { label: 'PR #1872', url: 'https://github.com/Cavai/Application-Frontend/pull/1872' },
              { label: 'CE #739', url: 'https://github.com/Cavai/Creative-Engine/pull/739' },
            ],
          },
          {
            title: 'Builder Ruler System + Grid Overlay',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1882', url: 'https://github.com/Cavai/Application-Frontend/pull/1882' },
            ],
            // TODO: uncomment when deployed to Cloudflare Pages
            // video: { src: 'https://cavai-release-notes.pages.dev/2026-05/rulers-demo.mp4', chapters: [...] },
          },
          {
            title: 'Release Notes-nettside og CLI-verktøy',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'tooling'],
            links: [
              { label: 'Live site', url: 'https://cavai-release-notes.pages.dev/' },
              { label: 'CAV-108', url: 'https://linear.app/cavai/issue/CAV-108' },
            ],
          },
          {
            title: 'Library Script: video-sammenligning, custom CSS class inputs',
            client: 'Cavai Product',
            category: 'product',
            tags: ['improvement', 'frontend'],
            links: [
              { label: 'PR #1878', url: 'https://github.com/Cavai/Application-Frontend/pull/1878' },
            ],
          },
          {
            title: '1080x1920 Format Preset',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1879', url: 'https://github.com/Cavai/Application-Frontend/pull/1879' },
            ],
          },
          {
            title: 'Flow venter på operator-animasjoner før den avanserer',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'engine'],
            links: [
              { label: 'CAV-114', url: 'https://linear.app/cavai/issue/CAV-114' },
            ],
          },
          {
            title: 'Builder Theming System, scrub inputs og visuell polish',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1842', url: 'https://github.com/Cavai/Application-Frontend/pull/1842' },
            ],
          },
          {
            title: 'Handle video autoplay rejection gracefully',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'engine'],
            links: [
              { label: 'CE #741', url: 'https://github.com/Cavai/Creative-Engine/pull/741' },
            ],
          },
          {
            title: 'Viewability tracking fix for expandable creatives',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'engine'],
            links: [
              { label: 'CE #737', url: 'https://github.com/Cavai/Creative-Engine/pull/737' },
            ],
          },
          {
            title: 'Misc fixes: preview, build progress, enterprise admin, image upload',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'frontend'],
            links: [
              { label: 'PR #1880', url: 'https://github.com/Cavai/Application-Frontend/pull/1880' },
            ],
          },
        ],
      },
      {
        month: 'April',
        items: [
          {
            title: 'ChangeVideo & ChangeImage redesign med before/after-preview og chained changes',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1839', url: 'https://github.com/Cavai/Application-Frontend/pull/1839' },
              { label: 'CAV-116', url: 'https://linear.app/cavai/issue/CAV-116' },
            ],
          },
          {
            title: 'Dev Tools Overhaul: DataTracker, Analytics Monitor, JSON Viewer',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend', 'engine'],
            links: [
              { label: 'PR #1858', url: 'https://github.com/Cavai/Application-Frontend/pull/1858' },
            ],
            video: {
              src: 'https://cavai-release-notes.pages.dev/2026-04/dev-tools-demo.mp4',
              chapters: [
                { title: 'JSON Provider', time: 0 },
                { title: 'Analytics Monitor', time: 24 },
                { title: 'Panels and Layout', time: 36 },
                { title: 'DataTracker', time: 64 },
                { title: 'JSON Viewer', time: 85 },
              ],
            },
          },
          {
            title: 'Library Script: video-params, @requires-filtrering, responsive video swap',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1838', url: 'https://github.com/Cavai/Application-Frontend/pull/1838' },
              { label: 'SL #1', url: 'https://github.com/Cavai/Script-Library/pull/1' },
              { label: 'CAV-117', url: 'https://linear.app/cavai/issue/CAV-117' },
            ],
          },
          {
            title: 'Preview UX: lightweight mobile preview, zoom-persistering, bedre sentrering',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1849', url: 'https://github.com/Cavai/Application-Frontend/pull/1849' },
              { label: 'CAV-164', url: 'https://linear.app/cavai/issue/CAV-164' },
            ],
          },
          {
            title: 'Save/Publish/Preview knapp-UX + cross-browser scrollbar-fix',
            client: 'Cavai Product',
            category: 'product',
            tags: ['improvement', 'frontend'],
            links: [
              { label: 'CAV-165', url: 'https://linear.app/cavai/issue/CAV-165' },
            ],
          },
          {
            title: 'Fix: firstClick-metrikk (interacted) sluttet a fyre',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'engine', 'analytics'],
            links: [
              { label: 'CAV-166', url: 'https://linear.app/cavai/issue/CAV-166' },
            ],
          },
          {
            title: '"Only CSS" HTML-mal med 0x0 size og pointer-events none',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'CAV-107', url: 'https://linear.app/cavai/issue/CAV-107' },
            ],
          },
          {
            title: 'Fix: Expandable header dekket hele kreativet og blokkerte interaksjon',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'frontend'],
            links: [
              { label: 'CAV-40', url: 'https://linear.app/cavai/issue/CAV-40' },
            ],
          },
          {
            title: 'Fix: SliderBlock crash ved ShowHide (unmount av skjult blokk)',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'engine'],
            links: [
              { label: 'CAV-112', url: 'https://linear.app/cavai/issue/CAV-112' },
            ],
          },
        ],
      },
      {
        month: 'Mars',
        items: [
          {
            title: 'Block Animation System: 20+ presets, visuell bezier-editor, copy/paste, flow-animasjoner',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend', 'engine'],
            links: [
              { label: 'PR #1806', url: 'https://github.com/Cavai/Application-Frontend/pull/1806' },
              { label: 'CE #706', url: 'https://github.com/Cavai/Creative-Engine/pull/706' },
              { label: 'CAV-38', url: 'https://linear.app/cavai/issue/CAV-38' },
            ],
            video: {
              src: 'https://cavai-release-notes.pages.dev/2026-03/animation-demo-full.mp4',
            },
          },
          {
            title: 'Library Script Operator i Flow Editor',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1819', url: 'https://github.com/Cavai/Application-Frontend/pull/1819' },
              { label: 'CC #106', url: 'https://github.com/Cavai/Creative-Composer/pull/106' },
            ],
          },
          {
            title: 'Builder & Template Polish: nye knapp/HTML-maler, kode-editor, border radius',
            client: 'Cavai Product',
            category: 'product',
            tags: ['improvement', 'frontend'],
            links: [
              { label: 'PR #1818', url: 'https://github.com/Cavai/Application-Frontend/pull/1818' },
            ],
          },
          {
            title: 'Upload Toast UX: progress bar og rotererende statusmeldinger',
            client: 'Cavai Product',
            category: 'product',
            tags: ['improvement', 'frontend'],
            links: [
              { label: 'PR #1809', url: 'https://github.com/Cavai/Application-Frontend/pull/1809' },
              { label: 'CAV-30', url: 'https://linear.app/cavai/issue/CAV-30' },
            ],
          },
          {
            title: 'Template System UX-forbedring',
            client: 'Cavai Product',
            category: 'product',
            tags: ['improvement', 'frontend'],
            links: [
              { label: 'CAV-104', url: 'https://linear.app/cavai/issue/CAV-104' },
            ],
          },
          {
            title: 'Cavai MCP Server (AI-assistent med viewability-data)',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'tooling'],
          },
          {
            title: 'Unified State System for hover/active-stiler',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'engine'],
            links: [
              { label: 'CE #693', url: 'https://github.com/Cavai/Creative-Engine/pull/693' },
            ],
          },
          {
            title: 'Bugfixes: VAST/VPAID-tags, localStorage, form scroll, link block analytics m.m.',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'frontend', 'engine'],
          },
        ],
      },
      {
        month: 'Februar',
        items: [
          {
            title: 'Operator branding',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
          },
          {
            title: 'Flow table component filters',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
          },
        ],
      },
      {
        month: 'Januar',
        items: [
          {
            title: 'Double Midscroll Single Creative',
            client: 'Advantage',
            category: 'product',
            tags: ['feature'],
          },
          {
            title: 'Slider tease',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
          },
          {
            title: 'Context menu button',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
          },
          {
            title: 'Fix whitelabel title reset when switching between build tabs',
            client: 'Cavai Product',
            category: 'product',
            tags: ['bugfix', 'frontend'],
          },
          {
            title: 'Rename creatives in groups',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
          },
          {
            title: 'Select format when creating template',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────
  // 2025
  // ────────────────────────────────────────────
  {
    year: 2025,
    entries: [
      {
        month: 'Oktober',
        items: [
          {
            title: 'Refactor pan-zoom',
            client: 'Cavai Product',
            category: 'product',
            tags: ['improvement', 'frontend'],
            links: [
              { label: 'PR #1717', url: 'https://github.com/Cavai/Application-Frontend/pull/1717' },
            ],
          },
          {
            title: 'Specsavers responsive slider',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Cube with video on all sides',
            client: 'Cavai',
            category: 'creative',
          },
        ],
      },
      {
        month: 'September',
        items: [
          {
            title: 'Add form to builder',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend', 'engine'],
            links: [
              { label: 'PR #1710', url: 'https://github.com/Cavai/Application-Frontend/pull/1710' },
              { label: 'CE #659', url: 'https://github.com/Cavai/Creative-Engine/pull/659' },
            ],
          },
          {
            title: 'Tron',
            client: 'Cavai',
            category: 'creative',
            description: 'For Cecilie',
          },
        ],
      },
      {
        month: 'August',
        items: [
          {
            title: 'Add save creative with CMD/Ctrl+S',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1701', url: 'https://github.com/Cavai/Application-Frontend/pull/1701' },
            ],
          },
          {
            title: 'Add eyedropper tool to builder',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1698', url: 'https://github.com/Cavai/Application-Frontend/pull/1698' },
            ],
          },
        ],
      },
      {
        month: 'Juli',
        items: [
          {
            title: 'Refactor code editor',
            client: 'Cavai Product',
            category: 'product',
            tags: ['improvement', 'frontend'],
            links: [
              { label: 'PR #1683', url: 'https://github.com/Cavai/Application-Frontend/pull/1683' },
            ],
          },
          {
            title: 'Discovery API, BMW Lead Gen, Isuzu Lead Gen, National Lotterije, Wimbledon Live Feed, Marktplaats, P&O Cruises, Lead Form, FinancialLease, License banners, Gumgum floor banners',
            client: 'Cavai',
            category: 'creative',
            description: 'Haakon på ferie - tok over alle oppgaver',
          },
        ],
      },
      {
        month: 'Juni',
        items: [
          {
            title: 'Add padding controls and standardize offsets',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1679', url: 'https://github.com/Cavai/Application-Frontend/pull/1679' },
            ],
          },
          {
            title: 'Add Stack Adapt to supported ad servers list',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'frontend'],
            links: [
              { label: 'PR #1687', url: 'https://github.com/Cavai/Application-Frontend/pull/1687' },
            ],
          },
          {
            title: 'Enable padding rendering for visual blocks',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'engine'],
            links: [
              { label: 'CE #642', url: 'https://github.com/Cavai/Creative-Engine/pull/642' },
            ],
          },
        ],
      },
      {
        month: 'Mai',
        items: [
          {
            title: 'Forfremmet til frontendutvikler',
            client: 'Cavai',
            category: 'product',
            tags: ['milestone'],
          },
          {
            title: 'Mission Impossible 8',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Første commits: border size, Adnuntius adserver, copy choices fix, change prefix, TargetOpSelectorPalette fix',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature', 'bugfix', 'frontend'],
            links: [
              { label: '#1666', url: 'https://github.com/Cavai/Application-Frontend/pull/1666' },
              { label: '#1668', url: 'https://github.com/Cavai/Application-Frontend/pull/1668' },
              { label: '#1671', url: 'https://github.com/Cavai/Application-Frontend/pull/1671' },
              { label: '#1670', url: 'https://github.com/Cavai/Application-Frontend/pull/1670' },
              { label: '#1672', url: 'https://github.com/Cavai/Application-Frontend/pull/1672' },
            ],
          },
        ],
      },
      {
        month: 'April',
        items: [
          {
            title: 'Book of Mormon',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Thunderbolt',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Cola x The Voice Bubble',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Teriyaki Ninja',
            client: 'Cavai',
            category: 'creative',
          },
        ],
      },
      {
        month: 'Mars',
        items: [
          {
            title: 'Promotert til utvikler',
            client: 'Cavai',
            category: 'product',
            tags: ['milestone'],
          },
          {
            title: 'SNT',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Slot Machine',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Specsavers custom slider',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Cola x The Voice',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Color Line',
            client: 'Cavai',
            category: 'creative',
          },
        ],
      },
      {
        month: 'Februar',
        items: [
          {
            title: 'GeoGuessr hints + GeoGuessr w/o hints',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Lingot game',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Bridget Jones',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Wicked',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Kondomeriet wheel of fortune',
            client: 'Cavai',
            category: 'creative',
          },
        ],
      },
      {
        month: 'Januar',
        items: [
          {
            title: 'Specsavers Proposal',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Coca Cola Proposal',
            client: 'Cavai',
            category: 'creative',
          },
          {
            title: 'Image + video slider',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature'],
          },
          {
            title: 'Static Wrapper with responsive bg',
            client: 'Cavai Product',
            category: 'product',
            tags: ['feature'],
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────
  // 2024
  // ────────────────────────────────────────────
  {
    year: 2024,
    entries: [
      {
        month: 'Desember',
        items: [
          { title: 'BMW Skiskytterspillet og BMW quiz', client: 'Cavai', category: 'creative' },
          { title: 'Elvia Spenning eller tenning?', client: 'Cavai', category: 'creative' },
          { title: 'Elvia Hva skjer na?', client: 'Cavai', category: 'creative' },
          { title: 'MI:8 Mission Access', client: 'Cavai', category: 'creative' },
          { title: 'Showreel 2024', client: 'Cavai', category: 'creative' },
        ],
      },
      {
        month: 'November',
        items: [
          { title: 'Pizzabakeren x The Voice Showreel', client: 'Cavai', category: 'creative' },
          { title: 'Fang Frukten', client: 'Coop', category: 'creative' },
        ],
      },
      {
        month: 'Oktober',
        items: [
          { title: 'Coca Cola x TV2 Showreel', client: 'Cavai', category: 'creative' },
          { title: 'Ministerie van Buitenlandse Zaken', client: 'Cavai', category: 'creative' },
        ],
      },
      {
        month: 'Mai',
        items: [
          { title: 'Vlog Alessandra & Benjamin Ingrosso', client: 'Universal Music', category: 'music', roles: ['etterarbeid'] },
          { title: 'Vlog Alessandra Karaoke In Poland', client: 'Universal Music', category: 'music', roles: ['etterarbeid'] },
          { title: 'Joyride lyric video', client: 'Astrid S', category: 'music', roles: ['klipp'] },
        ],
      },
      {
        month: 'April',
        items: [
          { title: 'Skrivebord-video', client: 'Torshov1923', category: 'music', roles: ['video'] },
          { title: 'Bilder', client: 'Torshov1923', category: 'music', roles: ['foto'] },
        ],
      },
      {
        month: 'Januar',
        items: [
          { title: 'Erased U assets', client: 'trueandtrue', category: 'music', roles: ['klipp'] },
          { title: 'Skap-video', client: 'Torshov1923', category: 'music', roles: ['video'] },
          { title: 'Maxbo-videoer', client: 'Torshov1923', category: 'music', roles: ['video'] },
          { title: 'Festival Pitch-video', client: 'Universal Music', category: 'music', roles: ['klipp'] },
          { title: 'Ny Vokalist assets', client: 'Bratabrand', category: 'music', roles: ['klipp'] },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────
  // 2023
  // ────────────────────────────────────────────
  {
    year: 2023,
    entries: [
      {
        month: 'November',
        items: [
          { title: 'YouTube shorts (docu shorts)', client: 'Astrid S', category: 'music', roles: ['klipp'] },
          { title: 'Feed og InStock-reklamefilmer', client: 'iSYS', category: 'music', roles: ['klipp', 'grade'] },
          { title: 'Blindfold assets', client: 'trueandtrue', category: 'music', roles: ['klipp'] },
        ],
      },
      {
        month: 'Oktober',
        items: [
          { title: 'Q&A YouTube-video', client: 'Astrid S', category: 'music', roles: ['klipp'] },
          { title: 'YouTube shorts (docu shorts)', client: 'Astrid S', category: 'music', roles: ['klipp'] },
          { title: 'Music Video Reaction Video', client: 'Astrid S', category: 'music', roles: ['klipp'] },
        ],
      },
      {
        month: 'September',
        items: [
          { title: 'Q&A assets', client: 'Dagny', category: 'music', roles: ['klipp'] },
          { title: 'Live-video', client: 'Trygve Kongshavn', category: 'music', roles: ['klipp'] },
        ],
      },
      {
        month: 'Juni',
        items: [
          { title: 'Sitcom-intro', client: 'Dagny', category: 'music', roles: ['klipp'] },
        ],
      },
      {
        month: 'Mai',
        items: [
          { title: 'Festival-showreel', client: 'Astrid S', category: 'music', roles: ['klipp'] },
          { title: 'Lyric video', client: 'Alessandra', category: 'music', roles: ['klipp'] },
        ],
      },
      {
        month: 'Januar',
        items: [
          { title: 'Gangsta marketing assets', client: 'Eggi', category: 'music', roles: ['klipp', 'grade'] },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────
  // 2022
  // ────────────────────────────────────────────
  {
    year: 2022,
    entries: [
      {
        month: 'September',
        items: [
          { title: 'See u in Hell marketing asset', client: 'Torine', category: 'music', roles: ['klipp', 'grade', 'grafikk'] },
          { title: 'Alle Roser marketing asset', client: 'Sebastian Zalo & Emilie Lobato', category: 'music', roles: ['klipp'] },
          { title: 'Easy marketing asset', client: 'Emilie Nicolas', category: 'music', roles: ['klipp'] },
          { title: 'Så klart det gjør vondt (album) marketing assets', client: 'Ramon', category: 'music', roles: ['klipp'] },
          { title: 'Bitches marketing assets', client: 'Torine', category: 'music', roles: ['klipp', 'grade', 'grafikk'] },
          { title: 'Contrapoint musikkvideo + marketing assets', client: 'Hammok', category: 'music', roles: ['grade', 'fx'] },
          { title: 'Feel it coming in musikkvideo + marketing assets', client: 'CLMD', category: 'music', roles: ['klipp', 'fx', 'grade'] },
          { title: 'Highs and Lows lyric video', client: 'Dagny', category: 'music', roles: ['klipp', 'grade', 'grafikk'] },
          { title: 'If there is a heaven/Unholy-EP marketing assets', client: 'Torine', category: 'music', roles: ['klipp', 'grade', 'grafikk'] },
          { title: 'Nerve lyric video', client: 'Victoria Nadine', category: 'music', roles: ['teksting', 'versjonering', 'klipp'] },
          { title: 'Halloweensminke + Halloweengodterismaking', client: 'eMMa', category: 'music', roles: ['klipp', 'teksting', 'grade', 'grafisk'] },
        ],
      },
      {
        month: 'August',
        items: [
          { title: 'Jeg elsker deg, men - marketing assets', client: 'Ramon', category: 'music', roles: ['klipp'] },
          { title: 'I Come First marketing asset', client: 'Astrid S', category: 'music', roles: ['klipp', 'grade'] },
          { title: 'Høstturné marketing asset', client: 'Astrid S', category: 'music', roles: ['klipp', 'grade'] },
          { title: 'Easy Intern Universal Asset', client: 'Emilie Nicolas', category: 'music', roles: ['klipp', 'grade'] },
          { title: 'Vignett/intro', client: 'Torine', category: 'music', roles: ['klipp', 'grade', 'score'] },
        ],
      },
      {
        month: 'Juli',
        items: [
          { title: '24 timer assets', client: 'Sebastian Zalo & Gus Polden', category: 'music', roles: ['klipp'] },
          { title: 'Visuals for Slottsfjell Def Jam-arrangement', client: 'Universal Music', category: 'music', roles: ['klipp', 'animasjon'] },
          { title: 'Høstturné marketing assets', client: 'Astrid S', category: 'music', roles: ['klipp'] },
        ],
      },
      {
        month: 'Juni',
        items: [
          { title: 'Q&A vlog', client: 'eMMa', category: 'music', roles: ['klipp', 'subtitles', 'effekter'] },
          { title: 'VG-Lista assets', client: 'Universal Music', category: 'music', roles: ['klipp'] },
        ],
      },
      {
        month: 'Mai',
        items: [
          { title: 'Tester matnyheter', client: 'eMMa', category: 'music', roles: ['klipp', 'subtitles', 'effekter'] },
          { title: 'Talking head video', client: 'Hyre/Signicat', category: 'other', roles: ['grade'] },
        ],
      },
      {
        month: 'April',
        items: [
          { title: 'Brannbil (assets + intervju)', client: 'Tina & Bettina + Snow Boys', category: 'music', roles: ['klipp'] },
        ],
      },
      {
        month: 'Mars',
        items: [
          { title: 'Promomateriale/albumcover', client: 'Ushikawa', category: 'music', roles: ['foto', 'redigering'] },
          { title: 'Podcast teaser', client: 'Hanah', category: 'music', roles: ['klipp'] },
          { title: 'Du, Marketing Assets', client: 'Sebastian Zalo & Gus Polden', category: 'music', roles: ['klipp', 'grade'] },
          {
            title: 'Losing My Breath',
            client: 'CLMD',
            category: 'music',
            roles: ['klipp', 'sourcing', 'teasere'],
            links: [
              { label: 'Instagram', url: 'https://www.instagram.com/p/Cbw-yRODvJs/' },
            ],
          },
          { title: 'Bilder for Farmandstredet', client: 'Johanne', category: 'music', roles: ['redigering'] },
        ],
      },
      {
        month: 'Februar',
        items: [
          { title: 'TikTok reactions compilation på YouTube', client: 'Tina & Bettina', category: 'music', roles: ['klipp'] },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────
  // 2021
  // ────────────────────────────────────────────
  {
    year: 2021,
    entries: [
      {
        month: 'November',
        items: [
          { title: 'Feel - tekstanimasjon (tracking og maskering)', client: 'Marcus & Martinius', category: 'music', roles: ['vfx'] },
          { title: 'Pretty - filming, klipping og grading av IDs og Its Hits-klipp', client: 'Astrid S & Dagny', category: 'music', roles: ['filming', 'klipp', 'grade'] },
        ],
      },
      {
        month: 'Oktober',
        items: [
          {
            title: 'By:larm - film og foto: Jada, Torine, Rambow x 2, IMERIKA, Eggi, Cherie x 2, Maria Petra, Gus Polden',
            client: 'Universal Music',
            category: 'music',
            roles: ['film', 'foto'],
            links: [
              { label: 'Jada video', url: 'https://www.instagram.com/p/CUpMbGkAHI7/' },
              { label: 'Rambow bilder', url: 'https://www.instagram.com/p/CUlR99QtZWP/' },
              { label: 'IMERIKA video', url: 'https://www.instagram.com/p/CUsVXOXIo97/' },
            ],
          },
        ],
      },
      {
        month: 'September',
        items: [
          {
            title: 'BTS-video for Handsfree',
            client: 'Cherie',
            category: 'music',
            roles: ['film', 'klipp'],
            links: [
              { label: 'Del 1', url: 'https://www.instagram.com/p/CVYPdAdgrW5/' },
              { label: 'Del 2', url: 'https://www.instagram.com/p/CVazr9mgY_O/' },
            ],
          },
        ],
      },
      {
        month: 'August',
        items: [
          {
            title: 'BTS film og foto',
            client: 'Ezzari',
            category: 'music',
            roles: ['film', 'foto'],
            links: [
              { label: 'Instagram', url: 'https://www.instagram.com/p/CUsiN6to7ID/' },
            ],
          },
          {
            title: 'Albumcover for Gategutt og Skitne lægs + forsidebilde og coverbilde',
            client: 'Ezzari',
            category: 'music',
            roles: ['foto', 'design'],
            links: [
              { label: 'Spotify', url: 'https://open.spotify.com/artist/3RsYUwemRpPK8fXJigvmbp' },
              { label: 'Universal', url: 'https://www.instagram.com/p/CZEQQlxgc9I/' },
            ],
          },
        ],
      },
      {
        month: 'Juli',
        items: [
          {
            title: 'BTS-bilder og bakomfilm',
            client: 'Cherie Mwangi',
            category: 'music',
            roles: ['foto', 'film'],
            links: [
              { label: 'Bilder', url: 'https://www.instagram.com/p/CTNGUhKD6FQ/' },
              { label: 'Video', url: 'https://www.instagram.com/p/CTuvTKgAl_M/' },
            ],
          },
        ],
      },
      {
        month: 'Juni',
        items: [
          {
            title: 'Ekte Morrapuler teaser-videoer',
            client: 'Eggi',
            category: 'music',
            roles: ['manus', 'foto', 'etterarbeid'],
            links: [
              { label: 'Instagram', url: 'https://www.instagram.com/p/CQbNrnUhBbB/' },
            ],
          },
        ],
      },
      {
        month: 'Mai',
        items: [
          { title: 'Sizzle Reel', client: 'Ruben', category: 'music', roles: ['klipp', 'grafisk'] },
          { title: 'Everlasting Green (filmfoto, klipp, grade)', client: 'Ushikawa', category: 'music', roles: ['filmfoto', 'klipp', 'grade'] },
          {
            title: 'TikTok flips',
            client: 'JOKI',
            category: 'music',
            roles: ['filmfoto', 'klipp'],
            links: [
              { label: 'TikTok 1', url: 'https://www.tiktok.com/@jokiflips/video/6964742749069348101' },
              { label: 'TikTok 2', url: 'https://www.tiktok.com/@jokiflips/video/6971116842190458118' },
            ],
          },
          { title: 'I Oslo', client: 'eMMa', category: 'music', roles: ['klipp', 'teksting', 'oversetting'] },
          { title: 'Sizzle Reels for Astrid S, Dagny, TIX, Torine, CLMD, Ruben, IMERIKA, Marcus & Martinius, Emelie Hollow, JOKI', client: 'Universal Music', category: 'music', roles: ['klipp', 'grafisk'] },
        ],
      },
      {
        month: 'April',
        items: [
          { title: 'HSG Remake marketing assets', client: 'Astrid S', category: 'music', roles: ['klipp'] },
          { title: 'Det urolige hjertet', client: 'Gabrielle', category: 'music', roles: ['teksting'] },
          { title: 'Spotify Stories', client: 'Gabrielle', category: 'music', roles: ['klipp'] },
          {
            title: 'Bandbilder + albumcover',
            client: 'Ushikawa',
            category: 'music',
            roles: ['foto', 'design'],
            links: [
              { label: 'Spotify', url: 'https://open.spotify.com/artist/2wBxR4OkCwg0Q4JnsGGUgG' },
            ],
          },
          { title: 'Tester smågodt', client: 'eMMa', category: 'music', roles: ['klipp', 'teksting', 'oversetting'] },
          { title: 'FEED reklame', client: 'iSYS', category: 'other', roles: ['manus', 'filmfoto', 'klipp', 'grade'] },
        ],
      },
      {
        month: 'Mars',
        items: [
          {
            title: 'De Neste Instagram-vlogs x 5',
            client: 'Ylva',
            category: 'music',
            roles: ['klipp'],
            links: [
              { label: 'Instagram 1', url: 'https://www.instagram.com/p/CNcOyWAFCOS/' },
              { label: 'Instagram 2', url: 'https://www.instagram.com/p/CNsUOH4FTCF/' },
            ],
          },
        ],
      },
      {
        month: 'Februar',
        items: [
          { title: 'Naken BTS', client: 'Vidar Villa', category: 'music', roles: ['klipp'] },
          { title: 'Reaction video', client: 'Imerika', category: 'music', roles: ['klipp'] },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────
  // 2020
  // ────────────────────────────────────────────
  {
    year: 2020,
    entries: [
      {
        month: 'November',
        items: [
          { title: 'Odeon', client: 'S1sco', category: 'music', roles: ['filmfoto', 'klipp'] },
          { title: 'Dear God marketing assets', client: 'Ruben', category: 'music', roles: ['klipp'] },
        ],
      },
      {
        month: 'Juni/juli/august',
        items: [
          { title: 'Elsk/hat-forhold til Søndre', client: 'Ezzari', category: 'music', roles: ['regi', 'foto', 'klipp', 'manus'] },
        ],
      },
      {
        month: 'April',
        items: [
          { title: 'Y-SVING', client: null, category: 'music', roles: ['foto', 'klipp'] },
        ],
      },
    ],
  },
];
