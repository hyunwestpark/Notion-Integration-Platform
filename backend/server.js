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
  const { projectName } = req.body;

  if (!projectName) {
    return res.status(400).send("프로젝트 제목이 비어있습니다.");
  }

  try {
    // LLM 모델을 통해 개발 단계 요청
    console.log(projectName);

    const completion = await openai.chat.completions.create({
      model: "llama2",
      messages: [
        {
          role: "user",
          content: `Provide a simple and short workout plan for the following training: "${projectName}". The length of the content must not exceed 1500.`,
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
              content: projectName,
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
