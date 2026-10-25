import type { Translation } from './types';

export const tr: Translation = {
  meta: {
    title: 'Afshin Rahmani | Bitki Koruma Yüksek Lisans Uzmanı',
    description: 'Afshin Rahmani ile Kazvin, Zencan, Elburz ve Tahran’da bitki koruma danışmanlığı, zararlı ve hastalık teşhisi, gübre, pestisit ve tohum seçimi.',
  },
  brand: { name: 'Afshin Rahmani', degree: 'Bitki Koruma Yüksek Lisans Uzmanı' },
  language: { switchLabel: 'Dili değiştir' },
  nav: {
    items: { services: 'Uzmanlık alanları', process: 'Danışmanlık süreci', gallery: 'Arazi takibi', journal: 'Makaleler' },
    request: 'Danışmanlık isteyin', mobileRequest: 'Uzman danışmanlığı isteyin', openMenu: 'Menüyü aç', closeMenu: 'Menüyü kapat', home: 'Sayfanın başına dön',
  },
  hero: {
    badge: 'Mühendis Afshin Rahmani · Bitki Koruma Yüksek Lisans Uzmanı', titleLine1: 'Sağlıklı tarla', titlePrefix: 'doğru', titleEmphasis: 'teşhisle', titleSuffix: 'başlar.',
    description: 'Zararlı ve hastalık teşhisi ile gübre, pestisit ve tohum konularında uzman danışmanlığı; Kazvin, Zencan, Elburz ve Tahran’da tarlanızın ve bahçenizin yanında.',
    primary: 'Uzman danışmanlığı isteyin', secondary: 'Hizmetleri inceleyin', scroll: 'Tarlayı keşfedin',
  },
  services: {
    eyebrow: '· Bitki koruma uzmanlığı', titleA: 'Sağlıklı ürün tesadüf değildir;', highlightA: 'doğru teşhis', titleB: 've', highlightB: 'doğru yönetimin', titleC: 'sonucudur. Toprak ve tohum incelemesinden yaprak ve meyve takibine kadar tarlanızın yanındayım.',
    items: [
      { title: 'Zararlı ve hastalık teşhisi', desc: 'Zararın nedenini belirlemek ve tarlaya veya bahçeye uygun mücadele yöntemini seçmek için yaprak, gövde, kök ve meyvedeki belirtilerin ayrıntılı incelenmesi.' },
      { title: 'Gübre ve pestisit danışmanlığı', desc: 'Ürün ihtiyacı ve analiz sonuçlarına göre besleme planı; teşhis ve onaylı etikete dayalı sorumlu pestisit önerileri.' },
      { title: 'Tohum seçimi ve arazi takibi', desc: 'İklim ve ürüne uygun tohum seçimi, bitki tutumunun değerlendirilmesi ve zamanında karar için aşamalı arazi takibi.' },
    ],
  },
  process: {
    eyebrow: '· Danışmanlık süreci', titleA: 'Sağlıklı bir tarlaya', highlight: 'üç adım',
    description: 'Her tarlanın kendi koşulları vardır. Bu nedenle öneriler ürün, iklim ve gerçek belirtiler anlaşıldıktan sonra hazırlanır; herkese aynı reçete uygulanmaz.', cta: 'Bu hizmeti isteyin',
    steps: [
      { num: '01', title: 'Ziyaret ve örnekleme', desc: 'Tarla veya bahçenin incelenmesi ve belirtilerin kaydıyla başlarız; toprak ve sulama koşullarından bitkideki zararın dağılımına kadar.' },
      { num: '02', title: 'Teşhis ve analiz', desc: 'Dikkatli gözlem ve gerektiğinde örnek incelemesiyle zararlı, hastalık, besin eksikliği ve çevresel stres birbirinden ayrılır.' },
      { num: '03', title: 'Öneri ve takip', desc: 'Gübre, pestisit, tohum veya yetiştirme koşulları için uygulanabilir bir plan sunulur ve sonraki aşamalarda sonuçlar takip edilir.' },
    ],
  },
  stats: {
    eyebrow: '· Hizmet kapsamı', titleA: 'Tek uzmanlık,', highlight: 'tarlanızın yanında',
    description: 'Ölçütüm nettir: güvenilir teşhis, tarlaya uygun öneri ve doğru karara ulaşana kadar sonuç takibi.',
    items: [
      { num: '04', unit: 'Hizmet verilen il', sub: 'Kazvin, Zencan, Elburz ve Tahran' },
      { num: '03', unit: 'Uzmanlık alanı', sub: 'Gübre, pestisit ve tohum' },
      { num: '02', unit: 'Teşhis yaklaşımı', sub: 'Zararlı bilimi ve bitki hastalıkları' },
      { num: '01', unit: 'Her tarlaya özel plan', sub: 'Ürününüze ve koşullarınıza göre' },
    ],
    galleryTitle: 'Arazi takibini yakından görün', galleryDescription: 'Yaprak belirtileri, arazi incelemesi ve mücadele uygulamalarından görüntüler; teşhis ve ürün bakımı konularını tanıyın.', galleryButton: 'Galeriyi görüntüle',
  },
  testimonial: {
    quoteA: 'Her öneriden önce toprağı ve bitkiyi dinlemek gerekir.', highlight: 'Doğru teşhis', quoteB: ', etkili mücadele ile gübre ve pestisitlerin ölçülü kullanımına giden ilk adımdır.',
    name: 'Mühendis Afshin Rahmani', role: 'Bitki Koruma Yüksek Lisans Uzmanı · Tarla ve bahçe danışmanı',
  },
  journal: {
    eyebrow: '· Bitki koruma arazi günlüğü', titleA: 'Tarladan', highlight: 'notlar', showAll: 'Tüm makaleler', showLess: 'Seçili makaleleri göster', readMore: 'Makaleyi oku', close: 'Makaleyi kapat',
    reviewText: 'Tarlanızda veya bahçenizde benzer bir belirti mi görüyorsunuz? Daha ayrıntılı inceleme için ürün ve belirti bilgilerini paylaşın.', reviewButton: 'İnceleme isteyin',
    articles: [
      {
        id: 'yellow-leaves', date: 'Ekim 2026', cat: 'Bitki hastalıkları', title: 'Sararan yapraklar; besin eksikliği mi hastalık mı?',
        excerpt: 'Yaprak sararması bir teşhis değil, belirtidir. Dağılım şekli, yaprak yaşı ve kök koşulları incelemenin yönünü belirleyebilir.', img: './images/leaf-disease.webp', readTime: '5 dk okuma',
        content: [
          { type: 'paragraph', text: 'Yaprak sararması tarla ve bahçelerde en sık görülen belirtilerdendir; ancak nedeni her zaman gübre eksikliği değildir. Zararlılar, hastalıklar, kök yaralanması, su birikmesi ve hatta bazı pestisitlere verilen tepki benzer belirtiler oluşturabilir.' },
          { type: 'heading', text: 'Belirti şeklini okuyun' },
          { type: 'list', items: ['Yaşlı yapraklarda düzenli sararma, bazı makro besinlerin eksikliğiyle ilişkili olabilir.', 'Genç yapraklarda damarların yeşil kalıp damar aralarının sararması, demir durumu ve toprak koşullarının incelenmesini gerektirir.', 'Belirgin lekeler, renkli haleler, fungal gelişim veya dokuda yumuşama hastalık ya da yerel zarar yönünden incelenmelidir.'] },
          { type: 'heading', text: 'Belirtiden teşhise' },
          { type: 'paragraph', text: 'Uygulamadan önce sağlıklı ve belirtili bitkileri yaprak yaşı, toprak nemi, kök durumu ve önceki gübreleme veya ilaçlama açısından karşılaştırın. Belirtilerin tarladaki dağılımı da önemlidir; düzgün veya sıra şeklindeki dağılımın nedeni genellikle dağınık lekelerden farklıdır.' },
          { type: 'paragraph', text: 'Toprak veya yaprak analizi ve ayrıntılı örnek incelemesi daha sağlam bir karar temeli sağlar. Yalnızca bir fotoğrafa bakarak uygulama yapmak gerçek nedeni gizleyebilir.' },
        ],
      },
      {
        id: 'pest-monitoring', date: 'Eylül 2026', cat: 'Zararlı bilimi', title: 'Zararlı takibi; sayım neden tahminden önemlidir?',
        excerpt: 'Doğru mücadele düzenli ziyaret ve populasyon kaydıyla başlar; birkaç böcek görüp aceleyle ilaçlamakla değil.', img: './images/wheat-inspection.webp', readTime: '6 dk okuma',
        content: [
          { type: 'paragraph', text: 'Takip; gözlemek, saymak ve değişimi kaydetmektir. Bir zararlının varlığı tek başına kimyasal müdahale için yeterli değildir. Populasyon yoğunluğu, ürün dönemi, doğal düşmanlar ve hava koşulları da değerlendirilmelidir.' },
          { type: 'heading', text: 'Düzenli bir inceleme rotası' },
          { type: 'list', items: ['Yalnızca kenarlardan değil, tarlada belirlenmiş ve dağılmış birkaç noktadan örnek alın.', 'Yaprakların üst ve alt yüzlerini, genç sürgünleri ve gerektiğinde kökleri inceleyin.', 'Zararlı sayısını, etkilenen bitki oranını ve doğal düşmanların varlığını tarihle kaydedin.', 'Haftalık karşılaştırma için fotoğrafları benzer açı ve mesafeden çekin.'] },
          { type: 'heading', text: 'Eşik değere göre karar' },
          { type: 'paragraph', text: 'Müdahale eşiği her zararlı ve ürün için farklıdır; güvenilir yerel kaynaklardan ve uzman önerisinden alınmalıdır. Ziyaretler arasındaki kayıtlar, populasyonun arttığını mı yoksa doğal etkenlerle baskılandığını mı gösterir.' },
          { type: 'paragraph', text: 'Bu yaklaşım gereksiz müdahaleleri azaltır, yararlı organizmaları korur ve daha etkili bir mücadele zamanı seçmeye yardımcı olur.' },
        ],
      },
      {
        id: 'seed-climate', date: 'Eylül 2026', cat: 'Tohum ve iklim', title: 'Kazvin ve Zencan iklimine uygun tohum seçimi',
        excerpt: 'Uygun çeşit yalnızca yüksek verimli çeşit değildir. Vegetasyon süresi, soğuğa uyum, tohum kalitesi ve ekim amacı da belirleyicidir.', img: './images/wheat-seed.webp', readTime: '5 dk okuma',
        content: [
          { type: 'paragraph', text: 'Soğuk ve yarı soğuk bölgelerde çeşit seçimi; ekim tarihi, su kaynakları, geç kış donu riski ve olgunlaşma süresiyle uyumlu olmalıdır. Bir çeşidin başka bölgedeki performansı, tarlanızda aynı sonucu garanti etmez.' },
          { type: 'heading', text: 'Tohum satın almadan önce' },
          { type: 'list', items: ['Sertifikalı tohumu, etiketi, parti numarasını, saflık ve çimlenme bilgilerini kontrol edin.', 'Tarlanın hastalık geçmişini ve çeşidin bölgedeki önemli hastalıklara tepkisini inceleyin.', 'Ekim tarihi ve vegetasyon süresini hava koşulları ve sulama planıyla eşleştirin.', 'Güvenilir satıcıya tohumun kaynağını ve depolama koşullarını sorun.'] },
          { type: 'heading', text: 'Ekimden bitki tutumuna' },
          { type: 'paragraph', text: 'Yatağın kalitesi, ekim derinliği ve uygun nem erken gelişim için önemlidir. Çıkıştan sonra birkaç noktada bitki sıklığını ve düzgünlüğünü değerlendirin; bu bilgiler besleme ve takip planına da katkı sağlar.' },
        ],
      },
      {
        id: 'orchard-seasons', date: 'Ağustos 2026', cat: 'Bahçe takibi', title: 'Dört mevsim bahçe takibi; kış dinlenmesinden hasada',
        excerpt: 'Düzenli bahçe ziyareti takvimi, zararlı ve hastalık belirtilerinin yayılmadan görülmesini ve işlemlerin zamanında yapılmasını sağlar.', img: './images/orchard-monitoring.webp', readTime: '7 dk okuma',
        content: [
          { type: 'paragraph', text: 'Bahçe takibi yalnızca yeşillenme dönemiyle sınırlı değildir. Kış dinlenmesinde dallar, yaralar ve zararlıların olası kışlama yerleri incelenebilir; büyüme döneminde populasyon ve belirtilerdeki değişim izlenir.' },
          { type: 'heading', text: 'Her aşamada kontrol noktaları' },
          { type: 'list', items: ['Tomurcuk açımından önce: dal, gövde ve önceki yılın zarar kayıtlarını inceleyin.', 'Tomurcuklanma ve çiçeklenme: havayı kaydedin ve hassas genç dokuları yakından inceleyin.', 'Meyve gelişimi: acele müdahale etmeden zararlıları, su stresini ve beslenme belirtilerini izleyin.', 'Hasat ve sonrası: ürün kalitesini, depo belirtilerini ve gelecek sezonun planını kaydedin.'] },
          { type: 'paragraph', text: 'Elburz, Tahran, Kazvin ve Zencan’daki bahçelerde ürün türü ve bahçenin koşulları ziyaret zamanını belirler. Belirtinin tarihini ve yerini kaydetmek, yıllar arasındaki değişimi anlamayı kolaylaştırır.' },
        ],
      },
      {
        id: 'resistance-management', date: 'Haziran 2026', cat: 'Mücadele yönetimi', title: 'Doğru ilaçlama ve zararlı direncinin yönetimi',
        excerpt: 'Doğru hedef seçimi, etikete uyum, güvenlik ekipmanı ve kimyasal grupların rotasyonu sorumlu bir programın temelidir.', img: './images/crop-spraying.webp', readTime: '6 dk okuma',
        content: [
          { type: 'paragraph', text: 'Pestisit teşhisin yerine geçmez; bir mücadele aracıdır. Önce zararlı veya hastalık etmeni belirlenmeli, sonra o ürün ve hedef için ruhsatlı ürün seçilmelidir. Doz, zaman, hasat öncesi süre ve kişisel koruyucu ekipman onaylı etikete göre uygulanmalıdır.' },
          { type: 'heading', text: 'Direnç neden oluşur?' },
          { type: 'paragraph', text: 'Aynı etki mekanizmasına sahip pestisitlerin sürekli kullanımı, dirençli bireyleri seçer. Gereksiz uygulamalar ve yanlış dozlar da mücadeleyi zorlaştırabilir ve doğal düşmanlara zarar verebilir.' },
          { type: 'heading', text: 'Riski azaltma ilkeleri' },
          { type: 'list', items: ['Kültürel, biyolojik ve fiziksel yöntemleri kimyasal mücadeleyle birlikte kullanın.', 'Etki mekanizması gruplarını etiket ve güvenilir kılavuzlara göre yönetin.', 'Daha hızlı sonuç için gelişigüzel karışımlardan veya doz artırmaktan kaçının.', 'Uygulamadan önce rüzgâr, sıcaklık, ekipman kalibrasyonu ve çalışan güvenliğini kontrol edin.'] },
          { type: 'paragraph', text: 'Bu makale pestisit etiketinin, ulusal mevzuatın veya yerinde uzman değerlendirmesinin yerine geçmez.' },
        ],
      },
      {
        id: 'rust-diagnosis', date: 'Haziran 2026', cat: 'Bitki hastalıkları', title: 'Pas hastalıklarını erken nasıl tanırız?',
        excerpt: 'Yaprak ve gövdelerdeki renkli püstüller pas hastalığına işaret edebilir; erken teşhis uygun mücadeleyi kolaylaştırır.', img: './images/leaf-rust.webp', readTime: '4 dk okuma',
        content: [
          { type: 'paragraph', text: 'Pas hastalıklarına funguslar neden olur ve genellikle bitki dokusunda sarı, turuncu, kahverengi veya siyah püstül ya da lekelerle görülür. Belirtiler konukçu bitkiye ve hastalığın aşamasına göre değişir.' },
          { type: 'heading', text: 'Neler kaydedilmeli?' },
          { type: 'list', items: ['Püstüllerin yaprağın üst veya alt yüzünde ve gövdede tam olarak bulunduğu yer.', 'Belirtilerin rengi ve birkaç gün içindeki değişimi.', 'Etkilenen yaprak oranı ve belirtilerin tarladaki dağılımı.', 'Belirtiler yayılırken nem, çiy ve sıcaklık koşulları.'] },
          { type: 'paragraph', text: 'Yeni etkilenmiş dokudan örnek almak ve uzman incelemesi teşhisi güçlendirir. Çeşit, ekim tarihi, bitki sıklığı ve nem yönetimi de bütüncül mücadele planında yer almalıdır.' },
        ],
      },
    ],
  },
  quote: {
    eyebrow: '· Danışmanlık ve arazi ziyareti talebi', titleLine1: 'Tarlanızın sağlığı için', titleEmphasis: 'iletişime geçelim',
    description: 'Ürünü, konumu ve belirtileri yazın. Bilgiler ne kadar ayrıntılı olursa ilk inceleme o kadar net olur.',
    name: 'Ad soyad *', phone: 'Telefon numarası *', email: 'E-posta (isteğe bağlı)', address: 'İl ve şehir', project: 'Talep türü', size: 'Yaklaşık alan', timeline: 'Ne zaman başlamak istersiniz?', notes: 'Ürünü ve belirtileri açıklayın',
    namePlaceholder: 'Adınız', phonePlaceholder: '0912 123 4567', addressPlaceholder: 'Örneğin Kazvin, Abik', notesPlaceholder: 'Ürün, bitki yaşı, belirtinin yeri ve başlangıç zamanı…',
    projectOptions: [
      { value: 'diagnosis', label: 'Zararlı veya hastalık teşhisi' }, { value: 'nutrition', label: 'Gübre ve beslenme planı' }, { value: 'pesticide', label: 'Pestisit ve mücadele danışmanlığı' }, { value: 'seed', label: 'Tohum seçimi' }, { value: 'field', label: 'Tarla veya bahçe ziyareti ve takibi' },
    ],
    sizeOptions: [
      { value: 'under1', label: '1 hektardan az' }, { value: '1to5', label: '1–5 hektar' }, { value: '5to20', label: '5–20 hektar' }, { value: 'over20', label: '20 hektardan fazla' }, { value: 'small', label: 'Küçük bahçe veya sera' },
    ],
    timelineOptions: [
      { value: 'urgent', label: 'En kısa sürede' }, { value: 'month', label: 'Bir ay içinde' }, { value: 'season', label: 'Bu sezon' }, { value: 'planning', label: 'Şimdilik planlıyorum' },
    ],
    submit: 'Danışmanlık talebini gönder', loading: 'Kaydediliyor…', successButton: 'Talep kaydedildi', errorButton: 'Tekrar deneyin',
    saveSuccess: 'Talebiniz bu tarayıcıya başarıyla kaydedildi.', saveError: 'Talep tarayıcıya kaydedilemedi. Depolama iznini kontrol edip tekrar deneyin.',
    privacyLine1: 'Bilgileriniz gizli tutulur.', privacyLine2: 'Bu sürümde talepler yalnızca tarayıcınızda saklanır.',
    errors: { name: 'Lütfen adınızı ve soyadınızı girin.', phone: 'Alan veya cep koduyla birlikte 11 haneli İran telefon numarası girin.', email: 'E-posta biçimi geçerli değil.' },
  },
  footer: {
    description: 'Zararlı ve hastalık teşhisi, gübre, pestisit ve tohum seçiminde uzman danışmanlığı; doğru teşhis ve her tarla ile bahçeye uygun çözümlere odaklanır.', regions: ['Kazvin', 'Zencan', 'Elburz', 'Tahran'],
    servicesTitle: 'Hizmetler', services: ['Zararlı ve hastalık teşhisi', 'Gübre ve pestisit danışmanlığı', 'Tohum seçimi', 'Tarla ve bahçe takibi'], resourcesTitle: 'Hızlı bağlantılar',
    resources: [{ id: 'gallery', label: 'Arazi takibi galerisi' }, { id: 'process', label: 'Danışmanlık süreci' }, { id: 'journal', label: 'Uzman makaleleri' }, { id: 'quote', label: 'Ziyaret talebi' }],
    activityTitle: 'Faaliyet alanı',
    activity: { regions: 'Kazvin, Zencan, Elburz ve Tahran', visits: 'Önceden randevu ile ziyaret', degree: 'Bitki Koruma Yüksek Lisansı', diagnostics: 'Zararlı bilimi ve bitki hastalıkları', inputs: 'Gübre, pestisit ve tohum danışmanlığı' },
    copyright: '© 2026 Afshin Rahmani · Tüm hakları saklıdır.', principles: 'Bilimsel teşhis · Sorumlu öneri · Arazi takibi',
  },
  controls: {
    settings: 'Tarla ayarları', title: 'Tarla kontrolleri', stage: '{total} aşamadan {current}.', windStrength: 'Rüzgâr gücü', windSpeed: 'Rüzgâr hızı', mouseRadius: 'İmleç yarıçapı', fogDensity: 'Sis yoğunluğu', hint: 'İmleci sayfada hareket ettirin; geçtiğiniz yerde çimenler açılır.',
  },
  gallery: {
    dialogLabel: 'Bitki takibi galerisi', eyebrow: '· Bitki koruma galerisi', titleA: 'Teşhis ve takip için', highlight: 'görüntüler',
    description: 'Bitki belirtileri, tarla ve bahçe takibi, tohum seçimi ve mücadele uygulamalarını tanıtan eğitim görselleri. Ayrıntılar için bir görsel seçin.', close: 'Galeriyi kapat', all: 'Tümü', empty: 'Bu kategoride henüz görsel yok.',
    ctaTitle: 'Bu görseller sizin konunuzla ilişkili mi?', ctaText: 'Uygun inceleme ve danışmanlık yolunu belirlemek için ürün ve belirti ayrıntılarını paylaşın.', ctaButton: 'Danışmanlık isteyin', closeImage: 'Görseli kapat', previous: 'Önceki görsel', next: 'Sonraki görsel', fullView: 'tam görünüm',
    items: [
      { id: 'leaf-diagnosis', title: 'Yaprak lekelerinin incelenmesi', location: 'Tarla ve bahçeler', type: 'Hastalık teşhisi', category: 'diagnosis', season: 'Görsel rehber', sqft: 'Yaprak takibi', blurb: 'Lekeler, renkli haleler ve yaprak dokusundaki değişimler incelemeye başlamak için önemli işaretlerdir. Belirti yerini kaydetmek ve sağlıklı yapraklarla karşılaştırmak teşhisi netleştirir.', image: './images/leaf-disease.webp' },
      { id: 'pest-scouting', title: 'Tarla ziyareti ve takibi', location: 'Kazvin ve Zencan', type: 'Zararlı bilimi', category: 'pests', season: 'Düzenli takip', sqft: 'Belirti kaydı', blurb: 'Tarlanın farklı noktalarına düzenli ziyaretler ve zararlı populasyonunun kaydı, zamanında karar vermeye ve gereksiz mücadeleyi önlemeye yardımcı olur.', image: './images/wheat-inspection.webp' },
      { id: 'seed-selection', title: 'Çeşit ve tohum kalitesinin değerlendirilmesi', location: 'Soğuk ve yarı soğuk bölgeler', type: 'Tohum ve iklim', category: 'seed', season: 'Ekimden önce', sqft: 'Çeşit seçimi', blurb: 'Tohum seçimi iklim, ekim tarihi, vegetasyon süresi ve çimlenme kalitesini dikkate alır. Bir bölgedeki performans her tarla için yeterli ölçüt değildir.', image: './images/wheat-seed.webp' },
      { id: 'orchard-review', title: 'Bahçe yapısına genel bakış', location: 'Elburz ve Tahran', type: 'Bahçe takibi', category: 'orchard', season: 'Dört mevsim', sqft: 'Tarla ve bahçe', blurb: 'Dikim düzenini, sıraları ve bahçenin genel durumunu anlamak, ziyaret ve örnekleme planının önemli bir parçasıdır. Hava görüntüleri genel farklılıkları daha net gösterebilir.', image: './images/orchard-monitoring.webp' },
      { id: 'safe-spraying', title: 'Güvenli mücadele uygulaması', location: 'Tarla ve seralar', type: 'Mücadele ve pestisit', category: 'control', season: 'Sorumlu uygulama', sqft: 'Etikete uyum', blurb: 'Teşhis ve mücadele yöntemi seçildikten sonra ekipman kalibrasyonu, hava koşulları, kişisel koruyucu ekipman ve etiket talimatlarına dikkatle uyulmalıdır.', image: './images/crop-spraying.webp' },
      { id: 'rust-diagnosis', title: 'Pas belirtilerinden örnekleme', location: 'Tarla ve bahçeler', type: 'Hastalık teşhisi', category: 'diagnosis', season: 'Yeni belirtiler', sqft: 'Örnek inceleme', blurb: 'Püstüllerin rengi ve yaprak veya gövdedeki yeri, pas hastalıklarının incelenmesinde değerli ipuçları verir. Yeni örnekler ve çevre kayıtları daha doğru teşhise yardımcı olur.', image: './images/leaf-rust.webp' },
    ],
  },
};
