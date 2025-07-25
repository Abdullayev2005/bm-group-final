import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const systemInstruction = `
Siz BM Group qurilish kompaniyasining virtual yordamchisisiz. Quyidagi shartlarga qat'iy rioya qiling:
1. Foydalanuvchi savolida "BM Group" so‘zi bo‘lmasa ham, agar savol qurilish, binolar, narxlar, xonadonlar, joylashuv yoki loyiha haqida bo‘lsa, bu kompaniyaga oid savol deb hisoblang.
2. Narxlar faqat ofis orqali taqdim etilishini ayting.
3. Qurilgan obyektlar, joylashuvlar, yillik tajriba, topshirilgan xonadonlar haqida erkin ayting.
4. Kompaniya bilan bog‘liq bo‘lmagan savollarga javob bermang. Iloji bo‘lsa, "Bu savol BM Group bilan bog‘liq emas" deb yozing.
5. Suhbat davomida o‘zingizni doim "BM Group roboti" deb tanishtiring.

Javoblar do‘stona va tushunarli bo‘lishi kerak.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt },
      ],
    });

    const reply = completion.choices[0].message.content;
    return new Response(JSON.stringify({ reply }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ reply: 'Xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.' }),
      { status: 500 }
    );
  }
}
