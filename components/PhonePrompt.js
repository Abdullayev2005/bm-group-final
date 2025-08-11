"use client";

import { useEffect } from "react";

export default function PhonePrompt() {
  useEffect(() => {
    // Agar allaqachon yuborilgan bo'lsa — hech narsa qilmaymiz
    if (typeof window === "undefined") return;
    if (localStorage.getItem("leadSent") === "1") return;

    const ASK_DELAY_MS = 60_000; // 1 daqiqa
    let intervalId;

    const normalizePhone = (raw) => {
      if (!raw) return "";
      const cleaned = raw.replace(/[^\d+]/g, "");
      // 998... yoki +998... holatlariga moslab
      if (cleaned.startsWith("998")) return `+${cleaned}`;
      if (!cleaned.startsWith("+")) return `+${cleaned}`;
      return cleaned;
    };

    const isValidPhone = (p) => /^\+998\d{9}$/.test(p); // +998XXXXXXXXX (9 raqam)
    const isValidName = (n) => typeof n === "string" && n.trim().length >= 2;

    const askAndSend = async () => {
      try {
        // 1) Avval telefon
        let phone = prompt("Telefon raqamingizni kiriting (+998XXXXXXXXX):");
        if (!phone) return; // foydalanuvchi rad qildi -> keyingi daqiqada yana so'raymiz

        phone = normalizePhone(phone);
        if (!isValidPhone(phone)) {
          alert("Telefon formati noto‘g‘ri. Namuna: +998901234567");
          return; // keyingi daqiqada yana so'raydi
        }

        // 2) Keyin ism
        const name = prompt("Ismingizni kiriting:");
        if (!name || !isValidName(name)) {
          alert("Ism eng kamida 2 ta harf bo‘lishi kerak.");
          return;
        }

        // 3) CRM'ga yuborish
        const payload = {
          phone,
          name,
          page: window.location.href,   // foydali qo'shimcha
          ts: new Date().toISOString() // vaqt tamg'asi
        };

        // JSON ko'rinishida yuborish
        const res = await fetch("https://backbmgroup.smartdiller.com/api/main/storelead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          // Ba'zi CRM'lar form-encoded talab qiladi: shunda pastdagini yoqishingiz mumkin
          // const form = new URLSearchParams(payload).toString();
          // const res2 = await fetch("https://backbmgroup.smartdiller.com/api/main/storelead", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
          //   body: form,
          // });
          // if (!res2.ok) throw new Error("CRM returned " + res2.status);
          throw new Error("CRM returned " + res.status);
        }

        // 4) Muvaffaqiyatli bo'lsa — qayta chiqmasin
        localStorage.setItem("leadSent", "1");
        clearInterval(intervalId);
        console.log("Lead CRMga yuborildi:", payload);
      } catch (err) {
        console.error("Lead yuborishda xatolik:", err);
        // CORS yoki autentifikatsiya bo‘lsa backendda ruxsat kerak bo‘lishi mumkin
      }
    };

    // 1 daqiqadan keyin birinchi marta so‘raymiz
    const firstTimer = setTimeout(() => {
      askAndSend();
      // Agar foydalanuvchi to'ldirmasa, har 1 daqiqada takror so‘raydi
      intervalId = setInterval(() => {
        if (localStorage.getItem("leadSent") === "1") {
          clearInterval(intervalId);
          return;
        }
        askAndSend();
      }, ASK_DELAY_MS);
    }, ASK_DELAY_MS);

    return () => {
      clearTimeout(firstTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return null;
}
