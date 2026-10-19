// Privacy policy and terms of service (bilingual).
// Written in plain language and aligned with Egypt's Personal Data Protection
// Law No. 151 of 2020 — but it is not legal advice: have an Egyptian lawyer
// review it before relying on it for contracts.
//
// Body format: paragraphs separated by a blank line; lines starting with "- "
// render as a bullet list. Each section opens with a one-line plain summary
// (`short`, colloquial Egyptian in Arabic).

import type { Locale } from "@/lib/site";

type T = Record<Locale, string>;

export interface LegalSection {
  heading: T;
  short: T;
  body: T;
  /** Optional table (e.g. "what we collect / why / how long"). */
  table?: { head: T[]; rows: T[][] };
}

export interface LegalDoc {
  title: T;
  intro: T;
  updated: string;
  /** Sections whose one-line summary appears in the "very short version" box. */
  highlights: number[];
  sections: LegalSection[];
}

const CONTACT = {
  en: "Email: faris@elmasry.tech — WhatsApp/phone: +20\u00a0109\u00a0003\u00a06987 — Cairo, Egypt.",
  ar: "البريد الإلكتروني: \u2066faris@elmasry.tech\u2069 — واتساب/هاتف: \u2066+20\u00a0109\u00a0003\u00a06987\u2069 — القاهرة، مصر.",
};

