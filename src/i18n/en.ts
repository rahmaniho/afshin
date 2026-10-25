import type { Translation } from './types';

export const en: Translation = {
  meta: {
    title: 'Afshin Rahmani | MSc in Plant Protection',
    description: 'Plant protection consulting, pest and disease diagnostics, fertilizer and pesticide guidance, and seed selection by Afshin Rahmani in Qazvin, Zanjan, Alborz, and Tehran.',
  },
  brand: { name: 'Afshin Rahmani', degree: 'MSc in Plant Protection' },
  language: { switchLabel: 'Change language' },
  nav: {
    navigationLabel: 'Main navigation',
    items: { services: 'Expertise', process: 'Consultation process', gallery: 'Field monitoring', journal: 'Articles' },
    request: 'Request consultation', mobileRequest: 'Request expert consultation', openMenu: 'Open menu', closeMenu: 'Close menu', home: 'Back to top',
  },
  hero: {
    badge: 'Afshin Rahmani · MSc in Plant Protection', titleLine1: 'Healthy crops', titlePrefix: 'grown with', titleEmphasis: 'insight.', titleSuffix: '',
    description: 'Pest and disease diagnostics plus expert guidance on fertilizers, pesticides, and seeds — supporting farms and orchards across Qazvin, Zanjan, Alborz, and Tehran.',
    primary: 'Request expert consultation', secondary: 'Explore services', scroll: 'Walk the field',
  },
  services: {
    eyebrow: '· Plant protection expertise', titleA: 'A healthy crop is no accident — it comes from', highlightA: 'accurate diagnosis', titleB: 'and', highlightB: 'thoughtful management', titleC: '. From soil and seed to leaf and fruit, I support your field at every step.',
    items: [
      { title: 'Pest & disease diagnostics', desc: 'Close examination of symptoms on leaves, stems, roots, and fruit to identify the cause and select a control approach suited to your farm or orchard.' },
      { title: 'Fertilizer & pesticide guidance', desc: 'Nutrition planning based on crop needs and test results, together with responsible pesticide recommendations grounded in diagnosis and the approved label.' },
      { title: 'Seed selection & field monitoring', desc: 'Seed selection for the local climate and crop, evaluation of plant establishment, and stage-by-stage monitoring for timely decisions.' },
    ],
  },
  process: {
    eyebrow: '· Consultation process', titleA: 'Three steps to a', highlight: 'healthy field',
    description: 'Every field has its own conditions. Recommendations follow a real understanding of the crop, climate, and observed symptoms — never a one-size-fits-all prescription.', cta: 'Request this service',
    steps: [
      { num: '01', title: 'Visit & sampling', desc: 'We begin by examining the farm or orchard and recording symptoms, from soil and irrigation conditions to the pattern of damage on the plants.' },
      { num: '02', title: 'Diagnosis & analysis', desc: 'Careful observation and, when needed, sample analysis help distinguish pests, disease, nutrient deficiency, and environmental stress.' },
      { num: '03', title: 'Recommendation & follow-up', desc: 'A practical plan for fertilizer, pesticide, seed, or growing-condition improvements, followed by review of the results at later stages.' },
    ],
  },
  stats: {
    eyebrow: '· Scope of service', titleA: 'One specialty,', highlight: 'beside your field',
    description: 'My measure is clear: a reliable diagnosis, a recommendation suited to the field, and follow-through until the right decision becomes clear.',
    items: [
      { num: '04', unit: 'Provinces served', sub: 'Qazvin, Zanjan, Alborz, and Tehran' },
      { num: '03', unit: 'Areas of expertise', sub: 'Fertilizers, pesticides, and seeds' },
      { num: '02', unit: 'Diagnostic perspectives', sub: 'Pest science and plant pathology' },
      { num: '01', unit: 'Plan for every field', sub: 'Tailored to your crop and conditions' },
    ],
    galleryTitle: 'Take a closer look at field monitoring',
    galleryDescription: 'Images of leaf symptoms, field inspection, and control practices — an introduction to the subjects involved in diagnosis and crop care.', galleryButton: 'View gallery',
  },
  testimonial: {
    eyebrow: '· Meet your consultant',
    mainAlt: 'Afshin Rahmani in an orchard', natureAlt: 'Afshin Rahmani outdoors', portraitAlt: 'Portrait of Afshin Rahmani in a green field',
    quoteA: 'Before any recommendation, we must listen to the land and the plant.', highlight: 'The right diagnosis', quoteB: ' is the first step toward effective control and responsible use of fertilizers and pesticides.',
    name: 'Afshin Rahmani', role: 'MSc in Plant Protection · Farm and orchard consultant',
  },
  journal: {
    eyebrow: '· Plant protection field journal', titleA: 'Notes from', highlight: 'the field', showAll: 'All articles', showLess: 'Show featured articles', readMore: 'Read article', close: 'Close article',
    reviewText: 'Are you seeing a similar symptom in your field or orchard? Share the crop and symptom details for a closer review.', reviewButton: 'Request a review',
    articles: [
      {
        id: 'yellow-leaves', date: 'October 2026', cat: 'Plant pathology', title: 'Yellow leaves: nutrient deficiency or disease?',
        excerpt: 'Yellowing is a symptom, not a diagnosis. Its distribution, leaf age, and root conditions can point the investigation in the right direction.', img: './images/leaf-disease.webp', readTime: '5 min read',
        content: [
          { type: 'paragraph', text: 'Yellow leaves are among the most common symptoms in farms and orchards, but fertilizer deficiency is not always the cause. Pests, disease, root injury, waterlogging, and even reactions to some pesticides can produce similar signs.' },
          { type: 'heading', text: 'Read the pattern' },
          { type: 'list', items: ['Uniform yellowing of older leaves may be associated with a deficiency of certain macronutrients.', 'Green veins with yellow tissue between them on young leaves calls for a closer look at iron availability and soil conditions.', 'Defined spots, colored halos, fungal growth, or soft tissue should be investigated more closely for disease or localized injury.'] },
          { type: 'heading', text: 'From symptom to diagnosis' },
          { type: 'paragraph', text: 'Before acting, compare healthy and symptomatic plants for leaf age, soil moisture, root condition, and previous fertilizer or pesticide applications. Distribution across the field also matters: a uniform or row-shaped pattern often has a different cause from scattered patches.' },
          { type: 'paragraph', text: 'Soil or leaf analysis and a close sample review provide a stronger basis for decision-making. Treating from a single photograph can hide the real cause.' },
        ],
      },
      {
        id: 'pest-monitoring', date: 'September 2026', cat: 'Pest science', title: 'Pest monitoring: why counts matter more than guesses',
        excerpt: 'Sound control begins with regular visits and population records — not with spotting a few insects and rushing to spray.', img: './images/wheat-inspection.webp', readTime: '6 min read',
        content: [
          { type: 'paragraph', text: 'Monitoring means observing, counting, and recording change. The presence of a pest alone does not justify chemical intervention. Population density, crop stage, natural enemies, and weather must also be considered.' },
          { type: 'heading', text: 'A consistent inspection route' },
          { type: 'list', items: ['Sample several defined, distributed points in the field rather than only its edges.', 'Inspect upper and lower leaf surfaces, young shoots, and roots when needed.', 'Record pest counts, the percentage of affected plants, natural enemies, and the date.', 'Use similar photo angles and distances so weekly comparisons remain meaningful.'] },
          { type: 'heading', text: 'Decide with thresholds' },
          { type: 'paragraph', text: 'Action thresholds differ by pest and crop and should come from trusted local guidance and specialist advice. Comparing records across visits shows whether the population is increasing or natural controls are keeping it in check.' },
          { type: 'paragraph', text: 'This approach reduces unnecessary interventions, protects beneficial organisms, and helps choose a more effective time for control.' },
        ],
      },
      {
        id: 'seed-climate', date: 'September 2026', cat: 'Seed & climate', title: 'Choosing seed for the climate of Qazvin and Zanjan',
        excerpt: 'The right variety is not simply the highest-yielding one. Growing period, cold adaptation, seed quality, and the goal of planting all matter.', img: './images/wheat-seed.webp', readTime: '5 min read',
        content: [
          { type: 'paragraph', text: 'In cold and semi-cold regions, variety selection should align with planting date, water resources, the risk of late-winter frost, and time to maturity. A variety’s performance elsewhere does not guarantee the same result in your field.' },
          { type: 'heading', text: 'Before buying seed' },
          { type: 'list', items: ['Check certified seed, the label, batch number, purity, and germination information.', 'Review the field’s disease history and the variety’s response to important regional diseases.', 'Match planting date and growing period to local weather and the irrigation plan.', 'Ask a trusted supplier about seed origin and storage conditions.'] },
          { type: 'heading', text: 'From planting to establishment' },
          { type: 'paragraph', text: 'Seedbed quality, planting depth, and suitable moisture are essential for early establishment. After emergence, assess plant density and uniformity at several points; these observations also inform the nutrition and monitoring plan.' },
        ],
      },
      {
        id: 'orchard-seasons', date: 'August 2026', cat: 'Orchard monitoring', title: 'Year-round orchard monitoring: winter dormancy to harvest',
        excerpt: 'A consistent orchard inspection calendar helps spot pests and diseases before they spread and keeps every action on schedule.', img: './images/orchard-monitoring.webp', readTime: '7 min read',
        content: [
          { type: 'paragraph', text: 'Orchard monitoring is not limited to the growing season. During winter dormancy, branches, wounds, and potential pest overwintering sites can be examined. During growth, changes in populations and symptoms should be tracked.' },
          { type: 'heading', text: 'What to check at each stage' },
          { type: 'list', items: ['Before bud break: inspect branches, trunks, and records of last season’s damage.', 'Bud break and flowering: record weather and inspect delicate young tissue closely.', 'Fruit development: monitor pests, water stress, and nutritional symptoms without hasty intervention.', 'Harvest and beyond: record crop quality, storage symptoms, and priorities for next season.'] },
          { type: 'paragraph', text: 'Across Alborz, Tehran, Qazvin, and Zanjan, crop type and individual orchard conditions determine exact visit timing. Dated, located observations make changes easier to understand from one year to the next.' },
        ],
      },
      {
        id: 'resistance-management', date: 'June 2026', cat: 'Control management', title: 'Responsible spraying and pest resistance management',
        excerpt: 'Correct target selection, label compliance, safety equipment, and rotation of chemical groups are key parts of a responsible program.', img: './images/crop-spraying.webp', readTime: '6 min read',
        content: [
          { type: 'paragraph', text: 'Pesticides are control tools, not substitutes for diagnosis. The pest or disease agent must first be identified, then a registered product selected for that crop and target. Rate, timing, pre-harvest interval, and personal protective equipment must follow the approved label.' },
          { type: 'heading', text: 'Why resistance develops' },
          { type: 'paragraph', text: 'Repeated use of products with the same mode of action selects for resistant populations. Unnecessary applications and incorrect rates can also make control harder and harm natural enemies.' },
          { type: 'heading', text: 'Principles for reducing risk' },
          { type: 'list', items: ['Combine cultural, biological, and physical methods with chemical control.', 'Manage mode-of-action groups using the label and trusted guidance.', 'Avoid improvised mixtures or higher rates in pursuit of a faster result.', 'Check wind, temperature, equipment calibration, and worker safety before application.'] },
          { type: 'paragraph', text: 'This article does not replace the pesticide label, national regulations, or advice from an on-site specialist.' },
        ],
      },
      {
        id: 'rust-diagnosis', date: 'June 2026', cat: 'Plant pathology', title: 'How to recognize rust diseases earlier',
        excerpt: 'Colored pustules on leaves and stems can indicate rust disease. Timely recognition helps guide an appropriate response.', img: './images/leaf-rust.webp', readTime: '4 min read',
        content: [
          { type: 'paragraph', text: 'Rust diseases are caused by fungi and often appear as yellow, orange, brown, or black pustules or spots on plant tissue. Their appearance varies with the host plant and disease stage.' },
          { type: 'heading', text: 'What to record' },
          { type: 'list', items: ['The precise location of pustules on upper or lower leaf surfaces and stems.', 'The color of symptoms and how it changes over several days.', 'The percentage of affected leaves and the distribution of symptoms in the field.', 'Moisture, dew, and temperature conditions as symptoms spread.'] },
          { type: 'paragraph', text: 'Sampling freshly affected tissue and obtaining a specialist review can improve diagnostic accuracy. Variety, planting date, canopy density, and moisture management also belong in a complete control plan.' },
        ],
      },
    ],
  },
  quote: {
    eyebrow: '· Consultation and site-visit request', titleLine1: 'For a healthier field', titleEmphasis: 'let’s start a conversation',
    description: 'Tell us about the crop, location, and symptoms. The more precise the details, the clearer the first review will be.',
    name: 'Full name *', phone: 'Phone number *', email: 'Email (optional)', address: 'Province and city', project: 'Request type', size: 'Approximate area', timeline: 'When would you like to start?', notes: 'Describe the crop and symptoms',
    namePlaceholder: 'Your name', phonePlaceholder: '0912 123 4567', addressPlaceholder: 'For example, Qazvin, Abik', notesPlaceholder: 'Crop, plant age, symptom location, and when it started…',
    projectOptions: [
      { value: 'diagnosis', label: 'Pest or disease diagnosis' }, { value: 'nutrition', label: 'Fertilizer and nutrition plan' }, { value: 'pesticide', label: 'Pesticide and control guidance' }, { value: 'seed', label: 'Seed selection' }, { value: 'field', label: 'Farm or orchard visit and monitoring' },
    ],
    sizeOptions: [
      { value: 'under1', label: 'Under 1 hectare' }, { value: '1to5', label: '1–5 hectares' }, { value: '5to20', label: '5–20 hectares' }, { value: 'over20', label: 'More than 20 hectares' }, { value: 'small', label: 'Small orchard or greenhouse' },
    ],
    timelineOptions: [
      { value: 'urgent', label: 'As soon as possible' }, { value: 'month', label: 'Within a month' }, { value: 'season', label: 'This season' }, { value: 'planning', label: 'I am planning ahead' },
    ],
    submit: 'Submit consultation request', loading: 'Saving…', successButton: 'Request saved', errorButton: 'Try again',
    saveSuccess: 'Your request was saved successfully in this browser.', saveError: 'The request could not be saved in this browser. Check storage permissions and try again.',
    privacyLine1: 'Your information is kept private.', privacyLine2: 'In this version, requests are stored only in your browser.',
    errors: { name: 'Please enter your full name.', phone: 'Enter an 11-digit Iranian phone number including its area or mobile code.', email: 'The email format is not valid.' },
  },
  footer: {
    description: 'Specialist advice on pest and disease diagnostics, fertilizers, pesticides, and seeds — focused on accurate diagnosis and solutions suited to each farm and orchard.', regions: ['Qazvin', 'Zanjan', 'Alborz', 'Tehran'],
    servicesTitle: 'Services', services: ['Pest & disease diagnostics', 'Fertilizer & pesticide guidance', 'Seed selection', 'Farm and orchard monitoring'], resourcesTitle: 'Quick links',
    resources: [{ id: 'gallery', label: 'Field monitoring gallery' }, { id: 'process', label: 'Consultation process' }, { id: 'journal', label: 'Expert articles' }, { id: 'quote', label: 'Request a visit' }],
    activityTitle: 'Area of activity',
    activity: { regions: 'Qazvin, Zanjan, Alborz, and Tehran', visits: 'Visits by prior arrangement', degree: 'MSc in Plant Protection', diagnostics: 'Pest science and plant pathology', inputs: 'Fertilizer, pesticide, and seed guidance' },
    copyright: '© 2026 Afshin Rahmani · All rights reserved.', principles: 'Scientific diagnosis · Responsible advice · Field follow-up',
  },
  controls: {
    settings: 'Field settings', title: 'Field controls', stage: 'Stage {current} of {total}', windStrength: 'Wind strength', windSpeed: 'Wind speed', mouseRadius: 'Mouse radius', fogDensity: 'Fog density', hint: 'Move your cursor across the page — the grass parts as you pass.',
  },
  gallery: {
    dialogLabel: 'Plant monitoring gallery', eyebrow: '· Plant protection gallery', titleA: 'Images for', highlight: 'diagnosis and monitoring',
    description: 'An educational collection covering plant symptoms, farm and orchard monitoring, seed selection, and control practices. Select any image for details.', close: 'Close gallery', all: 'All', empty: 'No images have been added to this category yet.',
    ctaTitle: 'Do these images relate to your situation?', ctaText: 'Share your crop and symptom details so the right review and consultation path can be identified.', ctaButton: 'Request consultation', closeImage: 'Close image', previous: 'Previous image', next: 'Next image', fullView: 'full view',
    items: [
      { id: 'leaf-diagnosis', title: 'Examining leaf spots', location: 'Farms and orchards', type: 'Disease diagnosis', category: 'diagnosis', season: 'Visual guide', sqft: 'Leaf monitoring', blurb: 'Spots, colored halos, and changes in leaf tissue are important starting clues. Recording symptom location and comparing healthy and affected leaves helps clarify the diagnostic path.', image: './images/leaf-disease.webp' },
      { id: 'pest-scouting', title: 'Farm visits and monitoring', location: 'Qazvin and Zanjan', type: 'Pest science', category: 'pests', season: 'Regular monitoring', sqft: 'Symptom records', blurb: 'Regular visits to several points in a field and recording pest populations support timely decisions and help avoid unnecessary control.', image: './images/wheat-inspection.webp' },
      { id: 'seed-selection', title: 'Evaluating varieties and seed quality', location: 'Cold and semi-cold regions', type: 'Seed & climate', category: 'seed', season: 'Before planting', sqft: 'Variety selection', blurb: 'Seed selection considers climate, planting date, growing period, and germination quality. Performance in one region is not a sufficient measure for every field.', image: './images/wheat-seed.webp' },
      { id: 'orchard-review', title: 'An overview of orchard structure', location: 'Alborz and Tehran', type: 'Orchard monitoring', category: 'orchard', season: 'Four seasons', sqft: 'Farm and orchard', blurb: 'Understanding planting patterns, rows, and overall orchard conditions is an important part of visit and sampling planning. Aerial images can reveal broad inconsistencies more clearly.', image: './images/orchard-monitoring.webp' },
      { id: 'safe-spraying', title: 'Control with safety in mind', location: 'Farms and greenhouses', type: 'Control & pesticides', category: 'control', season: 'Responsible application', sqft: 'Follow the label', blurb: 'After diagnosis and selection of a control method, equipment calibration, weather, personal protective equipment, and label directions must be followed carefully.', image: './images/crop-spraying.webp' },
      { id: 'rust-diagnosis', title: 'Sampling rust symptoms', location: 'Farms and orchards', type: 'Disease diagnosis', category: 'diagnosis', season: 'Fresh symptoms', sqft: 'Sample review', blurb: 'The color and location of pustules on leaves and stems provide valuable clues for rust investigation. Fresh samples and environmental records support a more accurate diagnosis.', image: './images/leaf-rust.webp' },
    ],
  },
};
