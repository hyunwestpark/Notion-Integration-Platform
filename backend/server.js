import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import OpenAI from "openai/index.mjs";
import { fileURLToPath } from "url";
import { Client } from "@notionhq/client"; // Notion 클라이언트 import

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// OpenAI 설정
const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama", // required but unused
});

// Notion 클라이언트 설정
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// 개발 단계 요청 API 엔드포인트
app.post("/api/get-development-steps", async (req, res) => {
  const { targetArea, experienceLevel, duration } = req.body;
  const workoutRequestXML = `
    <workoutRequest>
    <targetArea>${targetArea}</targetArea>
    <experienceLevel>${experienceLevel}</experienceLevel>
    <duration>${duration}</duration>
    <language>한국어</language>
    <structure>
        <phase>
            <name>워밍업</name>
            <details>워밍업 운동 2-3가지를 제공해 주세요 (${
              duration === "30분" ? "5분" : "5-10분"
            } 동안 수행). 결과는 마크다운 형식으로, 추가 설명 없이 순수하게 워밍업 운동만 작성해 주세요.</details>
        </phase>
        <phase>
            <name>주요 운동</name>
            <details>${targetArea}에 대한 주요 운동을 제공해 주세요. 각 운동에 대해 세트 수, 반복 횟수, 그리고 쉬는 시간을 포함해 주세요. 추가적인 설명은 포함하지 말고 결과는 마크다운 형식으로 작성해 주세요.</details>
        </phase>
        <phase>
            <name>마무리 운동</name>
            <details>운동 후 마무리 스트레칭을 5분 동안 수행할 수 있도록 제공해 주세요. 추가적인 설명 없이 마크다운 형식으로 작성해 주세요.</details>
        </phase>
    </structure>
    <outputFormat>마크다운</outputFormat>
    <lengthLimit>응답은 2000자 이내여야 합니다.</lengthLimit>
    <note>추가적인 설명, 서두, 결론 없이 운동 계획만 작성해 주세요.</note>
</workoutRequest>
  `;

  try {
    // LLM 모델을 통해 개발 단계 요청
    const completion = await openai.chat.completions.create({
      model: "llama2",
      messages: [
        {
          role: "user",
          content: workoutRequestXML,
        },
      ],
    });

    const steps = completion.choices[0].message.content;

    // 노션 페이지 생성 요청
    // Notion 페이지 생성 요청
    // Notion 페이지 생성 요청
    const response = await notion.pages.create({
      parent: {
        page_id: process.env.PAGE_ID,
      },
      properties: {
        title: [
          {
            text: {
              content: `타겟 부위: ${targetArea} - ${duration} 운동 계획`,
            },
          },
        ],
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: steps.substring(0, 1500),
                },
              },
            ],
          },
        },
      ],
    });

    console.log("Notion Page Created: ", response);
    res.status(200).json({
      message: "Page successfully created in Notion",
      pageId: response.id,
    });
  } catch (error) {
    console.error("Error creating project development steps: ", error);
    res.status(500).send("Error processing request");
  }
});

// 정적 파일 제공 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
