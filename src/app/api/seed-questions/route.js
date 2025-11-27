import sql from "@/app/api/utils/sql";

export async function POST() {
  try {
    // Sample questions for each category
    const categories = [
      "Road Signs",
      "Driving Behavior & Priority",
      "Safety & Pedestrians",
      "Vehicle Control & Mechanics",
      "Weather, Night & Risks",
      "First Aid & Accident Response",
    ];

    const sampleQuestions = {
      "Road Signs": [
        {
          question_fr: "Que signifie ce panneau d'arrêt ?",
          question_ps: "دا د درېدو نښه څه معنی لري؟",
          question_dr: "این علامت توقف چه معنی دارد؟",
          question_en: "What does this stop sign mean?",
          answers: [
            {
              fr: "Arrêt obligatoire",
              ps: "جبري درېدنه",
              dr: "توقف اجباری",
              en: "Mandatory stop",
            },
            {
              fr: "Cédez le passage",
              ps: "لار پرېښودل",
              dr: "حق تقدم را بدهید",
              en: "Give way",
            },
            {
              fr: "Sens interdit",
              ps: "لار بنده ده",
              dr: "ورود ممنوع",
              en: "No entry",
            },
            { fr: "Ralentir", ps: "ورو کول", dr: "کاهش سرعت", en: "Slow down" },
          ],
          correct_index: 0,
          image: "road_signs/stop.png",
        },
        {
          question_fr: "Que signifie un panneau triangulaire rouge et blanc ?",
          question_ps: "د سور او سپین درې کنجه نښه څه معنی لري؟",
          question_dr: "علامت مثلثی قرمز و سفید چه معنی دارد؟",
          question_en: "What does a red and white triangular sign mean?",
          answers: [
            { fr: "Danger", ps: "خطر", dr: "خطر", en: "Danger" },
            { fr: "Interdiction", ps: "منع", dr: "ممنوع", en: "Prohibition" },
            { fr: "Obligation", ps: "اجبار", dr: "اجباری", en: "Obligation" },
            { fr: "Indication", ps: "نښه", dr: "راهنمایی", en: "Information" },
          ],
          correct_index: 0,
          image: "road_signs/danger.png",
        },
      ],
      "Driving Behavior & Priority": [
        {
          question_fr: "Qui a la priorité à un carrefour sans signalisation ?",
          question_ps:
            "په یو څلور لاره کې چې پرته له نښو څخه وي، چا ته لومړیتوب ورکول کیږي؟",
          question_dr: "در چهارراه بدون علامت، اولویت با کیست؟",
          question_en: "Who has priority at an unsignaled intersection?",
          answers: [
            {
              fr: "Véhicule venant de droite",
              ps: "د ښي څخه راتلونکي وسایط",
              dr: "خودروی آمده از راست",
              en: "Vehicle coming from the right",
            },
            {
              fr: "Véhicule venant de gauche",
              ps: "د کیڼ څخه راتلونکي وسایط",
              dr: "خودروی آمده از چپ",
              en: "Vehicle coming from the left",
            },
            {
              fr: "Véhicule le plus rapide",
              ps: "ګړندي وسایط",
              dr: "خودروی سریع‌تر",
              en: "Fastest vehicle",
            },
            {
              fr: "Premier arrivé",
              ps: "لومړی راغلی",
              dr: "اولین رسیده",
              en: "First to arrive",
            },
          ],
          correct_index: 0,
          image: "driving/priority_right.png",
        },
      ],
      "Safety & Pedestrians": [
        {
          question_fr:
            "Comment devez-vous vous comporter près d'un passage piéton ?",
          question_ps:
            "د پیاده وروڅخه تیریدونکي ځایونو ته نږدې دی څنګه چلند وکړي؟",
          question_dr: "نزدیک عبور عابرین پیاده چگونه رفتار کنید؟",
          question_en: "How should you behave near a pedestrian crossing?",
          answers: [
            {
              fr: "Ralentir et être prêt à s'arrêter",
              ps: "ورو کول او د درېدو دپاره چمتوب",
              dr: "کاهش سرعت و آمادگی توقف",
              en: "Slow down and be ready to stop",
            },
            {
              fr: "Accélérer pour passer vite",
              ps: "ګړندي تېرېدل",
              dr: "شتاب گیری برای عبور سریع",
              en: "Speed up to pass quickly",
            },
            {
              fr: "Klaxonner",
              ps: "د زنګ وهل",
              dr: "بوق زدن",
              en: "Honk the horn",
            },
            {
              fr: "Ignorer les piétons",
              ps: "د پیادو پام نه کول",
              dr: "نادیده گرفتن عابرین",
              en: "Ignore pedestrians",
            },
          ],
          correct_index: 0,
          image: "safety/pedestrian_crossing.png",
        },
      ],
      "Vehicle Control & Mechanics": [
        {
          question_fr: "Quand devez-vous vérifier la pression des pneus ?",
          question_ps: "کله دی د ټایرونو فشار وګوري؟",
          question_dr: "چه زمانی باید فشار تایرها را بررسی کنید؟",
          question_en: "When should you check tire pressure?",
          answers: [
            {
              fr: "Au moins une fois par mois",
              ps: "لږترلږه په میاشت کې یوځل",
              dr: "حداقل یک بار در ماه",
              en: "At least once a month",
            },
            {
              fr: "Une fois par an",
              ps: "په کال کې یوځل",
              dr: "یک بار در سال",
              en: "Once a year",
            },
            {
              fr: "Seulement en cas de problème",
              ps: "یوازې د ستونزې پر مهال",
              dr: "فقط در صورت مشکل",
              en: "Only when there's a problem",
            },
            { fr: "Jamais", ps: "هیڅکله", dr: "هرگز", en: "Never" },
          ],
          correct_index: 0,
          image: "mechanics/tire_pressure.png",
        },
      ],
      "Weather, Night & Risks": [
        {
          question_fr: "Comment conduire par temps de pluie ?",
          question_ps: "د باران پر مهال څنګه موټر چلوي؟",
          question_dr: "در هوای بارانی چگونه رانندگی کنیم؟",
          question_en: "How to drive in rainy weather?",
          answers: [
            {
              fr: "Réduire la vitesse et augmenter la distance",
              ps: "د سرعت کمول او د فاصلې زیاتول",
              dr: "کاهش سرعت و افزایش فاصله",
              en: "Reduce speed and increase distance",
            },
            {
              fr: "Maintenir la vitesse normale",
              ps: "نورمال سرعت ساتل",
              dr: "حفظ سرعت عادی",
              en: "Maintain normal speed",
            },
            {
              fr: "Accélérer pour traverser rapidement",
              ps: "ګړندي تېرېدل دپاره سرعت زیاتول",
              dr: "شتاب گیری برای عبور سریع",
              en: "Speed up to cross quickly",
            },
            {
              fr: "S'arrêter immédiatement",
              ps: "سمدستي درېدل",
              dr: "توقف فوری",
              en: "Stop immediately",
            },
          ],
          correct_index: 0,
          image: "weather/rain_driving.png",
        },
      ],
      "First Aid & Accident Response": [
        {
          question_fr: "Que faire en premier lors d'un accident ?",
          question_ps: "د ټکر پر مهال لومړي څه وکړي؟",
          question_dr: "در هنگام تصادف ابتدا چه کار کنیم؟",
          question_en: "What to do first in an accident?",
          answers: [
            {
              fr: "Sécuriser la zone",
              ps: "د سیمې خوندي کول",
              dr: "ایمن‌سازی محل",
              en: "Secure the area",
            },
            {
              fr: "Sortir immédiatement du véhicule",
              ps: "سمدستي د موټر څخه وتل",
              dr: "خروج فوری از خودرو",
              en: "Exit the vehicle immediately",
            },
            {
              fr: "Chercher les responsables",
              ps: "د مسولینو لټول",
              dr: "جستجوی مسئولین",
              en: "Look for those responsible",
            },
            {
              fr: "Prendre des photos",
              ps: "انځورونه اخیستل",
              dr: "عکس گرفتن",
              en: "Take photos",
            },
          ],
          correct_index: 0,
          image: "first_aid/accident_scene.png",
        },
      ],
    };

    // Clear existing questions
    await sql`DELETE FROM questions`;

    // Insert questions for each category
    for (const category of categories) {
      const questions = sampleQuestions[category] || [];

      // Generate 80 questions per category (repeat and modify as needed)
      for (let i = 0; i < 80; i++) {
        const baseQuestion = questions[i % questions.length];
        if (!baseQuestion) continue;

        const variation =
          i < questions.length
            ? ""
            : ` (Variante ${Math.floor(i / questions.length) + 1})`;

        await sql`
          INSERT INTO questions (
            category, question_fr, question_ps, question_dr,
            question_en, answer_1_fr, answer_1_ps, answer_1_dr,
            answer_1_en, answer_2_fr, answer_2_ps, answer_2_dr,
            answer_2_en, answer_3_fr, answer_3_ps, answer_3_dr,
            answer_3_en, answer_4_fr, answer_4_ps, answer_4_dr,
            answer_4_en, correct_index, image_path
          ) VALUES (
            ${category},
            ${baseQuestion.question_fr + variation},
            ${baseQuestion.question_ps + variation},
            ${baseQuestion.question_dr + variation},
            ${baseQuestion.question_en + variation},
            ${baseQuestion.answers[0].fr}, ${baseQuestion.answers[0].ps}, ${baseQuestion.answers[0].dr},
            ${baseQuestion.answers[0].en}, ${baseQuestion.answers[1].fr}, ${baseQuestion.answers[1].ps}, ${baseQuestion.answers[1].dr},
            ${baseQuestion.answers[1].en}, ${baseQuestion.answers[2].fr}, ${baseQuestion.answers[2].ps}, ${baseQuestion.answers[2].dr},
            ${baseQuestion.answers[2].en}, ${baseQuestion.answers[3].fr}, ${baseQuestion.answers[3].ps}, ${baseQuestion.answers[3].dr},
            ${baseQuestion.answers[3].en}, ${baseQuestion.correct_index},
            ${baseQuestion.image}
          )
        `;
      }
    }

    const totalQuestions = await sql`SELECT COUNT(*) as count FROM questions`;

    return Response.json({
      success: true,
      message: `Seeded ${totalQuestions[0].count} questions successfully`,
      categories: categories.length,
    });
  } catch (error) {
    console.error("Error seeding questions:", error);
    return Response.json(
      { error: "Failed to seed questions" },
      { status: 500 },
    );
  }
}
