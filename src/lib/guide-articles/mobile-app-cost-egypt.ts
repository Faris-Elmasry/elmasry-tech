import type { Guide } from "@/lib/guides";

export const mobileAppCost: Guide = {
  slug: "mobile-app-cost-egypt",
  title: {
    ar: "تكلفة عمل تطبيق موبايل في مصر: من الفكرة للنشر",
    en: "Mobile app cost in Egypt: from idea to launch",
  },
  description: {
    ar: "تكلفة عمل تطبيق موبايل في مصر بتعتمد على حاجات تقدر تتحكم فيها. اعرف أجزاء التطبيق، وإيه اللي بيكبّر الحجم، ومراحل الشغل من الفكرة لحد النشر على المتاجر.",
    en: "Mobile app cost in Egypt depends on choices you control. See what an app is made of, what makes it bigger, and each step from idea to the app stores.",
  },
  keyword: { ar: "تكلفة عمل تطبيق موبايل", en: "mobile app cost in Egypt" },
  readingMinutes: 6,
  published: "2026-10-16",
  updated: "2026-10-16",
  relatedServices: ["mobile-app-development", "custom-software"],
  relatedSystems: ["restaurant-system", "clinic-management"],
  intro: {
    ar: "«عايز أعمل تطبيق زي طلبات، يتكلف كام؟» سؤال بنسمعه كتير، وإجابته الأمينة: على حسب. مش تهرّب — التطبيق اللي شايفه على موبايلك هو الجزء الظاهر بس، ووراه سيرفر ولوحة تحكم وربط بخدمات تانية. في الدليل ده هنمشي مع بعض من أول الفكرة لحد ما التطبيق ينزل على المتاجر، وهنوضّح إيه اللي بيحدد تكلفة عمل تطبيق موبايل فعلًا، وإزاي تبدأ بنسخة صغيرة ذكية من غير ما تصرف على حاجات مش محتاجها دلوقتي.",
    en: "“I want an app like Talabat — how much?” We hear this a lot, and the honest answer is: it depends. That isn’t a dodge — the app on your phone is only the visible part; behind it sit a server, an admin panel and links to other services. This guide walks from the first idea to the app stores, explains what really drives mobile app cost in Egypt, and shows how to start with a smart, small first version.",
  },
  sections: [
    {
      heading: { ar: "قبل السعر: هل محتاج تطبيق أصلًا؟", en: "Before the price: do you need an app at all?" },
      body: {
        ar: [
          "أول سؤال بنسأله لأي حد جاي يعمل تطبيق: العميل هيفتحه كام مرة في الأسبوع؟ ولو مسحه من موبايله، هيخسر إيه؟ التطبيق بيستاهل لما يكون فيه استخدام متكرر — عميل بيطلب كل أسبوع، أو مريض بيتابع مع العيادة، أو مندوب بيستخدمه طول اليوم. ساعتها الإشعارات، ونقاط الولاء، والدخول السريع بتفرق فعلًا.",
          "لكن لو هدفك إن الناس تعرفك وتلاقيك على جوجل، فموقع سريع على الموبايل غالبًا هيخدمك أحسن وبتكلفة أقل، لأن محدش بينزّل تطبيق عشان يعرف مواعيدك. ولو أغلب كلامك مع العملاء على الواتساب، ممكن [شات بوت واتساب](/guides/whatsapp-chatbot-for-business) يحل المشكلة من غير تطبيق خالص.",
          "مثال: كافيه عنده زباين ثابتين بييجوا كل يوم الصبح، تطبيق بنقاط ولاء وطلب مسبق ممكن يفرق معاه، لأن الزبون هيفتحه كل يوم تقريبًا. أما عيادة لسه فاتحة وعايزة مرضى جداد، فالأولوية لموقع وحساب جوجل بيزنس، والتطبيق ممكن ييجي بعدين لما يبقى عندها مرضى بيتابعوا بانتظام.",
          "الخلاصة: التطبيق أداة للعلاقة المستمرة مع عميل موجود، مش أداة لجلب عملاء جداد. لو فهمت ده من الأول، هتوفّر فلوس كتير.",
        ],
        en: [
          "The first thing we ask anyone wanting an app: how often will customers open it? An app pays off with repeated use — a customer who orders every week, a patient following up with a clinic, a sales rep using it all day. That is when notifications, loyalty points and quick login really matter.",
          "If your goal is for people to find you on Google, a fast mobile website will usually serve you better for less, because nobody installs an app to check your opening hours. And if most of your customer conversations happen on WhatsApp, a [WhatsApp chatbot](/guides/whatsapp-chatbot-for-business) might solve the problem with no app at all.",
          "Example: a café with regulars who come every morning may benefit from an app with loyalty points and order-ahead. A newly opened clinic looking for new patients should start with a website and a Google Business Profile.",
        ],
      },
    },
    {
      heading: { ar: "التطبيق مش شاشات بس: الأجزاء اللي بتتبني", en: "An app is more than screens: what actually gets built" },
      body: {
        ar: [
          "لما تقارن عروض الأسعار، اتأكد إن كل عرض شامل نفس الأجزاء، لأن عروض كتير بتحسب الشاشات وبس:",
          {
            list: [
              "**التطبيق نفسه** على أندرويد وآيفون: الشاشات اللي العميل بيستخدمها.",
              "**السيرفر وقاعدة البيانات (الباك إند):** المكان اللي بتتحفظ فيه الطلبات والحسابات وبيتحسب فيه كل حاجة.",
              "**لوحة التحكم:** اللي أنت وفريقك بتديروا منها المنتجات والطلبات والعملاء والتقارير.",
              "**الربط بخدمات خارجية:** الدفع الإلكتروني، والخرايط، ورسائل التأكيد، والإشعارات.",
              "**التصميم وتجربة الاستخدام:** ترتيب الشاشات بحيث العميل يوصل لهدفه في أقل خطوات.",
              "**الاختبار والنشر:** تجربة على أجهزة حقيقية، ورفع التطبيق على المتاجر ومتابعة المراجعة.",
            ],
          },
          "لو عرض فيه سعر قليل جدًا وبيتكلم عن «تطبيق» بس، اسأل: مين هيبني السيرفر؟ ولوحة التحكم موجودة؟ والاستضافة على مين؟",
        ],
        en: [
          "When you compare quotes, make sure each one covers the same parts — many only count the screens:",
          {
            list: [
              "**The app itself** on Android and iPhone: the screens your customer uses.",
              "**The server and database (back end):** where orders and accounts are stored and everything is calculated.",
              "**The admin panel:** where you and your team manage products, orders, customers and reports.",
              "**Links to outside services:** online payment, maps, confirmation messages and notifications.",
              "**Design and user experience:** arranging screens so customers reach their goal in the fewest steps.",
              "**Testing and publishing:** trials on real devices, submitting to the stores and following up on review.",
            ],
          },
          "If a quote is very low and only talks about “the app”, ask: who builds the server? Is there an admin panel? Who pays for hosting?",
        ],
      },
    },
    {
      heading: { ar: "أندرويد وآيفون: تطبيقين ولا كود واحد؟", en: "Android and iPhone: two apps or one codebase?" },
      body: {
        ar: [
          "زمان كان لازم تبني تطبيق لأندرويد وتطبيق تاني منفصل لآيفون. النهارده فيه تقنيات زي Flutter و React Native بتسمح بكود واحد يشتغل على الاتنين، وده مناسب لأغلب تطبيقات الشركات: طلبات، وحجوزات، وولاء، ومتابعة. التطبيق «الأصلي» لكل نظام لوحده بيبقى منطقي في حالات خاصة، زي الاستخدام التقيل للكاميرا أو الجرافيكس.",
          "خلي بالك كمان من حسابات المطوّر على المتاجر: جوجل بلاي ليه رسوم تسجيل، وأبل ليها اشتراك سنوي في برنامج المطوّرين. الأهم من الرسوم إن **الحسابات دي تتعمل باسم شركتك أنت**، مش باسم المبرمج، عشان التطبيق يفضل ملكك.",
        ],
        en: [
          "Not long ago you had to build one app for Android and a separate one for iPhone. Today, tools like Flutter and React Native let one codebase run on both, which suits most business apps: ordering, bookings, loyalty, tracking. Fully native apps for each platform make sense in special cases, such as heavy camera or graphics work.",
          "Mind the store developer accounts too: Google Play has a registration fee and Apple has a yearly developer programme membership. More important than the fees: **these accounts must be in your company’s name**, not the developer’s, so the app stays yours.",
        ],
      },
    },
    {
      heading: { ar: "إيه اللي بيكبّر حجم التطبيق (وبالتالي السعر)", en: "What makes an app bigger (and so more expensive)" },
      body: {
        ar: [
          "دي أكتر العوامل اللي بتفرق في تكلفة عمل تطبيق موبايل، رتّبها حسب أهميتها عندك:",
          {
            list: [
              "**عدد أنواع المستخدمين:** عميل بس؟ ولا عميل ومندوب توصيل ومدير؟ كل نوع تقريبًا تطبيق أو جزء كبير لوحده.",
              "**التتبع اللحظي:** زي متابعة الطيار على الخريطة.",
              "**الدفع داخل التطبيق** والمحافظ الإلكترونية.",
              "**الشات** بين العميل والفريق أو بين المستخدمين.",
              "**الشغل من غير نت** ومزامنة البيانات بعد ما يرجع.",
              "**الربط بنظام عندك:** زي الكاشير أو المخزن أو نظام العيادة.",
              "**لغتين** وتصميم فيه حركات وتفاصيل كتير.",
            ],
          },
          "مثال: صيدلية عايزة تطبيق توصيل. ده عمليًا تلات حاجات: تطبيق للعميل يدوّر ويطلب ويرفع صورة الروشتة، وتطبيق للطيار يشوف الطلب والعنوان، ولوحة للصيدلي يأكد التوافر والسعر. ولو الصيدلية عندها [نظام صيدليات](/systems/pharmacy-system) أصلًا، الربط بيه بيوفّر إدخال البيانات مرتين.",
        ],
        en: [
          "These are the factors that move mobile app cost the most — rank them by importance to you:",
          {
            list: [
              "**Number of user types:** customers only, or customers, delivery riders and managers? Each type is roughly its own app or a large part of one.",
              "**Live tracking:** like following a rider on a map.",
              "**In-app payment** and mobile wallets.",
              "**Chat** between customers and your team, or between users.",
              "**Working offline** and syncing once the connection returns.",
              "**Linking to a system you already run:** cashier, stock or clinic software.",
              "**Two languages** and a design with lots of motion and detail.",
            ],
          },
          "Example: a pharmacy wants a delivery app. That is really three things: a customer app to search, order and upload a prescription photo; a rider app showing the order and address; and a panel where the pharmacist confirms availability and price. If the pharmacy already runs a [pharmacy system](/systems/pharmacy-system), linking to it saves typing everything twice.",
        ],
      },
    },
    {
      heading: { ar: "ابدأ بنسخة أولى صغيرة وذكية", en: "Start with a small, smart first version" },
      body: {
        ar: [
          "أغلب التطبيقات الناجحة بدأت صغيرة. الفكرة إنك تطلع بأقل نسخة بتحل المشكلة الأساسية، وتشوف الناس بتستخدمها إزاي، وبعدين تضيف على أساس حقيقي مش تخمين. ده بيقلل المخاطرة وبيخلّي ميزانيتك تروح على اللي بيفرق.",
          "مثال لتطبيق كافيه: النسخة الأولى فيها المنيو، والطلب المسبق والاستلام من الفرع، ونقاط الولاء. التوصيل والاشتراكات الشهرية ييجوا في مرحلة تانية بعد ما تشوف الأرقام.",
          "عشان تحدد النسخة الأولى، اعمل التمرين ده:",
          {
            ordered: true,
            list: [
              "اكتب كل الخصائص اللي في دماغك من غير فلترة.",
              "قسّمها لتلات أعمدة: لازم من أول يوم، كويس لو موجود، بعدين.",
              "اسأل عن كل حاجة في العمود الأول: لو مش موجودة، العميل هيبطّل يستخدم التطبيق؟ لو لأ، انقلها.",
              "اللي فاضل في العمود الأول هو نسختك الأولى.",
            ],
          },
        ],
        en: [
          "Most successful apps started small. The idea is to launch the smallest version that solves the core problem, see how people use it, then add based on real behaviour rather than guesses. That lowers risk and spends your budget on what makes a difference.",
          "Example for a café app: version one has the menu, order-ahead with branch pickup, and loyalty points. Delivery and monthly subscriptions come in a second phase, once you have seen the numbers.",
          "To define version one, try this exercise:",
          {
            ordered: true,
            list: [
              "Write down every feature on your mind, without filtering.",
              "Sort them into three columns: must-have on day one, nice to have, later.",
              "For each must-have, ask: without it, would customers stop using the app? If not, move it.",
              "What remains in the first column is your first version.",
            ],
          },
        ],
      },
    },
    {
      heading: { ar: "من الفكرة للنشر: المراحل خطوة بخطوة", en: "From idea to launch, step by step" },
      body: {
        ar: [
          {
            ordered: true,
            list: [
              "**فهم الفكرة وتحديد النطاق:** مين المستخدمين، وكل واحد بيعمل إيه، والنسخة الأولى فيها إيه بالظبط. هنا بيتحدد السعر.",
              "**التصميم:** رسم مبدئي للشاشات، وبعدين التصميم النهائي، وبعدين نموذج تقدر تدوس فيه على الموبايل قبل أي برمجة.",
              "**البرمجة على مراحل:** كل أسبوع أو أسبوعين بتستلم نسخة تجريبية على موبايلك تجرّبها وتقول رأيك.",
              "**الاختبار:** على أجهزة مختلفة، وشبكات ضعيفة، وسيناريوهات غلط (زي دفع اتلغى).",
              "**النشر على المتاجر:** جوجل وأبل بيراجعوا التطبيق قبل ما يظهر، وساعات بيطلبوا تعديلات، فلازم الوقت ده يبقى محسوب.",
              "**المتابعة بعد الإطلاق:** مراقبة الأخطاء وآراء المستخدمين، وتجهيز التحديث الأول.",
            ],
          },
          "تطبيق متوسط الحجم بياخد عندنا غالبًا من 6 لـ 12 أسبوع حسب حجمه، والمشاريع الأكبر بنسلّمها على أجزاء عشان تبدأ تستخدمها بدري. تفاصيل أكتر عن طريقتنا في صفحة [تصميم تطبيقات الموبايل](/services/mobile-app-development).",
        ],
        en: [
          {
            ordered: true,
            list: [
              "**Understanding the idea and setting scope:** who the users are, what each does, and exactly what version one includes. This is where the price is set.",
              "**Design:** rough screen sketches, then the final design, then a clickable prototype you can tap through on your phone before any code.",
              "**Building in stages:** every week or two you receive a test build on your phone to try and comment on.",
              "**Testing:** on different devices, weak networks, and things going wrong (like a cancelled payment).",
              "**Store submission:** Google and Apple review apps before they appear and sometimes ask for changes, so that time must be planned.",
              "**Post-launch follow-up:** watching errors and user feedback, and preparing the first update.",
            ],
          },
          "A mid-sized app usually takes us 6 to 12 weeks depending on scope, and bigger projects are delivered in parts so you start using them early. More on how we work: [mobile app development](/services/mobile-app-development).",
        ],
      },
    },
    {
      heading: { ar: "بعد النشر: التكاليف اللي بتستمر", en: "After launch: the costs that continue" },
      body: {
        ar: [
          "التطبيق مش حاجة بتخلص يوم النشر. فيه تكاليف بتستمر، والأحسن تعرفها من دلوقتي:",
          {
            list: [
              "استضافة السيرفر وقاعدة البيانات، وبتكبر مع عدد المستخدمين.",
              "تحديثات لما أندرويد وآيفون يطلّعوا إصدارات جديدة.",
              "رسوم حسابات المتاجر، وخدمات زي الرسائل والخرايط حسب الاستخدام.",
              "إصلاح الأخطاء وإضافة خصائص جديدة.",
            ],
          },
          { note: "قبل ما تمضي، اتأكد إن الكود الكامل، وحسابات المتاجر، والسيرفر كلهم باسمك، وإن فيه فترة ضمان مكتوبة لإصلاح الأخطاء بعد التسليم." },
        ],
        en: [
          "An app isn’t finished on launch day. Some costs continue, and it is better to know them now:",
          {
            list: [
              "Server and database hosting, which grows with your users.",
              "Updates when Android and iOS release new versions.",
              "Store account fees, and services like messaging and maps based on usage.",
              "Bug fixes and new features.",
            ],
          },
          { note: "Before signing, make sure the full source code, the store accounts and the server are all in your name, and that there is a written warranty period for fixing bugs after delivery." },
        ],
      },
    },
  ],
  faqs: [
    {
      q: { ar: "هل أوفّر لو عملت أندرويد بس الأول؟", en: "Do I save by building Android only first?" },
      a: {
        ar: "مع التقنيات اللي بتشتغل بكود واحد، الفرق بقى أقل من زمان، وغالبًا بنطلّع الاتنين مع بعض. لكن لو جمهورك كله تقريبًا على نظام واحد، ممكن نبدأ بيه.",
        en: "With single-codebase tools the difference is smaller than it used to be, so we usually ship both together. If almost all your audience uses one platform, we can start there.",
      },
    },
    {
      q: { ar: "ينفع آخد سعر ثابت؟", en: "Can I get a fixed price?" },
      a: {
        ar: "أيوه. بعد ما نحدد النسخة الأولى مع بعض في مكالمة مجانية، بنبعت عرض مكتوب بسعر ثابت وكل اللي هتستلمه. أي إضافة بعد كده بتتسعّر لوحدها قبل ما نبدأ فيها.",
        en: "Yes. Once we define version one together on a free call, we send a written offer with a fixed price and everything you will receive. Any later addition is priced separately before we start it.",
      },
    },
    {
      q: { ar: "الكود هيبقى ملكي؟", en: "Will I own the code?" },
      a: {
        ar: "في أي تطبيق بنبنيه مخصوص ليك، أيوه: بتستلم الكود كامل وحسابات المتاجر والسيرفر باسمك، ومعاهم توثيق يخلّي أي فريق تاني يقدر يكمّل.",
        en: "For any app we build for you, yes: you receive the full code, store accounts and server in your name, with documentation any other team could pick up.",
      },
    },
    {
      q: { ar: "محتاج أجهّز إيه قبل أول اجتماع؟", en: "What should I prepare before the first meeting?" },
      a: {
        ar: "مش محتاج ملف كبير. اكتب في صفحة واحدة: مين اللي هيستخدم التطبيق، وأهم تلات حاجات هيعملها، وتطبيقين عاجبينك وليه. ولو عندك نظام شغال (كاشير أو مخزن أو عيادة)، قول لنا اسمه عشان نعرف هنربط بإيه. الباقي بنكمّله مع بعض في المكالمة، ومن غير أي التزام منك.",
        en: "No big document needed. On one page, write who will use the app, the three most important things they will do, and two apps you like and why. If you already run a system (cashier, stock, clinic), tell us its name so we know what to connect to. We work out the rest together on the call, with no commitment.",
      },
    },
  ],
  cta: {
    ar: "احكي لنا فكرة التطبيق، ونحدد معاك النسخة الأولى ونبعت عرض مكتوب بسعر ثابت.",
    en: "Tell us your app idea — we’ll shape version one with you and send a fixed-price written offer.",
  },
};
