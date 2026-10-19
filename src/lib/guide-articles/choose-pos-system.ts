import type { Guide } from "@/lib/guides";

export const choosePos: Guide = {
  slug: "choose-pos-system",
  title: {
    ar: "إزاي تختار برنامج كاشير لمحلك أو الكافيه؟ (قائمة أسئلة قبل ما تشتري)",
    en: "How to choose a POS system for your shop or café (questions to ask before you buy)",
  },
  description: {
    ar: "قبل ما تشتري برنامج كاشير لمحلك أو الكافيه: سرعة البيع، والشغل من غير نت، والورديات، والمخزون، والصلاحيات، والدعم. قائمة أسئلة عملية للعرض التجريبي.",
    en: "Before buying a POS system for your shop or café: speed, offline mode, shifts, stock, permissions and support — a practical list of questions for the demo.",
  },
  keyword: { ar: "برنامج كاشير", en: "POS system" },
  readingMinutes: 6,
  published: "2026-10-16",
  updated: "2026-10-16",
  relatedServices: ["custom-software"],
  relatedSystems: ["pos-cashier", "restaurant-system", "inventory-warehouse", "pharmacy-system"],
  intro: {
    ar: "برنامج الكاشير هو أكتر برنامج هتتعامل معاه في يومك: كل فاتورة، وكل جنيه داخل الدرج، وكل صنف خارج من المخزن بيعدّي عليه. وعشان كده الاختيار الغلط بيكلّفك كتير — مش في سعر البرنامج، لكن في طوابير واقفة، وفلوس ناقصة آخر الوردية، ومخزون محدش عارفه. الدليل ده مش هيقول لك «اشتري البرنامج الفلاني»، لكن هيديك الأسئلة الصح اللي تسألها لأي شركة قبل ما تختار برنامج كاشير لمحلك أو الكافيه.",
    en: "Your POS system is the software you will touch most every day: every receipt, every pound in the drawer and every item leaving your stock passes through it. A wrong choice costs you dearly — not in the software’s price, but in queues, cash short at the end of a shift and stock nobody can account for. This guide won’t tell you which brand to buy; it gives you the right questions to ask any company before you choose.",
  },
  sections: [
    {
      heading: { ar: "ابدأ من يومك أنت، مش من قائمة المميزات", en: "Start from your day, not from a feature list" },
      body: {
        ar: [
          "كل شركة هتوريك قائمة طويلة من المميزات، وأغلبها مش هتستخدمه. الأحسن تبدأ من العكس: اكتب إزاي ساعة الذروة بتمشي عندك، وخلّي البرنامج يثبت إنه بيمشي معاها.",
          {
            list: [
              "**كافيه:** طلبات على الكاونتر وعلى الترابيزات، وطلبات بتروح للبار أو المطبخ، وتيك أواي ودليفري.",
              "**سوبر ماركت أو بقالة:** باركود سريع، وأصناف بالوزن، وعروض «اشتري 2 وخد 1».",
              "**صيدلية:** تواريخ صلاحية، وتشغيلات، وبيع بالشريط أو بالعلبة.",
              "**محل ملابس أو أحذية:** نفس الموديل بمقاسات وألوان، واستبدال كتير.",
              "**محل موبايلات:** أرقام سيريال، وضمان، وأقساط.",
            ],
          },
          "اكتب أصعب سيناريو بيحصل عندك — مثلًا «زبون عايز يرجّع نص الطلب ويدفع الباقي فيزا» — وخلّيهم يعملوه قدامك في العرض التجريبي.",
          "وفكّر كمان في بكرة مش النهارده بس: ناوي تفتح فرع تاني؟ تبيع أونلاين؟ تشتغل مع تطبيقات التوصيل؟ البرنامج اللي يناسبك النهارده ومش هيستحمل الخطوة الجاية هيخليك تغيّر تاني بعد سنة، وتغيير برنامج الكاشير معناه تدريب من جديد ونقل بيانات وأيام لخبطة.",
        ],
        en: [
          "Every company will show you a long feature list, most of which you will never use. Start the other way round: write down how your busiest hour runs, and make the software prove it can keep up.",
          {
            list: [
              "**Café:** counter and table orders, tickets going to the bar or kitchen, takeaway and delivery.",
              "**Supermarket or grocery:** fast barcode scanning, weighed items, “buy 2 get 1” offers.",
              "**Pharmacy:** expiry dates, batches, selling by strip or by box.",
              "**Clothing or shoe shop:** one model in many sizes and colours, lots of exchanges.",
              "**Mobile phone shop:** serial numbers, warranties, instalments.",
            ],
          },
          "Write down the hardest thing that happens at your counter — say, “a customer returns half the order and pays the rest by card” — and ask them to do it in front of you during the demo.",
          "Think about tomorrow too: a second branch? Selling online? Delivery apps? Software that fits today but can’t handle the next step means switching again in a year — retraining, moving data and days of confusion.",
        ],
      },
    },
    {
      heading: { ar: "سرعة البيع وسهولة الشاشة", en: "Selling speed and an easy screen" },
      body: {
        ar: [
          "في وقت الزحمة، كل ثانية بتفرق. ركّز في العرض التجريبي على الحاجات دي:",
          {
            list: [
              "الفاتورة العادية بتاخد كام ضغطة من أولها لآخرها؟",
              "فيه زراير سريعة للأصناف اللي بتتباع كتير (زي القهوة أو العيش)؟",
              "ينفع أعلّق فاتورة وأفتح غيرها، وبعدين أرجع لها؟",
              "الدفع نص كاش ونص فيزا أو محفظة بيتعمل بسهولة؟",
              "الشاشة عربي بالكامل، وواضحة على شاشة لمس؟",
              "كاشير جديد يتعلم البيع في قد إيه؟",
            ],
          },
          "اطلب تجرّب بإيدك، مش تتفرج بس. ولو عندك كاشير شغال معاك، خليه هو اللي يجرّب، لأنه أكتر واحد هيحس بالفرق.",
        ],
        en: [
          "At rush hour every second counts. In the demo, focus on these:",
          {
            list: [
              "How many taps does a normal sale take from start to finish?",
              "Are there quick buttons for best sellers (like coffee or bread)?",
              "Can I park a bill, serve someone else, then come back to it?",
              "Is paying half cash, half card or wallet easy?",
              "Is the screen fully in Arabic and clear on a touch screen?",
              "How long until a new cashier can sell on their own?",
            ],
          },
          "Ask to try it yourself rather than just watch. If you have a cashier, let them try — they will feel the difference most.",
        ],
      },
    },
    {
      heading: { ar: "لو النت فصل، البيع هيقف؟", en: "If the internet drops, does selling stop?" },
      body: {
        ar: [
          "ده سؤال مصيري، وكتير بيتنسي. برامج كاشير كتير بتشتغل على النت بالكامل، ولو النت فصل نص ساعة في وقت الذروة، البيع بيقف. اسأل بوضوح: البرنامج بيكمّل بيع من غير نت؟ وأول ما النت يرجع، البيانات بتتحدّث لوحدها من غير ما حد يدخل حاجة تاني؟",
          "وأحسن اختبار: اطلب منهم يفصلوا النت في نص العرض التجريبي ويكمّلوا بيع. [نظام الكاشير](/systems/pos-cashier) عندنا مثلًا بيكمّل بيع من غير نت ويحدّث نفسه لما يرجع، لكن لوحة صاحب الشغل اللي بتتابع منها من الموبايل محتاجة نت — ودي حاجة لازم تعرفها في أي برنامج.",
        ],
        en: [
          "This is a make-or-break question that is often forgotten. Many POS programs run fully online; if the internet drops for half an hour at peak time, selling stops. Ask clearly: does it keep selling offline? And when the connection returns, does data catch up on its own, without anyone re-entering anything?",
          "The best test: ask them to unplug the internet mid-demo and keep selling. Our [cashier system](/systems/pos-cashier), for example, keeps selling offline and catches up when the connection returns, while the owner’s dashboard on your phone needs a connection — something worth knowing for any program.",
        ],
      },
    },
    {
      heading: { ar: "الورديات والدرج والمخزون", en: "Shifts, the cash drawer and stock" },
      body: {
        ar: [
          "البيع نص الحكاية. النص التاني إن الفلوس والبضاعة يبقوا مظبوطين:",
          {
            list: [
              "**قفل الوردية:** الكاشير بيعد الدرج، والبرنامج بيقارن بالمفروض ويطلّع الفرق لكل كاشير.",
              "**المرتجع:** مربوط بالفاتورة الأصلية، والصنف بيرجع المخزن لوحده.",
              "**خصم المخزون:** كل بيعة بتخصم من المخزن فورًا.",
              "**الوصفات في الكافيه والمطعم:** كوباية اللاتيه المفروض تخصم البن واللبن والكوباية، عشان تعرف استهلاكك الحقيقي.",
              "**تنبيه النواقص:** قبل ما الصنف يخلص، مش بعد ما الزبون يسأل عليه.",
              "**الجرد:** بالموبايل أو بقارئ الباركود، مع تقرير بالفروقات.",
            ],
          },
          "لو المطعم أو الكافيه هو شغلك الأساسي، شوف [نظام المطاعم والكافيهات](/systems/restaurant-system) لأنه بيضيف الترابيزات وشاشة المطبخ والدليفري. ولو عندك مخزن كبير أو أكتر من مخزن، [برنامج المخازن](/systems/inventory-warehouse) بيكمّل الصورة.",
        ],
        en: [
          "Selling is half the story. The other half is keeping cash and stock right:",
          {
            list: [
              "**Closing a shift:** the cashier counts the drawer and the program compares it with the expected total, showing any difference per cashier.",
              "**Returns:** linked to the original receipt, with the item returned to stock automatically.",
              "**Stock deduction:** every sale reduces stock immediately.",
              "**Recipes in cafés and restaurants:** a latte should deduct coffee, milk and the cup, so you know your real consumption.",
              "**Low-stock alerts:** before an item runs out, not after a customer asks for it.",
              "**Stock counts:** by phone or barcode scanner, with a variance report.",
            ],
          },
          "If a restaurant or café is your main business, look at a [restaurant and café system](/systems/restaurant-system), which adds tables, a kitchen screen and delivery. If you run a large store or several, an [inventory system](/systems/inventory-warehouse) completes the picture.",
        ],
      },
    },
    {
      heading: { ar: "الصلاحيات ومنع التلاعب", en: "Permissions and preventing manipulation" },
      body: {
        ar: [
          "مش موضوع ثقة في الناس، لكن البرنامج الكويس بيحمي الكل — وبيحمي الكاشير الأمين نفسه من أي شك. اسأل:",
          {
            list: [
              "الكاشير يقدر يلغي فاتورة أو يمسح صنف من غير موافقة المدير؟",
              "فيه حد أقصى للخصم لكل موظف؟",
              "فيه سجل بكل تعديل وإلغاء: مين عمله وإمتى؟",
              "كل موظف بيشوف اللي يخصه بس؟",
              "تقدر تتابع المبيعات والدرج من موبايلك وأنت برّه المحل؟",
            ],
          },
        ],
        en: [
          "It isn’t about distrusting people; good software protects everyone — including the honest cashier, from any doubt. Ask:",
          {
            list: [
              "Can a cashier void a bill or delete an item without a manager’s approval?",
              "Is there a maximum discount per employee?",
              "Is every edit and void logged — who did it and when?",
              "Does each employee see only what concerns them?",
              "Can you follow sales and the drawer from your phone while away?",
            ],
          },
        ],
      },
    },
    {
      heading: { ar: "الأجهزة والفروع والفاتورة الإلكترونية", en: "Hardware, branches and e-receipts" },
      body: {
        ar: [
          "قبل ما تشتري أجهزة جديدة، اسأل البرنامج بيشتغل على إيه: كمبيوتر ويندوز عادي؟ تابلت؟ وبيتعامل مع طابعة الفواتير، وقارئ الباركود، ودرج الفلوس، والميزان، وماكينة الفيزا؟ اطلب قائمة بأجهزة مجرّبة معاه.",
          "لو عندك أو ناوي يبقى عندك أكتر من فرع، اتأكد إن كل الفروع بتظهر على شاشة واحدة، وإن التحويل بين مخازن الفروع سهل.",
          "وموضوع مهم في مصر: منظومة الإيصال الإلكتروني التابعة لمصلحة الضرائب. اسأل الشركة: البرنامج جاهز للربط بيها؟ وهل الربط ده داخل في السعر؟ ومتنساش تتأكد من محاسبك أو من [مصلحة الضرائب](https://www.eta.gov.eg) إيه المطلوب لنشاطك بالظبط. عندنا دليل كامل عن [ربط برنامجك بالفاتورة الإلكترونية](/guides/e-invoice-egypt-integration).",
        ],
        en: [
          "Before buying new hardware, ask what the software runs on: an ordinary Windows PC? A tablet? Does it work with receipt printers, barcode scanners, cash drawers, scales and card machines? Ask for a list of tested devices.",
          "If you have — or plan to have — more than one branch, make sure all branches appear on one screen and transfers between branch stores are easy.",
          "An important point in Egypt: the Tax Authority’s e-receipt system. Ask the company whether the software is ready to connect to it and whether that is included in the price. Also confirm with your accountant or the [Egyptian Tax Authority](https://www.eta.gov.eg) exactly what applies to your business. We have a full guide on [connecting your software to the e-invoice system](/guides/e-invoice-egypt-integration).",
        ],
      },
    },
    {
      heading: { ar: "إيجار ولا شراء؟ والدعم بعد البيع", en: "Rent or buy? And support after the sale" },
      body: {
        ar: [
          "الإيجار الشهري بيخليك تبدأ بمبلغ صغير، والتحديثات والنسخ الاحتياطي غالبًا داخلين فيه. الشراء مرة واحدة بيبقى منطقي لو ناوي تستخدم البرنامج سنين، بس اسأل: التحديثات والدعم بعد أول سنة بفلوس؟",
          "وفي الحالتين، اقرا العقد كويس: مدة الاشتراك، وإزاي تلغيه، وإيه اللي بيحصل لبياناتك لو وقفت الدفع.",
          "والدعم أهم من السعر. الكافيه اللي بيقفل 2 بالليل محتاج يعرف: لو البرنامج وقف الساعة 11، مين هيرد؟ على واتساب ولا تليفون ولا تذكرة بترد بعد يومين؟ واسأل كمان عن نقل بياناتك القديمة (الأصناف والعملاء والأرصدة من الإكسل)، وعن إنك تقدر تطلّع بياناتك في أي وقت لو حبيت تغيّر البرنامج.",
        ],
        en: [
          "Monthly rent lets you start small, and updates and backups are usually included. Buying once makes sense if you plan to use the software for years — but ask whether updates and support after year one cost extra.",
          "Either way, read the contract: the term, how to cancel, and what happens to your data if you stop paying.",
          "Support matters more than price. A café open until 2 a.m. needs to know: if the software stops at 11 p.m., who answers? WhatsApp, phone, or a ticket answered two days later? Also ask about moving your old data (items, customers, balances from Excel), and whether you can export your data any time if you ever switch.",
        ],
      },
    },
    {
      heading: { ar: "قائمة الأسئلة قبل ما تشتري", en: "The checklist before you buy" },
      body: {
        ar: [
          "اطبع القائمة دي وخدها معاك لأي عرض تجريبي:",
          {
            ordered: true,
            list: [
              "عملتوا أصعب سيناريو عندي قدامي؟",
              "البيع بيكمّل لو النت فصل؟",
              "الفاتورة العادية بتاخد كام ضغطة؟",
              "قفل الوردية بيطلّع فرق الدرج لكل كاشير؟",
              "المرتجع مربوط بالفاتورة وبيرجّع الصنف للمخزن؟",
              "فيه صلاحيات وسجل لكل إلغاء وتعديل؟",
              "بيشتغل على أجهزتي، ومعاه قائمة أجهزة مجرّبة؟",
              "جاهز لمنظومة الإيصال الإلكتروني؟",
              "هتنقلوا بياناتي القديمة، وأقدر أطلّعها في أي وقت؟",
              "الدعم بيرد إمتى وعلى إيه؟ والتحديثات بفلوس؟",
            ],
          },
          "لو البرنامج نجح في القائمة دي، غالبًا هيريّحك سنين.",
        ],
        en: [
          "Print this and take it to every demo:",
          {
            ordered: true,
            list: [
              "Did you run my hardest scenario in front of me?",
              "Does selling continue if the internet drops?",
              "How many taps does a normal sale take?",
              "Does closing a shift show the drawer difference per cashier?",
              "Are returns linked to the receipt and put back in stock?",
              "Are there permissions and a log of every void and edit?",
              "Does it run on my devices, with a list of tested hardware?",
              "Is it ready for the e-receipt system?",
              "Will you move my old data, and can I export it any time?",
              "When and where does support answer? Are updates paid?",
            ],
          },
          "If a program passes this list, it will most likely serve you well for years.",
        ],
      },
    },
  ],
  faqs: [
    {
      q: { ar: "المحل الصغير محتاج برنامج كاشير؟", en: "Does a small shop need a POS system?" },
      a: {
        ar: "لو بتبيع كل يوم وعندك أكتر من كام صنف، أيوه غالبًا. الفايدة الأكبر مش السرعة، لكن إنك تعرف بعت بكام وكسبت قد إيه وإيه اللي قرّب يخلص — من غير كشكول.",
        en: "If you sell daily and carry more than a handful of items, usually yes. The biggest benefit isn’t speed but knowing what you sold, what you earned and what is running low — without a notebook.",
      },
    },
    {
      q: { ar: "ينفع أشغّله على الكمبيوتر اللي عندي؟", en: "Can I run it on my current computer?" },
      a: {
        ar: "في أغلب الحالات أيوه، طالما كمبيوتر ويندوز حديث نسبيًا. اسأل الشركة عن المواصفات، واطلب قائمة بالطابعات وقارئات الباركود المجرّبة.",
        en: "Usually yes, as long as it’s a reasonably recent Windows PC. Ask for the requirements and a list of tested printers and barcode scanners.",
      },
    },
    {
      q: { ar: "أقدر أنقل الأصناف من الإكسل؟", en: "Can I import my items from Excel?" },
      a: {
        ar: "أيوه، وده المفروض يبقى جزء من التجهيز. عندنا بننقل الأصناف والعملاء والموردين والأرصدة بنفسنا من الإكسل أو من أغلب البرامج المنتشرة.",
        en: "Yes, and it should be part of the setup. We move items, customers, suppliers and balances ourselves from Excel or most common programs.",
      },
    },
    {
      q: { ar: "أجرّب البرنامج قبل ما أدفع؟", en: "Can I try it before paying?" },
      a: {
        ar: "لازم. اطلب عرض تجريبي على شغلك أنت، مش على بيانات وهمية. إحنا بنعمل عرض تجريبي مجاني، وبعدها تختار إيجار شهري أو شراء مرة واحدة.",
        en: "You should. Ask for a demo on your own business, not dummy data. We offer a free demo, then you choose monthly rent or a one-time purchase.",
      },
    },
  ],
  cta: {
    ar: "احجز عرض تجريبي مجاني، وجرّب أصعب سيناريو عندك بنفسك.",
    en: "Book a free demo and try your hardest scenario yourself.",
  },
};