export const privacyPolicy: LegalDoc = {
  title: { en: "Privacy policy", ar: "سياسة الخصوصية" },
  intro: {
    en: "How Elmasry Tech collects, uses and protects personal data through this website and our services — in clear language, in line with Egypt's Personal Data Protection Law No. 151 of 2020.",
    ar: "كيف تجمع Elmasry Tech البيانات الشخصية وتستخدمها وتحميها من خلال هذا الموقع وخدماتنا — بلغة واضحة، وبما يتوافق مع قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020.",
  },
  updated: "2026-10-16",
  highlights: [1, 3, 5, 9],
  sections: [
    {
      heading: { en: "Who we are and how to reach us", ar: "من نحن وكيف تتواصل معنا" },
      short: { en: "We're a software company in Cairo, and you can always ask us about your data.", ar: "إحنا شركة برمجة في القاهرة، وتقدر تسألنا عن بياناتك في أي وقت." },
      body: {
        en: `Elmasry Tech Solutions ("Elmasry Tech", "we") is a software development company based in Cairo, Egypt. For the data described in this policy, we decide why and how it is used, so we are responsible for it (the "controller" in the language of the law).\n\nFor any question or request about your personal data, contact us directly:\n- ${CONTACT.en}`,
        ar: `‏Elmasry Tech Solutions ("Elmasry Tech" أو "نحن") شركة تطوير برمجيات مقرها القاهرة، مصر. وفيما يخص البيانات الموضحة في هذه السياسة، نحن من يحدد سبب استخدامها وطريقته، ولذلك نتحمل مسؤوليتها (المتحكم بالبيانات بلغة القانون).\n\nلأي سؤال أو طلب يخص بياناتك الشخصية، تواصل معنا مباشرة:\n- ${CONTACT.ar}`,
      },
    },
    {
      heading: { en: "What we collect, why, and for how long", ar: "ما الذي نجمعه، ولماذا، وإلى متى" },
      short: { en: "Only what we need to reply to you and do the work — nothing to sell.", ar: "بس اللي محتاجينه عشان نرد عليك ونشتغل — ومفيش حاجة بتتباع." },
      body: {
        en: "We collect only the data we need. The table below lists every type, the reason, and how long we keep it. We never sell personal data, and we never use it for advertising.",
        ar: "لا نجمع إلا البيانات التي نحتاجها. يوضح الجدول التالي كل نوع منها، وسبب جمعه، ومدة الاحتفاظ به. ولا نبيع البيانات الشخصية أبدًا، ولا نستخدمها في الإعلانات.",
      },
      table: {
        head: [
          { en: "Data", ar: "البيانات" },
          { en: "Why we use it", ar: "سبب استخدامها" },
          { en: "How long we keep it", ar: "مدة الاحتفاظ" },
        ],
        rows: [
          [
            { en: "Name, email, phone, company and your message (contact form, WhatsApp, email)", ar: "الاسم والبريد والهاتف واسم الشركة ورسالتك (نموذج التواصل، واتساب، البريد)" },
            { en: "To reply, understand your needs and send a proposal", ar: "للرد عليك، وفهم احتياجك، وإرسال عرض" },
            { en: "Up to 2 years if no project follows; then deleted", ar: "حتى سنتين إذا لم يتحول لمشروع، ثم تُحذف" },
          ],
          [
            { en: "Project and contract details, invoices, payment records", ar: "تفاصيل المشروع والعقد والفواتير وسجلات الدفع" },
            { en: "To deliver the work and meet tax and accounting duties", ar: "لتنفيذ العمل والالتزام بالمتطلبات الضريبية والمحاسبية" },
            { en: "For the period required by Egyptian tax and accounting rules", ar: "طوال المدة التي تتطلبها القواعد الضريبية والمحاسبية في مصر" },
          ],
          [
            { en: "Demo account details (name, phone) when you try a system", ar: "بيانات حساب العرض التجريبي (الاسم والهاتف) عند تجربة نظام" },
            { en: "To set up and follow up on your free demo", ar: "لتجهيز العرض التجريبي المجاني ومتابعته" },
            { en: "Deleted within 90 days after the demo ends", ar: "تُحذف خلال 90 يومًا من انتهاء العرض" },
          ],
          [
            { en: "Anonymous usage statistics (pages visited, device type, approximate country)", ar: "إحصاءات استخدام مجهولة الهوية (الصفحات، نوع الجهاز، الدولة التقريبية)" },
            { en: "To see which pages help visitors and improve the site", ar: "لمعرفة الصفحات المفيدة للزوار وتحسين الموقع" },
            { en: "Kept in aggregate only; no personal profile is built", ar: "تُحفظ مجمّعة فقط، دون بناء ملف شخصي لأحد" },
          ],
          [
            { en: "Language preference (one small cookie)", ar: "تفضيل اللغة (ملف تعريف ارتباط صغير واحد)" },
            { en: "To show you the site in Arabic or English", ar: "لعرض الموقع بالعربية أو الإنجليزية" },
            { en: "Until you clear it or it expires", ar: "حتى تحذفه أو تنتهي صلاحيته" },
          ],
        ],
      },
    },
    {
      heading: { en: "Our legal basis", ar: "الأساس القانوني للاستخدام" },
      short: { en: "We use your data because you asked us, because of a contract, or because the law requires it.", ar: "بنستخدم بياناتك لأنك طلبت، أو عشان عقد بينا، أو عشان القانون بيطلب كده." },
      body: {
        en: "We process personal data only when there is a valid reason:\n- **Your consent**, for example when you send us a message or request a demo. You can withdraw it at any time.\n- **A contract** with you, or steps you asked for before one (a proposal).\n- **A legal obligation**, such as keeping invoices for tax purposes.\n- **Legitimate interests** that do not override your rights, such as keeping the site secure.",
        ar: "لا نعالج البيانات الشخصية إلا عند وجود سبب مشروع:\n- **موافقتك**، مثل إرسال رسالة لنا أو طلب عرض تجريبي، ويحق لك سحبها في أي وقت.\n- **عقد** معك، أو خطوات طلبتها قبل التعاقد (مثل إعداد عرض).\n- **التزام قانوني**، مثل الاحتفاظ بالفواتير لأغراض ضريبية.\n- **مصلحة مشروعة** لا تتعارض مع حقوقك، مثل الحفاظ على أمان الموقع.",
      },
    },
    {
      heading: { en: "Cookies and analytics", ar: "ملفات تعريف الارتباط والتحليلات" },
      short: { en: "No ad trackers. Just the language cookie and anonymous visit counts.", ar: "مفيش تتبع إعلانات. بس كوكي اللغة وعدّ زيارات من غير أسماء." },
      body: {
        en: "This website does not use advertising cookies, social-media pixels or cross-site tracking. We use one small functional cookie to remember your language, and privacy-friendly, aggregated analytics that do not identify you personally.\n\nYou can block or delete cookies in your browser settings; the site will still work, but it may ask for your language again.",
        ar: "لا يستخدم هذا الموقع ملفات تعريف ارتباط إعلانية، ولا أكواد تتبع لمنصات التواصل الاجتماعي، ولا تتبعًا عبر المواقع. نستخدم ملف تعريف ارتباط وظيفيًا صغيرًا واحدًا لتذكّر لغتك، وإحصاءات مجمّعة تحترم الخصوصية ولا تحدد هويتك.\n\nيمكنك حظر ملفات تعريف الارتباط أو حذفها من إعدادات متصفحك؛ وسيظل الموقع يعمل، لكنه قد يسألك عن اللغة مرة أخرى.",
      },
    },
    {
      heading: { en: "WhatsApp and other platforms", ar: "واتساب والمنصات الأخرى" },
      short: { en: "If you message us on WhatsApp, Meta's own privacy rules apply too.", ar: "لو كلمتنا على واتساب، سياسة خصوصية Meta بتنطبق كمان." },
      body: {
        en: "When you contact us through WhatsApp, Facebook, Instagram or LinkedIn, the platform processes your messages under its own privacy policy. We see your name or number and the messages you send us, and use them only to reply and serve you. We do not add you to marketing lists without your agreement.",
        ar: "عندما تتواصل معنا عبر واتساب أو فيسبوك أو إنستجرام أو لينكدإن، تعالج المنصة رسائلك وفقًا لسياسة الخصوصية الخاصة بها. ونحن نرى اسمك أو رقمك والرسائل التي ترسلها، ونستخدمها فقط للرد عليك وخدمتك، ولا نضيفك إلى قوائم تسويقية دون موافقتك.",
      },
    },
    {
      heading: { en: "Your customers' data inside the systems we build", ar: "بيانات عملائك داخل الأنظمة التي نطوّرها" },
      short: { en: "The data in your system is yours. We only touch it to help you.", ar: "البيانات اللي في السيستم بتاعك ملكك، ومش بنلمسها غير عشان نساعدك." },
      body: {
        en: "When we build or host a system for you, the data you store in it (customers, sales, patients, employees…) belongs to you, and you remain responsible for it. We act only on your instructions (as a \"processor\"):\n- We access it only to provide support, maintenance or a task you request.\n- We protect it with encryption, access permissions and regular backups.\n- We never use it for our own purposes or share it with anyone else.\n- When the contract ends, we hand it over to you in a usable format and then delete it, as agreed.",
        ar: "عندما نطوّر نظامًا لك أو نستضيفه، فإن البيانات التي تخزّنها فيه (العملاء، المبيعات، المرضى، الموظفون…) ملكك، وتظل أنت المسؤول عنها. ونحن نتعامل معها بناءً على تعليماتك فقط (بصفة \"معالج\"):\n- لا نصل إليها إلا لتقديم الدعم أو الصيانة أو مهمة تطلبها.\n- نحميها بالتشفير وصلاحيات الوصول والنسخ الاحتياطي المنتظم.\n- لا نستخدمها لأغراضنا الخاصة، ولا نشاركها مع أي طرف آخر.\n- عند انتهاء التعاقد نسلّمها لك بصيغة قابلة للاستخدام ثم نحذفها، وفق ما يتم الاتفاق عليه.",
      },
    },
    {
      heading: { en: "Who we share data with", ar: "مع من نشارك البيانات" },
      short: { en: "Only with the services we need to run our work — and never to sell.", ar: "بس مع الخدمات اللي محتاجينها عشان نشتغل — ومش للبيع أبدًا." },
      body: {
        en: "We share personal data only when needed, and only with:\n- **Service providers** that help us run our work (hosting, email, cloud storage), bound by confidentiality and data-protection obligations.\n- **Platforms you choose** to contact us through (such as WhatsApp).\n- **Authorities**, when the law or a court order requires it.\n\nWe never sell or rent personal data.",
        ar: "لا نشارك البيانات الشخصية إلا عند الحاجة، ومع هذه الجهات فقط:\n- **مزوّدو الخدمات** الذين يساعدوننا في تشغيل أعمالنا (الاستضافة، البريد، التخزين السحابي)، مع التزامهم بالسرية وحماية البيانات.\n- **المنصات التي تختارها** للتواصل معنا (مثل واتساب).\n- **الجهات الرسمية**، عندما يقتضي القانون أو حكم قضائي ذلك.\n\nولا نبيع البيانات الشخصية ولا نؤجرها أبدًا.",
      },
    },
    {
      heading: { en: "Data stored outside Egypt", ar: "تخزين البيانات خارج مصر" },
      short: { en: "Some of our tools run on servers abroad, with protections in place.", ar: "بعض أدواتنا شغالة على سيرفرات برّه مصر، ومعاها حماية مناسبة." },
      body: {
        en: "Some service providers we use (for example cloud hosting or email) may store data on servers outside Egypt. When that happens, we choose reputable providers with strong security and contractual data-protection commitments, and we follow the requirements of Egyptian law for cross-border transfers. For client systems, we can host data in a location you specify.",
        ar: "قد يخزّن بعض مزوّدي الخدمات الذين نستخدمهم (مثل الاستضافة السحابية أو البريد) البيانات على خوادم خارج مصر. وفي هذه الحالة نختار مزوّدين موثوقين بمستوى أمان قوي والتزامات تعاقدية بحماية البيانات، ونلتزم بما يقرره القانون المصري بشأن نقل البيانات عبر الحدود. وبالنسبة لأنظمة العملاء، يمكننا استضافة البيانات في المكان الذي تحدده.",
      },
    },
    {
      heading: { en: "Security and data breaches", ar: "الأمان والتعامل مع الاختراقات" },
      short: { en: "We protect your data seriously, and we'll tell you fast if something goes wrong.", ar: "بنحمي بياناتك بجد، ولو حصلت مشكلة هنبلغك بسرعة." },
      body: {
        en: "We use encrypted connections (HTTPS), access control so only the people who need data can see it, strong passwords and regular backups. No system is 100% secure; if a breach affects your personal data, we will contain it, notify you and the competent authority as the law requires, and tell you what we are doing about it.",
        ar: "نستخدم اتصالات مشفّرة (HTTPS)، وصلاحيات وصول تجعل البيانات متاحة فقط لمن يحتاجها، وكلمات مرور قوية، ونسخًا احتياطية منتظمة. ولا يوجد نظام آمن بنسبة 100%؛ فإذا وقع اختراق يمس بياناتك الشخصية، سنعمل على احتوائه، ونخطرك ونخطر الجهة المختصة وفقًا لما يتطلبه القانون، ونوضح لك الإجراءات التي نتخذها.",
      },
    },
    {
      heading: { en: "Your rights", ar: "حقوقك" },
      short: { en: "You can see, fix or delete your data — just message us.", ar: "تقدر تشوف بياناتك أو تصححها أو تمسحها — ابعتلنا بس." },
      body: {
        en: "Under Egypt's Personal Data Protection Law, you have the right to:\n- Know what personal data we hold about you and get a copy.\n- Correct data that is inaccurate or incomplete.\n- Ask us to delete your data, or restrict how we use it, when there is no legal reason to keep it.\n- Withdraw your consent at any time (this does not affect what we did before).\n- Object to the use of your data for marketing.\n\nTo use any of these rights, contact us (see \"Who we are\"). We will reply within 14 days. If you are not satisfied with our reply, you can file a complaint with Egypt's Personal Data Protection Center.",
        ar: "وفقًا لقانون حماية البيانات الشخصية المصري، يحق لك:\n- معرفة البيانات الشخصية التي نحتفظ بها عنك والحصول على نسخة منها.\n- تصحيح البيانات غير الدقيقة أو غير المكتملة.\n- طلب حذف بياناتك أو تقييد استخدامها، إذا لم يكن هناك سبب قانوني للاحتفاظ بها.\n- سحب موافقتك في أي وقت (دون أن يؤثر ذلك على ما تم قبل السحب).\n- الاعتراض على استخدام بياناتك في التسويق.\n\nلممارسة أي من هذه الحقوق تواصل معنا (انظر \"من نحن\")، وسنرد خلال 14 يومًا. وإذا لم يرضك ردّنا، يحق لك تقديم شكوى إلى مركز حماية البيانات الشخصية في مصر.",
      },
    },
    {
      heading: { en: "Children", ar: "الأطفال" },
      short: { en: "Our site and services are for businesses, not children.", ar: "الموقع والخدمات معمولين للشركات، مش للأطفال." },
      body: {
        en: "Our website and services are aimed at businesses and adults. We do not knowingly collect personal data from anyone under 18. If you believe a child has sent us personal data, contact us and we will delete it.",
        ar: "موقعنا وخدماتنا موجّهة للشركات والبالغين، ولا نجمع عن علم بيانات شخصية من أي شخص أقل من 18 عامًا. وإذا كنت تعتقد أن طفلًا أرسل إلينا بيانات شخصية، فتواصل معنا وسنحذفها.",
      },
    },
    {
      heading: { en: "Changes to this policy", ar: "التعديلات على هذه السياسة" },
      short: { en: "If we change anything important, we'll say so here.", ar: "لو غيّرنا حاجة مهمة، هنكتبها هنا." },
      body: {
        en: "We may update this policy when our services or the law change. The date at the top always shows the latest version. If a change significantly affects how we use your data, we will make it clear on the website or tell you directly.",
        ar: "قد نحدّث هذه السياسة عند تغيّر خدماتنا أو القانون، ويوضح التاريخ في أعلى الصفحة دائمًا آخر إصدار. وإذا أثّر التغيير بشكل جوهري على طريقة استخدامنا لبياناتك، فسنوضحه على الموقع أو نخبرك به مباشرة.",
      },
    },
  ],
};

