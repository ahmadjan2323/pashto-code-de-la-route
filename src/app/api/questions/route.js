import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    let questions;
    if (category) {
      questions =
        await sql`SELECT * FROM questions WHERE category = ${category} ORDER BY id`;
    } else {
      questions = await sql`SELECT * FROM questions ORDER BY category, id`;
    }

    return Response.json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return Response.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      category,
      question_fr,
      question_ps,
      question_dr,
      question_en,
      answers,
      correct_index,
      image_path,
    } = body;

    const question = await sql`
      INSERT INTO questions (
        category, question_fr, question_ps, question_dr, question_en,
        answer_1_fr, answer_1_ps, answer_1_dr, answer_1_en,
        answer_2_fr, answer_2_ps, answer_2_dr, answer_2_en,
        answer_3_fr, answer_3_ps, answer_3_dr, answer_3_en,
        answer_4_fr, answer_4_ps, answer_4_dr, answer_4_en,
        correct_index, image_path
      ) VALUES (
        ${category}, ${question_fr}, ${question_ps}, ${question_dr}, ${question_en},
        ${answers[0].fr}, ${answers[0].ps}, ${answers[0].dr}, ${answers[0].en},
        ${answers[1].fr}, ${answers[1].ps}, ${answers[1].dr}, ${answers[1].en},
        ${answers[2].fr}, ${answers[2].ps}, ${answers[2].dr}, ${answers[2].en},
        ${answers[3].fr}, ${answers[3].ps}, ${answers[3].dr}, ${answers[3].en},
        ${correct_index}, ${image_path}
      ) RETURNING *
    `;

    return Response.json({ question: question[0] });
  } catch (error) {
    console.error("Error creating question:", error);
    return Response.json(
      { error: "Failed to create question" },
      { status: 500 },
    );
  }
}
