// Privacy policy and terms of service (bilingual). Plain, readable language;
// review with a lawyer before relying on it for contracts.

import type { Locale } from "@/lib/site";

type T = Record<Locale, string>;

export interface LegalDoc {
  title: T;
  intro: T;
  updated: string;
  sections: { heading: T; body: T }[];
}

export const privacyPolicy: LegalDoc = {
  title: { en: "Privacy policy", ar: "سياسة الخصوصية" },
  intro: {
    en: "This policy explains what information Elmasry Tech collects through this website, why, and how you can control it.",
    ar: "توضح هذه السياسة المعلومات التي تجمعها Elmasry Tech عبر هذا الموقع، وسبب جمعها، وكيف يمكنك التحكم فيها.",
  },
  updated: "2026-10-08",
  sections: [
    {
      heading: { en: "Information you send us", ar: "المعلومات التي ترسلها إلينا" },
      body: {
        en: "When you use the contact form or message us, we receive your name, email, phone number, company and the details of your request. We use them only to reply, prepare a proposal and deliver the service you ask for.",
        ar: "عند استخدامك نموذج التواصل أو مراسلتنا، نستلم اسمك وبريدك الإلكتروني ورقم هاتفك واسم شركتك وتفاصيل طلبك. ونستخدمها فقط للرد عليك وإعداد العرض وتقديم الخدمة التي تطلبها.",
      },
    },
    {
      heading: { en: "Information collected automatically", ar: "المعلومات التي تُجمع تلقائيًا" },
      body: {
        en: "We use privacy-friendly, aggregated analytics (pages visited, device type, approximate country) to improve the site. We do not use advertising trackers on this website and we do not sell data.",
        ar: "نستخدم أدوات تحليل مجمّعة تحترم الخصوصية (الصفحات التي زرتها، ونوع الجهاز، والدولة التقريبية) لتحسين الموقع. ولا نستخدم أدوات تتبع إعلانية على هذا الموقع، ولا نبيع أي بيانات.",
      },
    },
    {
      heading: { en: "Client data inside our systems", ar: "بيانات العملاء داخل أنظمتنا" },
      body: {
        en: "Data you store in a system we build or host for you belongs to you. We access it only to provide support or when you ask us to, protect it with encryption and backups, and return or delete it when the contract ends.",
        ar: "البيانات التي تخزّنها في نظام نطوّره أو نستضيفه لك ملكك أنت. لا نصل إليها إلا لتقديم الدعم أو بطلب منك، ونحميها بالتشفير والنسخ الاحتياطي، ونسلّمها لك أو نحذفها عند انتهاء التعاقد.",
      },
    },
    {
      heading: { en: "Sharing", ar: "مشاركة البيانات" },
      body: {
        en: "We share data only with service providers needed to run our work (for example email and hosting providers), under confidentiality, or when required by law.",
        ar: "لا نشارك البيانات إلا مع مزوّدي الخدمات اللازمين لتشغيل أعمالنا (مثل مزوّدي البريد والاستضافة) وفق التزامات السرية، أو عندما يقتضي القانون ذلك.",
      },
    },
    {
      heading: { en: "Retention & security", ar: "مدة الاحتفاظ والأمان" },
      body: {
        en: "Enquiries are kept for up to two years unless they become a project. We use encrypted connections, access controls and regular backups.",
        ar: "نحتفظ بالاستفسارات لمدة أقصاها سنتان ما لم تتحول إلى مشروع. ونستخدم اتصالات مشفّرة وصلاحيات وصول ونسخًا احتياطية دورية.",
      },
    },
    {
      heading: { en: "Your rights", ar: "حقوقك" },
      body: {
        en: "You can ask us at any time for a copy of your data, to correct it, or to delete it, by emailing us. We reply within 14 days.",
        ar: "يمكنك في أي وقت أن تطلب نسخة من بياناتك أو تصحيحها أو حذفها عبر مراسلتنا بالبريد الإلكتروني، ونرد خلال 14 يومًا.",
      },
    },
  ],
};