export const termsOfService: LegalDoc = {
  title: { en: "Terms of service", ar: "الشروط والأحكام" },
  intro: {
    en: "The rules for using this website and the general terms on which Elmasry Tech builds software, rents and licenses ready-made systems, and provides support. Each project's signed proposal or contract adds the specifics — and wins if anything differs.",
    ar: "قواعد استخدام هذا الموقع، والشروط العامة التي تطوّر بها Elmasry Tech البرمجيات، وتؤجر الأنظمة الجاهزة أو ترخّصها، وتقدّم الدعم. ويضيف العرض أو العقد الموقّع لكل مشروع التفاصيل الخاصة به — وتكون له الأولوية عند أي اختلاف.",
  },
  updated: "2026-10-16",
  highlights: [3, 7, 8, 11],
  sections: [
    {
      heading: { en: "Who these terms apply to", ar: "على من تنطبق هذه الشروط" },
      short: { en: "These are the general rules; your signed offer has the details.", ar: "دي القواعد العامة، والتفاصيل في العرض اللي هتمضي عليه." },
      body: {
        en: "\"We\" means Elmasry Tech Solutions, Cairo, Egypt. \"You\" means any visitor of this website or any client who uses our services. \"Services\" means custom software development (websites, apps, systems, AI and automation), ready-made systems (rented or licensed), hosting, support and maintenance.\n\nBy using the website or our services you accept these terms. A signed proposal, order or contract for a specific project forms part of the agreement and takes precedence over these general terms where they differ.",
        ar: "يُقصد بـ\"نحن\" شركة Elmasry Tech Solutions، القاهرة، مصر. ويُقصد بـ\"أنت\" أي زائر لهذا الموقع أو أي عميل يستخدم خدماتنا. ويُقصد بـ\"الخدمات\" تطوير البرمجيات حسب الطلب (المواقع والتطبيقات والأنظمة والذكاء الاصطناعي والأتمتة)، والأنظمة الجاهزة (بالإيجار أو الترخيص)، والاستضافة، والدعم والصيانة.\n\nباستخدامك للموقع أو لخدماتنا فإنك توافق على هذه الشروط. ويُعد العرض أو أمر الشراء أو العقد الموقّع لأي مشروع جزءًا من الاتفاق، وتكون له الأولوية على هذه الشروط العامة عند الاختلاف.",
      },
    },
    {
      heading: { en: "Using this website", ar: "استخدام الموقع" },
      short: { en: "Use the site normally; don't copy it or try to break it.", ar: "استخدم الموقع عادي، ومتنسخوش ومتحاولش تبوّظه." },
      body: {
        en: "You may browse the website and use its content for your own information. You may not:\n- Copy, republish or sell the website's design, text, images or code without our written permission.\n- Try to break into, overload, scan for weaknesses or disrupt the website.\n- Send false information or impersonate another person through our forms.\n\nGuides and examples on the website are general information, not professional, legal or tax advice.",
        ar: "يمكنك تصفّح الموقع واستخدام محتواه لأغراضك الشخصية. ولا يجوز لك:\n- نسخ تصميم الموقع أو نصوصه أو صوره أو أكواده أو إعادة نشرها أو بيعها دون إذن كتابي منا.\n- محاولة اختراق الموقع أو إثقاله أو فحصه بحثًا عن ثغرات أو تعطيله.\n- إرسال بيانات غير صحيحة أو انتحال شخصية الغير من خلال نماذج الموقع.\n\nوالأدلة والأمثلة المنشورة على الموقع معلومات عامة، وليست استشارة مهنية أو قانونية أو ضريبية.",
      },
    },
    {
      heading: { en: "Proposals and starting work", ar: "العروض وبدء العمل" },
      short: { en: "We start only after you approve a written offer.", ar: "مبنبدأش غير بعد ما توافق على عرض مكتوب." },
      body: {
        en: "After a free consultation we send a written proposal that sets out the scope, deliverables, timeline, price and payment milestones. Work starts once you approve the proposal in writing (email or WhatsApp counts) and, where agreed, pay the first instalment. Timelines assume you provide content, access and feedback on time.",
        ar: "بعد الاستشارة المجانية نرسل عرضًا مكتوبًا يحدد نطاق العمل، والمخرجات، والمدة، والتكلفة، ودفعات السداد. ويبدأ العمل بعد موافقتك على العرض كتابيًا (البريد الإلكتروني أو واتساب يكفيان) وسداد الدفعة الأولى إن تم الاتفاق على ذلك. وتفترض المدد الزمنية أنك توفّر المحتوى والصلاحيات والملاحظات في المواعيد المتفق عليها.",
      },
    },
    {
      heading: { en: "Prices and payment", ar: "الأسعار والدفع" },
      short: { en: "You pay in instalments tied to what you receive.", ar: "بتدفع على دفعات مربوطة باللي بتستلمه." },
      body: {
        en: "- Prices are in Egyptian pounds unless the proposal says otherwise, plus any taxes required by law.\n- Custom projects are paid in milestones tied to deliverables, as set in the proposal.\n- Subscriptions are billed monthly or yearly in advance.\n- If a payment is more than 14 days late, we may pause work or suspend the service after notifying you, and resume once it is settled.",
        ar: "- الأسعار بالجنيه المصري ما لم ينص العرض على غير ذلك، مضافًا إليها الضرائب المقررة قانونًا.\n- تُسدَّد المشاريع المخصصة على دفعات مرتبطة بالمخرجات، وفق ما يحدده العرض.\n- تُدفع الاشتراكات شهريًا أو سنويًا مقدمًا.\n- إذا تأخر السداد أكثر من 14 يومًا، يجوز لنا إيقاف العمل أو تعليق الخدمة بعد إخطارك، ثم استئنافها فور السداد.",
      },
    },
    {
      heading: { en: "Changes during a project", ar: "التعديلات أثناء المشروع" },
      short: { en: "New ideas are welcome — we price them clearly before doing them.", ar: "الأفكار الجديدة على العين والراس — بس بنسعّرها بوضوح قبل ما نعملها." },
      body: {
        en: "Feedback within the agreed scope is included. Anything outside it (new features, new pages, new integrations) is a change request: we estimate its cost and time impact in writing, and do it only after you approve.",
        ar: "الملاحظات ضمن نطاق العمل المتفق عليه مشمولة. أما أي إضافة خارجه (خصائص أو صفحات أو تكاملات جديدة) فتُعد طلب تعديل: نقدّر تكلفته وأثره على المدة كتابيًا، ولا ننفذه إلا بعد موافقتك.",
      },
    },
    {
      heading: { en: "Your responsibilities", ar: "مسؤولياتك كعميل" },
      short: { en: "Send us what we need on time, and make sure you own your content.", ar: "ابعتلنا اللي محتاجينه في معاده، واتأكد إن المحتوى بتاعك." },
      body: {
        en: "You agree to provide accurate information, content, logos and access on time; to review and approve deliverables within the agreed period; and to make sure you have the rights to any content, images or data you give us. You are responsible for how you use the delivered software and for the legal compliance of your own business (including tax and e-invoicing obligations).",
        ar: "تلتزم بتوفير معلومات ومحتوى وشعارات وصلاحيات صحيحة في مواعيدها، وبمراجعة المخرجات واعتمادها خلال المدة المتفق عليها، وبالتأكد من امتلاكك حقوق أي محتوى أو صور أو بيانات تقدّمها لنا. وتتحمل مسؤولية طريقة استخدامك للبرنامج المسلَّم، والتزام نشاطك بالقوانين (بما في ذلك الالتزامات الضريبية والفاتورة الإلكترونية).",
      },
    },
    {
      heading: { en: "Delivery and acceptance", ar: "التسليم والاعتماد" },
      short: { en: "You test each stage; once it matches the offer, it's accepted.", ar: "بتجرّب كل مرحلة، ولو مطابقة للعرض تبقى اتعتمدت." },
      body: {
        en: "We deliver in stages and show progress regularly. After each delivery you have the review period stated in the proposal (7 days if none is stated) to report anything that does not match the agreed scope. We fix those points; after that, or once you start using the work in your business, the stage is considered accepted.",
        ar: "نسلّم العمل على مراحل ونعرض ما تم إنجازه بانتظام. وبعد كل تسليم تكون لك مدة المراجعة المحددة في العرض (7 أيام إذا لم تُحدد) للإبلاغ عن أي شيء لا يطابق النطاق المتفق عليه، ونقوم بإصلاحه. وبعد ذلك، أو بمجرد بدء استخدامك للعمل في نشاطك، تُعتبر المرحلة معتمدة.",
      },
    },
    {
      heading: { en: "Ownership and licences", ar: "الملكية الفكرية والتراخيص" },
      short: { en: "Pay in full and the custom work is yours; ready-made systems are licensed.", ar: "ادفع كامل والشغل المخصوص يبقى ملكك، والأنظمة الجاهزة بترخيص." },
      body: {
        en: "- **Custom work:** once paid in full, you own the source code and deliverables made specifically for you, and we hand over the code, documentation and accounts.\n- **Third-party and open-source components** keep their own licences.\n- **Our own tools and libraries** that we reuse across projects remain ours; you receive a permanent licence to use them as part of your software.\n- **Ready-made systems** are licensed, not sold (see the rental and licence sections).\n- We may mention you as a client or show the work in our portfolio **only with your written permission**.",
        ar: "- **العمل المخصص:** بعد السداد الكامل، تمتلك الكود المصدري والمخرجات التي طُوّرت خصيصًا لك، ونسلّمك الكود والتوثيق والحسابات.\n- **المكونات الخارجية ومفتوحة المصدر** تحتفظ بتراخيصها الخاصة.\n- **أدواتنا ومكتباتنا** التي نعيد استخدامها في مشاريع مختلفة تظل ملكنا، وتحصل على ترخيص دائم باستخدامها كجزء من برنامجك.\n- **الأنظمة الجاهزة** تُرخّص ولا تُباع (انظر قسمي الإيجار والترخيص).\n- لا نذكرك كعميل ولا نعرض العمل ضمن أعمالنا **إلا بإذن كتابي منك**.",
      },
    },
    {
      heading: { en: "Ready-made systems: monthly rental", ar: "الأنظمة الجاهزة: الاشتراك الشهري" },
      short: { en: "Rent monthly, cancel anytime with notice, and take your data with you.", ar: "بتأجر بالشهر، وتلغي في أي وقت بإخطار، وبياناتك بتاخدها معاك." },
      body: {
        en: "- The subscription includes hosting, updates, backups and support as described in your plan.\n- You can cancel at any time; cancellation takes effect at the end of the paid period. Paid periods are not refunded unless the law requires it.\n- After cancellation you can export your data. We keep it for 30 days so you can retrieve it, then delete it.\n- We aim to keep the service available around the clock and schedule maintenance at quiet hours; short interruptions can still happen.\n- The number of branches, users or devices is set by your plan.",
        ar: "- يشمل الاشتراك الاستضافة والتحديثات والنسخ الاحتياطي والدعم، وفق الموضح في خطتك.\n- يمكنك الإلغاء في أي وقت، ويسري الإلغاء بنهاية الفترة المدفوعة، ولا تُسترد المبالغ عن فترات مدفوعة إلا إذا اقتضى القانون ذلك.\n- بعد الإلغاء يمكنك تصدير بياناتك، ونحتفظ بها 30 يومًا لتتمكن من استرجاعها، ثم نحذفها.\n- نحرص على إتاحة الخدمة طوال الوقت ونجدول الصيانة في أوقات الهدوء، وقد تحدث انقطاعات قصيرة رغم ذلك.\n- يحدد خطتك عدد الفروع أو المستخدمين أو الأجهزة.",
      },
    },
    {
      heading: { en: "Ready-made systems: one-time licence", ar: "الأنظمة الجاهزة: الترخيص الدائم" },
      short: { en: "Pay once and use it on your devices — but you can't resell it.", ar: "بتدفع مرة واحدة وتستخدمه على أجهزتك — بس متقدرش تبيعه لغيرك." },
      body: {
        en: "- A one-time licence lets you use the system permanently, on your own devices or server, for the number of branches and devices stated in your order.\n- It includes installation and a support period stated in the proposal (one year if none is stated). After that, support and updates are available through an optional renewal.\n- You may not copy, resell, rent out or reverse-engineer the system, or install it beyond what your licence allows.\n- Your data stays on your premises and remains yours.",
        ar: "- يتيح لك الترخيص الدائم استخدام النظام بشكل دائم على أجهزتك أو خادمك، لعدد الفروع والأجهزة المحدد في طلبك.\n- يشمل التثبيت وفترة دعم محددة في العرض (سنة إذا لم تُحدد)، وبعدها يتاح الدعم والتحديثات بتجديد اختياري.\n- لا يجوز نسخ النظام أو إعادة بيعه أو تأجيره أو محاولة استخراج كوده، ولا تثبيته بما يتجاوز حدود ترخيصك.\n- تظل بياناتك لديك وملكًا لك.",
      },
    },
    {
      heading: { en: "Free demo", ar: "العرض التجريبي المجاني" },
      short: { en: "Try it free with sample data — no commitment.", ar: "جرّب ببلاش ببيانات تجريبية — من غير أي التزام." },
      body: {
        en: "Demos are free and carry no obligation to buy. Demo accounts use sample data and may be reset or removed at any time. Please don't enter sensitive real data (such as patient records) in a demo.",
        ar: "العروض التجريبية مجانية ولا تلزمك بالشراء. وتستخدم حسابات التجربة بيانات توضيحية وقد يُعاد ضبطها أو حذفها في أي وقت. ونرجو عدم إدخال بيانات حقيقية حساسة (مثل ملفات المرضى) في حساب التجربة.",
      },
    },
    {
      heading: { en: "Support and warranty", ar: "الدعم والضمان" },
      short: { en: "We fix our own mistakes for free during the support period.", ar: "بنصلّح أخطاءنا ببلاش طول فترة الدعم." },
      body: {
        en: "Each project includes a support period stated in its proposal, during which we fix defects in what we delivered at no cost. The warranty does not cover problems caused by changes made by others, misuse, third-party services (such as hosting, payment gateways, WhatsApp or government systems) changing their rules, or new features. After the support period, a monthly maintenance plan is available.",
        ar: "يشمل كل مشروع فترة دعم محددة في عرضه، نصلح خلالها أي أخطاء فيما سلّمناه دون تكلفة. ولا يغطي الضمان المشكلات الناتجة عن تعديلات أجراها غيرنا، أو سوء الاستخدام، أو تغيير خدمات خارجية لقواعدها (مثل الاستضافة أو بوابات الدفع أو واتساب أو الأنظمة الحكومية)، ولا الخصائص الجديدة. وبعد انتهاء فترة الدعم تتاح خطة صيانة شهرية.",
      },
    },
    {
      heading: { en: "Confidentiality", ar: "السرية" },
      short: { en: "Your business stays private — we sign an NDA if you want.", ar: "شغلك سرّي — ولو حابب نمضي اتفاقية عدم إفصاح." },
      body: {
        en: "Both sides keep each other's non-public business information confidential, during and after the work. We sign a non-disclosure agreement (NDA) on request.",
        ar: "يلتزم الطرفان بسرية المعلومات التجارية غير المعلنة لكل منهما، أثناء العمل وبعده. ونوقّع اتفاقية عدم إفصاح (NDA) عند الطلب.",
      },
    },
    {
      heading: { en: "Limitation of liability", ar: "حدود المسؤولية" },
      short: { en: "Our total liability is capped at what you paid for that project.", ar: "مسؤوليتنا كلها في حدود اللي دفعته في المشروع ده." },
      body: {
        en: "To the extent permitted by law, our total liability for any project or subscription is limited to the amount you paid for it in the 12 months before the claim. We are not liable for indirect losses such as lost profit, lost business or data loss caused by misuse, missing backups on your side, or third-party services. Nothing in these terms limits liability that cannot be limited under Egyptian law.",
        ar: "في الحدود التي يسمح بها القانون، تقتصر مسؤوليتنا الإجمالية عن أي مشروع أو اشتراك على المبلغ الذي دفعته مقابله خلال الاثني عشر شهرًا السابقة للمطالبة. ولا نتحمل الخسائر غير المباشرة مثل فوات الربح أو خسارة العملاء أو فقدان البيانات الناتج عن سوء الاستخدام أو غياب النسخ الاحتياطية لديك أو الخدمات الخارجية. ولا يحد شيء في هذه الشروط من مسؤولية لا يجوز تقييدها وفق القانون المصري.",
      },
    },
    {
      heading: { en: "Ending an agreement", ar: "إنهاء التعاقد" },
      short: { en: "Either side can end it with notice; you pay for what's done and get it.", ar: "أي طرف يقدر ينهي بإخطار؛ بتدفع اللي اتعمل وبتستلمه." },
      body: {
        en: "Either party may end a project with 14 days' written notice, or immediately if the other side seriously breaches these terms and does not fix it within 14 days of being notified. You pay for work completed up to the end date, and we hand over everything completed and paid for.",
        ar: "يجوز لأي طرف إنهاء المشروع بإخطار كتابي قبل 14 يومًا، أو فورًا إذا أخل الطرف الآخر إخلالًا جسيمًا بهذه الشروط ولم يصلحه خلال 14 يومًا من إخطاره. وتسدد مقابل العمل المنجز حتى تاريخ الإنهاء، ونسلّمك كل ما تم إنجازه وسداده.",
      },
    },
    {
      heading: { en: "Events beyond our control", ar: "الظروف الخارجة عن الإرادة" },
      short: { en: "If something outside anyone's control happens, deadlines move fairly.", ar: "لو حصل ظرف برّه إرادة الكل، المواعيد بتتأجل بشكل عادل." },
      body: {
        en: "Neither party is responsible for delays caused by events beyond reasonable control, such as natural disasters, widespread internet or power outages, government decisions or failures of major third-party platforms. Deadlines are extended fairly for the duration of the event.",
        ar: "لا يتحمل أي طرف مسؤولية التأخير الناتج عن ظروف خارجة عن السيطرة المعقولة، مثل الكوارث الطبيعية، أو انقطاع الإنترنت أو الكهرباء على نطاق واسع، أو القرارات الحكومية، أو أعطال المنصات الخارجية الكبرى. وتُمدد المواعيد بشكل عادل طوال مدة الظرف.",
      },
    },
    {
      heading: { en: "Governing law and disputes", ar: "القانون الحاكم وحل النزاعات" },
      short: { en: "Egyptian law applies; we talk first, then Cairo courts.", ar: "القانون المصري هو اللي بيحكم؛ نتكلم الأول، وبعدها محاكم القاهرة." },
      body: {
        en: "These terms are governed by the laws of the Arab Republic of Egypt. If a disagreement arises, we will first try to solve it amicably within 30 days. If that fails, the courts of Cairo have jurisdiction.",
        ar: "تخضع هذه الشروط لقوانين جمهورية مصر العربية. وعند حدوث أي خلاف نسعى أولًا لحله وديًا خلال 30 يومًا، فإن تعذّر ذلك تختص محاكم القاهرة بنظره.",
      },
    },
    {
      heading: { en: "Changes and contact", ar: "التعديلات والتواصل" },
      short: { en: "We may update these terms; your signed contract stays as it is.", ar: "ممكن نحدّث الشروط دي، بس عقدك الموقّع بيفضل زي ما هو." },
      body: {
        en: `We may update these terms from time to time; the date at the top shows the latest version. Changes do not alter a contract already signed unless both sides agree. For any question:\n- ${CONTACT.en}`,
        ar: `قد نحدّث هذه الشروط من وقت لآخر، ويوضح التاريخ في أعلى الصفحة آخر إصدار. ولا تغيّر التعديلات أي عقد موقّع بالفعل إلا باتفاق الطرفين. لأي استفسار:\n- ${CONTACT.ar}`,
      },
    },
  ],
};
