import type { Guide } from "@/lib/guides";

export const eInvoice: Guide = {
  slug: "e-invoice-egypt-integration",
  title: {
    ar: "الفاتورة الإلكترونية في مصر: إزاي تربط برنامجك بالمنظومة من غير صداع",
    en: "Egypt e-invoice integration: connecting your software without the headache",
  },
  description: {
    ar: "الفاتورة الإلكترونية في مصر من غير صداع: يعني إيه ربط برنامجك بمنظومة مصلحة الضرائب، وتجهّز إيه قبلها، وخطوات الربط، وأشهر الأخطاء وإزاي تتجنبها.",
    en: "Egypt e-invoice integration without the headache: what linking your software to the Tax Authority means, what to prepare, the steps and common mistakes.",
  },
  keyword: { ar: "الفاتورة الإلكترونية في مصر", en: "Egypt e-invoice integration" },
  readingMinutes: 6,
  published: "2026-10-16",
  updated: "2026-10-16",
  relatedServices: ["custom-software", "business-automation"],
  relatedSystems: ["accounting-hr", "pos-cashier"],
  intro: {
    ar: "كلمة «الفاتورة الإلكترونية» بقت بتقلق أصحاب شغل كتير: مين لازم يطبّقها؟ وبرنامجي ينفع يتربط؟ ولا هكتب كل فاتورة مرتين؟ الدليل ده مش استشارة ضريبية — دي شغلة محاسبك ومصلحة الضرائب — لكنه بيشرح الجزء التقني بكلام بسيط: يعني إيه ربط برنامجك بالمنظومة، ومحتاج تجهّز إيه، والخطوات بتمشي إزاي، وإيه الأخطاء اللي بتعمل صداع وإزاي تتجنبها.",
    en: "“E-invoicing” worries many business owners: who must apply it? Can my software connect? Will I type every invoice twice? This guide isn’t tax advice — that is for your accountant and the Tax Authority — but it explains the technical side in plain words: what connecting your software means, what to prepare, how the steps go, and which mistakes cause headaches and how to avoid them.",
  },
  sections: [
    {
      heading: { ar: "الفاتورة الإلكترونية والإيصال الإلكتروني: الفرق في سطرين", en: "E-invoice and e-receipt: the difference in two lines" },
      body: {
        ar: [
          "مصلحة الضرائب المصرية عندها منظومتين أساسيتين ممكن تسمع عنهم:",
          {
            list: [
              "**منظومة الفاتورة الإلكترونية:** للفواتير بين الشركات وبعضها، زي الموزّع اللي بيبيع لصيدليات ومحلات، أو شركة خدمات بتفوتر لشركة تانية.",
              "**منظومة الإيصال الإلكتروني:** للإيصالات اللي بتطلع للمستهلك العادي من نقطة البيع، زي الكاشير في المحل أو المطعم أو الصيدلية.",
            ],
          },
          "شركات كتير بتتعامل مع الاتنين: موزّع بيبيع جملة بفواتير، وعنده كمان معرض بيبيع قطاعي بإيصالات. إيه اللي ينطبق على نشاطك بالظبط، ومن إمتى؟ ده سؤال تتأكد منه من محاسبك أو من [موقع مصلحة الضرائب المصرية](https://www.eta.gov.eg) مباشرة، لأن القواعد بتتحدّث.",
        ],
        en: [
          "The Egyptian Tax Authority (ETA) runs two main systems you may hear about:",
          {
            list: [
              "**The e-invoice system:** for invoices between businesses — a distributor selling to pharmacies and shops, or a service company billing another company.",
              "**The e-receipt system:** for receipts issued to ordinary consumers at the point of sale — the cashier in a shop, restaurant or pharmacy.",
            ],
          },
          "Many businesses deal with both: a distributor invoicing wholesale customers, who also runs a showroom issuing retail receipts. Exactly what applies to your business, and from when, is something to confirm with your accountant or directly on the [Egyptian Tax Authority website](https://www.eta.gov.eg), because the rules get updated.",
        ],
      },
    },
    {
      heading: { ar: "يعني إيه «ربط» البرنامج بالمنظومة؟", en: "What does “integrating” your software mean?" },
      body: {
        ar: [
          "من غير ربط، حد عندك بيعمل الفاتورة في برنامج الحسابات، وبعدين يدخل يكتبها تاني على بوابة المنظومة. ده ممكن يمشي لو فواتيرك قليلة جدًا، لكن مع أي حجم شغل بيبقى وقت ضايع وأخطاء كتابة.",
          "الربط معناه إن برنامجك نفسه بيبعت الفاتورة للمنظومة أوتوماتيك، بالشكل التقني اللي المنظومة طالباه، وبيستلم الرد: الفاتورة اتقبلت ولا اترفضت، ولو اترفضت ليه. البرنامج بيحفظ حالة كل فاتورة، فتقدر تعرف في أي لحظة إيه اللي اتبعت وإيه اللي محتاج تصحيح.",
          { note: "الهدف ببساطة: الفاتورة تتكتب مرة واحدة بس، في برنامجك، والباقي يحصل لوحده." },
        ],
        en: [
          "Without integration, someone creates the invoice in your accounting software, then types it again on the system’s portal. That can work if you issue very few invoices, but at any real volume it means wasted time and typing errors.",
          "Integration means your software sends each invoice to the system automatically, in the technical format the system requires, and receives the response: accepted or rejected, and why. The software keeps each invoice’s status, so you always know what was sent and what needs correcting.",
          { note: "The goal, simply: each invoice is written once, in your software, and the rest happens on its own." },
        ],
      },
    },
    {
      heading: { ar: "اللي محتاج تجهّزه قبل الربط", en: "What to prepare before integrating" },
      body: {
        ar: [
          "أغلب التأخير في الربط مش بيبقى في البرمجة، بيبقى في التجهيزات دي. ابدأ فيها بدري، ومحاسبك هيساعدك في أغلبها:",
          {
            list: [
              "**التسجيل على بوابة المنظومة** ببيانات شركتك الضريبية الصحيحة.",
              "**تسجيل برنامجك على البوابة** عشان تاخد بيانات الربط اللي البرنامج هيستخدمها في الاتصال.",
              "**التوقيع الإلكتروني:** الفواتير بتتوقّع إلكترونيًا بشهادة من جهة معتمدة. اعرف مين هيستلمه وهيتركّب على أنهي جهاز.",
              "**أكواد الأصناف:** كل صنف بتبيعه محتاج كود معتمد على المنظومة، ولازم يتربط بالصنف اللي عندك في البرنامج.",
              "**بيانات العملاء:** أرقام التسجيل الضريبي للشركات اللي بتبيع لها، مظبوطة ومراجعة.",
              "**أنواع الضرايب ونسبها:** متظبطة صح لكل صنف — ودي بالذات قرار محاسبك.",
            ],
          },
        ],
        en: [
          "Most integration delays aren’t in the programming; they are in this preparation. Start early — your accountant will help with most of it:",
          {
            list: [
              "**Registering on the system’s portal** with your company’s correct tax details.",
              "**Registering your software on the portal** to obtain the credentials it will use to connect.",
              "**Electronic signature:** invoices are signed electronically with a certificate from an approved provider. Know who receives it and which machine it will be installed on.",
              "**Item codes:** every item you sell needs an approved code on the system, mapped to the matching item in your software.",
              "**Customer data:** correct, checked tax registration numbers for the companies you sell to.",
              "**Tax types and rates:** set correctly per item — a decision for your accountant in particular.",
            ],
          },
        ],
      },
    },
    {
      heading: { ar: "خطوات الربط عمليًا", en: "The integration steps in practice" },
      body: {
        ar: [
          {
            ordered: true,
            list: [
              "**مراجعة البرنامج الحالي:** هل بيدعم الربط؟ محتاج تحديث؟ ولا محتاج «وسيط» يربطه؟",
              "**مطابقة البيانات:** كل حقل في فاتورتك (الصنف، والكمية، والضريبة، والعميل) لازم يقابله الحقل المطلوب في المنظومة.",
              "**التجربة على بيئة الاختبار:** المنظومة بتوفّر بيئة تجريبية، وفيها بنبعت فواتير تجريبية ونتأكد إن كلها بتتقبل قبل أي فاتورة حقيقية.",
              "**التعامل مع الرفض:** البرنامج لازم يعرض سبب الرفض بوضوح، ويسمح بالتصحيح وإعادة الإرسال.",
              "**التصحيح بالطريقة الصح:** الفاتورة اللي اتقبلت مبتتعدلش؛ التصحيح بيتم بإشعار دائن أو مدين أو بالإلغاء حسب القواعد.",
              "**التشغيل والمتابعة:** في الأسابيع الأولى، حد يراجع حالة الفواتير كل يوم لحد ما كل حاجة تستقر.",
            ],
          },
        ],
        en: [
          {
            ordered: true,
            list: [
              "**Review your current software:** does it support integration? Does it need an update, or a “bridge” to connect it?",
              "**Map the data:** every field on your invoice (item, quantity, tax, customer) must match the field the system expects.",
              "**Test in the pre-production environment:** the system provides a test environment where we send sample invoices and make sure they are all accepted before any real one.",
              "**Handle rejections:** the software must show the reason clearly and allow correction and resending.",
              "**Correct the right way:** an accepted invoice isn’t edited; corrections go through credit or debit notes, or cancellation, according to the rules.",
              "**Go live and monitor:** in the first weeks, someone checks invoice status daily until everything settles.",
            ],
          },
        ],
      },
    },
    {
      heading: { ar: "أخطاء بتعمل صداع، وإزاي تتجنبها", en: "Mistakes that cause headaches, and how to avoid them" },
      body: {
        ar: [
          {
            list: [
              "**أكواد أصناف مش مربوطة صح:** بيطلع رفض متكرر. الحل: مراجعة الربط بين أصنافك والأكواد قبل التشغيل، مش بعده.",
              "**رقم تسجيل ضريبي غلط لعميل:** راجع بيانات العملاء الكبار الأول.",
              "**تعديل الفاتورة بعد ما اتبعتت:** بدل ما تصدر إشعار تصحيح. البرنامج الكويس بيمنع ده من الأساس.",
              "**التوقيع الإلكتروني:** الشهادة متركّبة على جهاز واحد والجهاز ده مقفول، أو صلاحيتها خلصت ومحدش واخد باله. حط تذكير بميعاد التجديد.",
              "**النت فصل:** البرنامج لازم يحفظ الفواتير في طابور ويبعتها لما النت يرجع، مش يضيّعها. واسأل محاسبك عن قواعد مواعيد الإرسال.",
              "**شخص واحد بس فاهم:** لو مسافر أو ساب الشغل، الدنيا بتقف. خلّي اتنين على الأقل متدربين.",
            ],
          },
        ],
        en: [
          {
            list: [
              "**Item codes mapped wrongly:** leads to repeated rejections. Fix: review the mapping between your items and codes before going live, not after.",
              "**A wrong customer tax number:** check your largest customers’ details first.",
              "**Editing an invoice after it was sent:** instead of issuing a correction note. Good software prevents this altogether.",
              "**The electronic signature:** the certificate sits on one machine that is switched off, or it expired and nobody noticed. Set a reminder for renewal.",
              "**Internet outages:** the software must queue invoices and send them when the connection returns, never lose them. Ask your accountant about submission timing rules.",
              "**Only one person understands it:** if they travel or leave, everything stops. Train at least two people.",
            ],
          },
        ],
      },
    },
    {
      heading: { ar: "لو برنامجك قديم أو مش بيدعم الربط", en: "If your software is old or can’t integrate" },
      body: {
        ar: [
          "عندك تلات اختيارات، وكل واحد مناسب لموقف مختلف:",
          {
            list: [
              "**تحديث من الشركة صاحبة البرنامج:** أسهل حل لو البرنامج لسه مدعوم.",
              "**برنامج وسيط (Bridge):** بيقرا الفواتير من برنامجك الحالي ويبعتها للمنظومة. مناسب لو برنامجك كويس ومش عايز تغيّره.",
              "**الانتقال لنظام جاهز للربط:** لو برنامجك قديم ومش مدعوم أصلًا، ممكن تبقى دي فرصة تحل مشاكل تانية معاه.",
            ],
          },
          "مثال: موزّع أدوية شغال على برنامج ديسكتوب قديم من سنين، والفريق متعوّد عليه وكل بياناته فيه. هنا الوسيط غالبًا أوفر وأسرع من تغيير كل حاجة. أما شركة لسه بتبدأ أو بتفكر تغيّر برنامجها أصلًا، فـ[نظام حسابات](/systems/accounting-hr) جاهز للربط من الأول بيبقى أريح. ولو محتاج ربط مخصوص بين أكتر من برنامج، ده شغل [أتمتة وربط الأنظمة](/services/business-automation).",
        ],
        en: [
          "You have three options, each suited to a different situation:",
          {
            list: [
              "**An update from your software vendor:** the easiest route if the software is still supported.",
              "**A bridge program:** reads invoices from your current software and sends them to the system. Good if your software works well and you don’t want to change it.",
              "**Moving to a system built for integration:** if your software is old and unsupported, this may be a chance to fix other problems too.",
            ],
          },
          "Example: a pharmaceutical distributor has used an old desktop program for years; the team knows it and all the data lives there. A bridge is usually cheaper and faster than changing everything. A company just starting, or already planning to switch, is better served by an [accounting system](/systems/accounting-hr) ready to integrate from day one. If you need a custom link between several programs, that is [automation and system integration](/services/business-automation) work.",
        ],
      },
    },
    {
      heading: { ar: "بعد التشغيل: متابعة بسيطة بتريّحك", en: "After go-live: simple routines that keep you safe" },
      body: {
        ar: [
          "الربط مش مشروع بيخلص وننساه. شوية متابعة منتظمة بتمنع إن المشاكل الصغيرة تتراكم لحد آخر الشهر:",
          {
            list: [
              "**كل يوم:** نظرة سريعة على الفواتير المرفوضة أو اللي لسه مستنية، وتصحيحها في نفس اليوم.",
              "**كل شهر:** مطابقة بين اللي في برنامجك واللي ظاهر على بوابة المنظومة، قبل ما المحاسب يقفل الشهر.",
              "**مع كل صنف أو عميل جديد:** التأكد إن الصنف ليه كود مربوط، وإن بيانات العميل الضريبية كاملة، قبل أول فاتورة.",
              "**قبل ميعاد تجديد التوقيع الإلكتروني:** تذكير بفترة كافية.",
              "**مع أي موظف جديد:** تدريب قصير على التعامل مع الرفض والتصحيح.",
            ],
          },
          "البرنامج الكويس بيسهّل ده كله: تقرير واضح بحالة الفواتير، وتنبيه لما فاتورة تترفض، بدل ما تكتشف المشكلة بعد أسابيع.",
        ],
        en: [
          "Integration isn’t a project you finish and forget. A little regular follow-up stops small problems piling up until month-end:",
          {
            list: [
              "**Daily:** a quick look at rejected or pending invoices, corrected the same day.",
              "**Monthly:** reconcile your software against the portal before the accountant closes the month.",
              "**With every new item or customer:** make sure the item has a mapped code and the customer’s tax details are complete before the first invoice.",
              "**Before the signature certificate renews:** a reminder with enough lead time.",
              "**With every new employee:** a short training on handling rejections and corrections.",
            ],
          },
          "Good software makes this easy: a clear report of invoice status and an alert when one is rejected, instead of discovering the problem weeks later.",
        ],
      },
    },
    {
      heading: { ar: "مين يعمل إيه؟", en: "Who does what?" },
      body: {
        ar: [
          "عشان المشروع يمشي من غير صداع، قسّم المسؤوليات من الأول:",
          {
            list: [
              "**أنت ومحاسبك:** التسجيل، والقرارات الضريبية (أنواع الضرايب ونسبها، وإيه اللي ينطبق على نشاطك)، والتوقيع الإلكتروني.",
              "**شركة البرمجة:** الربط التقني، ومطابقة البيانات، والاختبار على البيئة التجريبية، والتعامل مع الرفض، والتدريب.",
            ],
          },
          "إحنا شركة برمجة مش مكتب ضرايب: بنعمل الجزء التقني كامل، وبنشتغل جنب محاسبك في الحاجات الضريبية. وأي معلومة رسمية، مرجعها الأول والأخير [مصلحة الضرائب المصرية](https://www.eta.gov.eg).",
        ],
        en: [
          "For a smooth project, split responsibilities from the start:",
          {
            list: [
              "**You and your accountant:** registration, tax decisions (tax types and rates, and what applies to your business), and the electronic signature.",
              "**The software company:** the technical integration, data mapping, testing in the test environment, handling rejections, and training.",
            ],
          },
          "We are a software company, not a tax office: we handle the technical side fully and work alongside your accountant on tax matters. For any official information, the first and final reference is the [Egyptian Tax Authority](https://www.eta.gov.eg).",
        ],
      },
    },
  ],
  faqs: [
    {
      q: { ar: "هل نشاطي ملزم بالفاتورة الإلكترونية؟", en: "Is my business required to use e-invoicing?" },
      a: {
        ar: "ده سؤال ضريبي إجابته عند محاسبك ومصلحة الضرائب، لأنها بتعتمد على نوع نشاطك ووضعك. إحنا بنساعدك في الجزء التقني بعد ما تعرف المطلوب.",
        en: "That is a tax question for your accountant and the Tax Authority, since it depends on your activity and situation. We help with the technical side once you know what is required.",
      },
    },
    {
      q: { ar: "ينفع أربط البرنامج اللي شغال عليه حاليًا؟", en: "Can I connect the software I already use?" },
      a: {
        ar: "في حالات كتير أيوه، إما بتحديث أو ببرنامج وسيط. بنحتاج نشوف البرنامج وطريقة حفظه للفواتير الأول، وبعدها نقول لك أسهل طريق.",
        en: "Often yes, either through an update or a bridge program. We need to see the software and how it stores invoices first, then we suggest the simplest route.",
      },
    },
    {
      q: { ar: "يعني إيه التوقيع الإلكتروني ومنين أجيبه؟", en: "What is the electronic signature, and where do I get it?" },
      a: {
        ar: "شهادة رقمية بتثبت إن الفاتورة طالعة من شركتك، وبتتاخد من جهات معتمدة. محاسبك أو موقع مصلحة الضرائب هيوضحوا لك الجهات المعتمدة والخطوات الحالية.",
        en: "A digital certificate proving an invoice came from your company, issued by approved providers. Your accountant or the Tax Authority website will point you to the approved providers and current steps.",
      },
    },
    {
      q: { ar: "لو النت فصل، الفواتير هتضيع؟", en: "If the internet drops, are invoices lost?" },
      a: {
        ar: "في نظام مبني صح، لأ: الفواتير بتتحفظ وتستنى في طابور، وتتبعت أول ما النت يرجع، وحالة كل فاتورة بتبان قدامك.",
        en: "In a well-built system, no: invoices are saved and queued, sent as soon as the connection returns, and each invoice’s status stays visible to you.",
      },
    },
  ],
  cta: {
    ar: "قول لنا بتستخدم برنامج إيه النهارده، ونقول لك أسهل طريق تربطه بالفاتورة الإلكترونية.",
    en: "Tell us which software you use today, and we’ll suggest the simplest way to connect it to the e-invoice system.",
  },
};