export const termsOfService: LegalDoc = {
  title: { en: "Terms of service", ar: "الشروط والأحكام" },
  intro: {
    en: "These terms cover the use of this website and the general basis on which Elmasry Tech provides services. Each project is also governed by its own signed proposal or contract, which takes precedence.",
    ar: "تنظّم هذه الشروط استخدام هذا الموقع والأساس العام الذي تقدم عليه Elmasry Tech خدماتها. ويخضع كل مشروع أيضًا لعرضه أو عقده الموقّع، والذي تكون له الأولوية.",
  },
  updated: "2026-10-08",
  sections: [
    {
      heading: { en: "Proposals & scope", ar: "العروض ونطاق العمل" },
      body: {
        en: "Work starts after written approval of a proposal that defines the scope, timeline, price and payment milestones. Changes outside the agreed scope are estimated and approved before they are built.",
        ar: "يبدأ العمل بعد الموافقة المكتوبة على عرض يحدد نطاق العمل والمدة والتكلفة ومراحل الدفع. وتُقدَّر أي تعديلات خارج النطاق المتفق عليه وتُعتمد قبل تنفيذها.",
      },
    },
    {
      heading: { en: "Payments", ar: "الدفع" },
      body: {
        en: "Custom projects are paid in milestones tied to delivery. Subscriptions are billed monthly or yearly in advance. Late payments may pause work or service after notice.",
        ar: "تُسدَّد المشاريع المخصصة على دفعات مرتبطة بمراحل التسليم، وتُدفع الاشتراكات شهريًا أو سنويًا مقدمًا. وقد يؤدي التأخر في السداد إلى إيقاف العمل أو الخدمة بعد الإخطار.",
      },
    },
    {
      heading: { en: "Ownership & licences", ar: "الملكية والتراخيص" },
      body: {
        en: "On full payment, you own the source code and deliverables of custom work, excluding third-party and open-source components, which keep their own licences. Ready-made systems are licensed, not sold: you receive the right to use them under the chosen plan.",
        ar: "عند السداد الكامل تمتلك الكود المصدري ومخرجات العمل المخصص، باستثناء المكونات الخارجية ومفتوحة المصدر التي تحتفظ بتراخيصها الخاصة. أما الأنظمة الجاهزة فتُرخَّص ولا تُباع: تحصل على حق استخدامها وفق الخطة المختارة.",
      },
    },
    {
      heading: { en: "Support & warranty", ar: "الدعم والضمان" },
      body: {
        en: "Each project includes a support period stated in its proposal, during which we fix defects in delivered features at no cost. New features and changes after that are covered by a maintenance plan or a new proposal.",
        ar: "يشمل كل مشروع فترة دعم محددة في عرضه، نصلح خلالها أي أخطاء في الخصائص المسلّمة دون تكلفة. أما الخصائص الجديدة والتعديلات بعد ذلك فتُغطى بخطة صيانة أو بعرض جديد.",
      },
    },
    {
      heading: { en: "Confidentiality", ar: "السرية" },
      body: {
        en: "Both parties keep each other’s business information confidential. We do not show client work publicly without written permission.",
        ar: "يلتزم الطرفان بسرية المعلومات التجارية لكل منهما، ولا نعرض أعمال العملاء علنًا دون إذن مكتوب.",
      },
    },
    {
      heading: { en: "Liability", ar: "حدود المسؤولية" },
      body: {
        en: "Our total liability for any project is limited to the amount paid for that project. We are not liable for indirect losses such as lost profit or data loss caused by misuse or third-party services.",
        ar: "تقتصر مسؤوليتنا الإجمالية عن أي مشروع على المبلغ المدفوع مقابله، ولا نتحمل الخسائر غير المباشرة مثل فوات الربح أو فقدان البيانات الناتج عن سوء الاستخدام أو خدمات أطراف خارجية.",
      },
    },
    {
      heading: { en: "Governing law", ar: "القانون الحاكم" },
      body: {
        en: "These terms are governed by the laws of the Arab Republic of Egypt, and disputes are first handled amicably, then by the courts of Cairo.",
        ar: "تخضع هذه الشروط لقوانين جمهورية مصر العربية، وتُحل النزاعات وديًا أولًا، ثم أمام محاكم القاهرة.",
      },
    },
  ],
};
