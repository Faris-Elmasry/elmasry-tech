import type { Guide } from "@/lib/guides";

export const whatsappChatbot: Guide = {
  slug: "whatsapp-chatbot-for-business",
  title: {
    ar: "شات بوت واتساب للشركات: بيرد إزاي وبيوفر عليك إيه",
    en: "WhatsApp chatbot for business: how it replies and what it saves you",
  },
  description: {
    ar: "شات بوت واتساب للشركات بيرد على عملائك ليل ونهار ويحوّل للموظف وقت اللزوم. اعرف بيشتغل إزاي، وبيوفر عليك إيه فعلًا، وإيه الفرق بين واتساب بيزنس والـ API.",
    en: "A WhatsApp chatbot for business replies day and night and hands over to staff when needed: how it works, what it saves, and the Business app vs the API.",
  },
  keyword: { ar: "شات بوت واتساب للشركات", en: "WhatsApp chatbot for business" },
  readingMinutes: 6,
  published: "2026-10-16",
  updated: "2026-10-16",
  relatedServices: ["ai-chatbots", "business-automation"],
  relatedSystems: ["clinic-management", "restaurant-system"],
  intro: {
    ar: "لو فتحت واتساب الشغل بتاعك دلوقتي، غالبًا هتلاقي نفس الأسئلة بتتكرر: «السعر كام؟»، «مواعيدكم إيه؟»، «فيه توصيل للمعادي؟»، «عايز أحجز». وكل رسالة بتستنى لحد ما حد يفضى يرد — وساعات الرد بييجي متأخر والعميل يكون راح لغيرك. شات بوت واتساب للشركات معمول عشان يحل المشكلة دي بالظبط. في الدليل ده هنشرح بيرد إزاي، وبيوفر عليك إيه فعلًا، وإيه اللي مش هيعمله، وإزاي تبدأ صح.",
    en: "Open your business WhatsApp right now and you will probably see the same questions again and again: “How much?”, “What are your hours?”, “Do you deliver to Maadi?”, “I want to book.” Each message waits until someone is free — and sometimes the reply comes too late and the customer has gone elsewhere. A WhatsApp chatbot for business is built for exactly this. Here is how it replies, what it really saves, what it won’t do, and how to start right.",
  },
  sections: [
    {
      heading: { ar: "يعني إيه شات بوت واتساب؟", en: "What is a WhatsApp chatbot?" },
      body: {
        ar: [
          "ببساطة: برنامج متوصّل برقم الواتساب بتاع شغلك، بيستقبل الرسائل ويرد عليها لوحده. وفيه نوعين أساسيين:",
          {
            list: [
              "**بوت بقوائم وزراير:** العميل بيختار من اختيارات («1- المنيو، 2- الأسعار، 3- كلّم موظف»). سهل ومضمون، بس محدود، والعميل لازم يمشي في الطريق اللي أنت راسمه.",
              "**بوت بالذكاء الاصطناعي:** بيفهم الكلام الحر زي ما العميل بيكتبه، حتى لو بالعامية المصرية أو فيه أخطاء إملائية، ويرد من المعلومات اللي أنت مجهّزها.",
            ],
          },
          "في الواقع، أحسن النتايج بتيجي من الخلط بين الاتنين: الذكاء الاصطناعي يفهم العميل عايز إيه، والزراير تسهّل الخطوات المحددة زي اختيار ميعاد أو تأكيد طلب.",
          "والفرق بين البوت وبين الرد الآلي العادي («شكرًا لتواصلك، هنرد عليك قريب») كبير: الرد الآلي بيأجّل المشكلة، لكن البوت بيحلها فعلًا — بيجاوب، أو بياخد الطلب، أو بيحجز.",
        ],
        en: [
          "Simply put: software connected to your business WhatsApp number that receives messages and replies on its own. There are two main kinds:",
          {
            list: [
              "**Menu-and-button bots:** the customer picks from options (“1 – Menu, 2 – Prices, 3 – Talk to staff”). Simple and predictable, but limited; customers must follow the path you drew.",
              "**AI bots:** they understand free text as customers actually write it — Egyptian Arabic, typos and all — and answer from information you prepared.",
            ],
          },
          "In practice the best results come from mixing both: AI understands what the customer wants, and buttons make specific steps easy, like picking a time slot or confirming an order.",
          "And a bot is very different from a plain auto-reply (“Thanks for reaching out, we’ll reply soon”): an auto-reply postpones the problem; a bot actually solves it — it answers, takes the order or makes the booking.",
        ],
      },
    },
    {
      heading: { ar: "بيرد إزاي بالظبط؟", en: "How exactly does it reply?" },
      body: {
        ar: [
          "خلّينا نمشي ورا رسالة واحدة في عيادة:",
          {
            ordered: true,
            list: [
              "المريض يكتب: «عايز أحجز مع دكتور العظام يوم الخميس».",
              "البوت يفهم إن المطلوب حجز، والتخصص عظام، واليوم الخميس.",
              "يسأل [نظام العيادة](/systems/clinic-management) عن المواعيد الفاضية، ويعرض اختيارات.",
              "المريض يختار، والبوت يأكد الحجز ويبعت العنوان واللوكيشن.",
              "قبل الميعاد بيوم، يبعت تذكير.",
              "لو المريض سأل سؤال طبي أو اشتكى من حاجة، البوت ميجتهدش: بيحوّل المحادثة لموظف الاستقبال على طول.",
            ],
          },
          "النقطة المهمة هنا: البوت مش «بيألّف». بيرد من مصدرين بس: المعلومات اللي أنت موافق عليها (أسعار، مواعيد، فروع، سياسات)، والأنظمة اللي متربط بيها (حجوزات، طلبات، مخزون). وأي حاجة برّه كده بتروح لإنسان.",
        ],
        en: [
          "Let’s follow one message at a clinic:",
          {
            ordered: true,
            list: [
              "A patient writes: “I want to book with the orthopaedic doctor on Thursday.”",
              "The bot understands: a booking, orthopaedics, Thursday.",
              "It asks the [clinic system](/systems/clinic-management) for free slots and offers choices.",
              "The patient picks one; the bot confirms and sends the address and location pin.",
              "A day before, it sends a reminder.",
              "If the patient asks a medical question or complains, the bot doesn’t improvise: it hands the chat to reception straight away.",
            ],
          },
          "The key point: the bot doesn’t “make things up”. It answers from two sources only — information you approved (prices, hours, branches, policies) and the systems it is connected to (bookings, orders, stock). Anything else goes to a person.",
        ],
      },
    },
    {
      heading: { ar: "أمثلة من السوق المصري", en: "Examples from Egyptian businesses" },
      body: {
        ar: [
          {
            list: [
              "**كافيه أو مطعم:** يبعت المنيو، وياخد الطلب، ويقول مناطق التوصيل ورسومها، ويبعت الطلب مباشرة لـ[نظام المطعم](/systems/restaurant-system).",
              "**صيدلية:** العميل يسأل «البانادول موجود؟» أو يبعت صورة روشتة، والبوت يسجّل الطلب ويحوّله للصيدلي يأكد التوافر والسعر.",
              "**عيادة أو مركز:** حجز وإلغاء وتأجيل وتذكير، و«النتيجة جاهزة؟».",
              "**موزّع جملة:** التاجر يسأل عن السعر والمتاح، ويطلب طلبية، ويعرف رصيده — من غير ما يستنى المندوب.",
              "**محل أو متجر أونلاين:** «طلبي فين؟»، والاستبدال والاسترجاع، والمقاسات المتاحة.",
            ],
          },
        ],
        en: [
          {
            list: [
              "**Café or restaurant:** sends the menu, takes the order, explains delivery zones and fees, and passes the order straight to the [restaurant system](/systems/restaurant-system).",
              "**Pharmacy:** a customer asks “Do you have Panadol?” or sends a prescription photo; the bot logs the request and hands it to the pharmacist to confirm availability and price.",
              "**Clinic or centre:** booking, cancelling, rescheduling, reminders, and “Are my results ready?”.",
              "**Wholesale distributor:** traders check prices and availability, place orders and see their balance — without waiting for the sales rep.",
              "**Shop or online store:** “Where is my order?”, exchanges and returns, available sizes.",
            ],
          },
        ],
      },
    },
    {
      heading: { ar: "بيوفر عليك إيه فعلًا؟", en: "What does it really save you?" },
      body: {
        ar: [
          {
            list: [
              "**وقت فريقك:** الأسئلة المتكررة بتتجاوب لوحدها، والفريق يركّز على البيع الحقيقي والحالات اللي محتاجة إنسان.",
              "**الرد بعد مواعيد الشغل:** العميل اللي بيسأل الساعة 12 بالليل بياخد رد، بدل ما يدوّر على غيرك.",
              "**رسائل أقل بتضيع:** في وقت الزحمة، مفيش رسالة بتتنسي تحت مية رسالة.",
              "**ردود ثابتة ودقيقة:** نفس السعر ونفس السياسة لكل العملاء، مش كل موظف بيقول حاجة.",
              "**بيانات منظمة:** كل طلب وحجز بيتسجّل في النظام، مش في شات ممكن يتمسح.",
            ],
          },
          "وعشان تعرف التوفير الحقيقي عندك، قيس قبل وبعد: عدد الرسايل في اليوم، وكام واحدة منهم أسئلة متكررة، والعميل بيستنى قد إيه لحد ما ياخد أول رد، وكام طلب أو حجز بييجي بعد مواعيد الشغل. الأرقام دي من شغلك أنت هي اللي هتقولك البوت فارق ولا لأ — مش أي إحصائية عامة.",
          "وبصراحة، البوت مش هيعمل كل حاجة: مش هيحل شكوى عميل زعلان زي موظف شاطر، ومش هيقفل صفقة كبيرة معقدة، وجودته مرتبطة بجودة المعلومات اللي بتديهاله. اعتبره موظف استقبال سريع ومنظم، مش بديل لفريقك.",
        ],
        en: [
          {
            list: [
              "**Your team’s time:** repeated questions answer themselves, so your team focuses on real selling and cases that need a human.",
              "**After-hours replies:** a customer asking at midnight gets an answer instead of looking elsewhere.",
              "**Fewer lost messages:** at rush hour, no message gets buried under a hundred others.",
              "**Consistent, accurate answers:** the same price and policy for every customer, not a different answer from each employee.",
              "**Organised data:** every order and booking lands in your system, not in a chat that could be deleted.",
            ],
          },
          "To see your real savings, measure before and after: messages per day, how many are repeated questions, how long customers wait for a first reply, and how many orders or bookings arrive after hours. Numbers from your own business will tell you whether the bot makes a difference — not some general statistic.",
          "To be honest, a bot won’t do everything: it won’t calm an upset customer like a good employee, won’t close a large complex deal, and it is only as good as the information you give it. Think of it as a fast, organised receptionist — not a replacement for your team.",
        ],
      },
    },
    {
      heading: { ar: "واتساب بيزنس العادي ولا الـ API؟", en: "The WhatsApp Business app or the API?" },
      body: {
        ar: [
          "**تطبيق واتساب بيزنس** المجاني فيه رسالة ترحيب، ورسالة غياب، وردود سريعة جاهزة. ده كويس جدًا لشغل صغير، بس الرد فيه يدوي في الآخر، ومش مصمم لبوت ذكي أو لربط بأنظمتك.",
          "**منصة واتساب للأعمال (الـ API)** من ميتا هي اللي بتسمح ببوت حقيقي، وبأكتر من موظف على نفس الرقم، وبالربط مع أنظمتك. وليها قواعد لازم تعرفها:",
          {
            list: [
              "النشاط بيتراجع ويتوثّق من ميتا.",
              "تقدر ترد بحرية على العميل خلال 24 ساعة من آخر رسالة بعتها. أما الرسايل اللي أنت بتبدأها (زي التذكير أو العروض) فلازم تبقى بقوالب متوافق عليها من ميتا.",
              "ميتا بتحاسب على أنواع معينة من الرسايل حسب سياستها وقتها، والسياسة دي بتتغير — فاسأل عنها وخليها محسوبة في التكلفة.",
              "قبل ما تبدأ، اتفق بوضوح على الرقم اللي هيستخدم، وإيه اللي هيحصل للمحادثات القديمة.",
            ],
          },
        ],
        en: [
          "The free **WhatsApp Business app** has greeting messages, away messages and quick replies. It is great for a small operation, but replies are ultimately manual, and it isn’t designed for an AI bot or links to your systems.",
          "Meta’s **WhatsApp Business Platform (the API)** is what allows a real bot, several staff on one number, and integration with your systems. It has rules worth knowing:",
          {
            list: [
              "Your business is reviewed and verified by Meta.",
              "You can reply freely within 24 hours of the customer’s last message. Messages you start (like reminders or offers) must use templates approved by Meta.",
              "Meta charges for certain message types under its current policy, which changes over time — ask about it and include it in your budget.",
              "Before starting, agree clearly on which number will be used and what happens to existing chats.",
            ],
          },
        ],
      },
    },
    {
      heading: { ar: "عشان البوت ميحرجكش", en: "So the bot never embarrasses you" },
      body: {
        ar: [
          {
            list: [
              "**يرد من معلوماتك بس:** ولو مش متأكد، يقول «هحوّلك لزميلي» بدل ما يخمّن.",
              "**التحويل للإنسان واضح وسهل:** العميل يكتب «موظف» في أي وقت ويتحوّل.",
              "**الوضوح:** متخليش البوت يدّعي إنه إنسان. الناس بتتقبّل البوت لما يكون مفيد وصريح.",
              "**الخصوصية:** ميطلبش بيانات مش محتاجها، وبيانات العملاء تتحفظ بأمان.",
              "**الرسائل الصوتية:** المصريين بيبعتوا فويس كتير. اسأل البوت هيتعامل معاها إزاي — يفهمها، ولا يحوّلها لموظف.",
              "**الاختبار بكلام حقيقي:** جرّبه على رسايل فعلية من عملائك، بالعامية وبالأخطاء.",
            ],
          },
        ],
        en: [
          {
            list: [
              "**Answers only from your information:** if unsure, it says “Let me pass you to a colleague” instead of guessing.",
              "**Clear, easy handover:** customers can type “agent” at any time and be transferred.",
              "**Honesty:** don’t let the bot pretend to be human. People accept bots that are useful and upfront.",
              "**Privacy:** it doesn’t ask for data it doesn’t need, and customer data is stored securely.",
              "**Voice notes:** Egyptians send lots of them. Ask how the bot handles them — understands them, or hands them to staff.",
              "**Testing with real language:** try it on actual messages from your customers, slang and typos included.",
            ],
          },
        ],
      },
    },
    {
      heading: { ar: "إزاي تبدأ، وإيه اللي بيحدد التكلفة", en: "How to start, and what drives the cost" },
      body: {
        ar: [
          {
            ordered: true,
            list: [
              "افتح الشات وجمّع أكتر 20 سؤال بيتكرروا.",
              "حدد إيه اللي البوت هيرد عليه لوحده، وإيه اللي لازم يروح لموظف.",
              "جهّز المعلومات: الأسعار، والمواعيد، والفروع، وسياسة التوصيل والاسترجاع.",
              "ابدأ بتجربة أسبوعين، وراجع المحادثات كل أسبوع وحسّن الردود.",
            ],
          },
          "التكلفة بتتحدد بعوامل واضحة: بوت قوائم ولا ذكاء اصطناعي، وعدد الخطوات اللي هيعملها، والربط بأنظمتك (حجز، طلبات، مخزون)، ورسوم رسايل ميتا، والمتابعة بعد التشغيل. تفاصيل أكتر عن شغلنا في صفحة [الشات بوت والردود الآلية](/services/ai-chatbots)، ولو عايز تربط الواتساب بباقي برامجك شوف [أتمتة الشغل المتكرر](/services/business-automation).",
        ],
        en: [
          {
            ordered: true,
            list: [
              "Open your chats and collect the 20 most repeated questions.",
              "Decide what the bot answers alone and what must go to staff.",
              "Prepare the information: prices, hours, branches, delivery and return policies.",
              "Start with a two-week pilot, review conversations weekly and improve the answers.",
            ],
          },
          "Cost comes down to clear factors: menu bot or AI, how many steps it handles, links to your systems (bookings, orders, stock), Meta’s message fees, and follow-up after launch. More on our work: [AI assistants and WhatsApp chatbots](/services/ai-chatbots); to connect WhatsApp with your other software, see [business automation](/services/business-automation).",
        ],
      },
    },
  ],
  faqs: [
    {
      q: { ar: "العميل هيعرف إنه بيكلم بوت؟", en: "Will customers know it’s a bot?" },
      a: {
        ar: "الأحسن يعرف. رسالة بسيطة زي «أنا المساعد الآلي، ولو حابب تكلم حد من الفريق اكتب موظف» بتبني ثقة، والناس بتتقبّل البوت لما يرد بسرعة وصح.",
        en: "It’s better that they do. A simple line like “I’m the automated assistant — type ‘agent’ to talk to the team” builds trust, and people accept bots that reply quickly and correctly.",
      },
    },
    {
      q: { ar: "بيفهم اللهجة المصرية؟", en: "Does it understand Egyptian Arabic?" },
      a: {
        ar: "البوتات المبنية بالذكاء الاصطناعي النهارده بتفهم العامية المصرية بشكل كويس، بس لازم تتجرّب على رسايل عملائك الحقيقية قبل التشغيل. إحنا بنختبر على كلام مصري فعلي قبل ما البوت يشتغل.",
        en: "Today’s AI-based bots handle Egyptian Arabic well, but they must be tested on your real customer messages before going live. We test on real Egyptian conversations before launch.",
      },
    },
    {
      q: { ar: "ينفع أستخدم نفس رقم الشغل؟", en: "Can I keep my business number?" },
      a: {
        ar: "غالبًا أيوه، بس الطريقة بتختلف حسب الرقم ووضعه الحالي. بنراجع ده معاك في الأول ونقول لك بالظبط إيه اللي هيحصل للمحادثات القديمة قبل أي خطوة.",
        en: "Usually yes, but the process depends on the number and its current setup. We review it with you first and explain exactly what happens to existing chats before any step.",
      },
    },
    {
      q: { ar: "لو البوت رد غلط؟", en: "What if the bot gives a wrong answer?" },
      a: {
        ar: "علشان كده بنقصر ردوده على معلوماتك المعتمدة، ونراجع المحادثات بانتظام في الأول. ولو ظهر رد غلط، بنصلّح المعلومة أو القاعدة فورًا.",
        en: "That’s why we limit answers to your approved information and review conversations regularly at first. If a wrong answer appears, we fix the information or rule right away.",
      },
    },
  ],
  cta: {
    ar: "ابعت لنا أكتر الأسئلة اللي بتتكرر عندك، ونوريك البوت هيرد عليها إزاي.",
    en: "Send us your most repeated customer questions, and we’ll show you how the bot would answer.",
  },
};
