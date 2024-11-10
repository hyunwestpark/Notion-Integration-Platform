import Button from "./components/Button";
import { Container } from "./components/Container";
import Input from "./components/Input";
import React, { useEffect, useState } from "react";

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:9000/api/notion-test") // 올바른 포트 번호인지 확인
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => setData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);
  const [projectName, setProjectName] = useState("");
  const handleGetDevelopmentSteps = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/get-development-steps",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch development steps:", response.ok);
      }
      const data = await response.json();
      console.log("Development Steps saved to Notion:", data);
    } catch (error) {
      console.log("Error creating development steps:", error);
    }
  };

  return (
    <Container>
      <h1 className="text-3xl">노션 프로젝트 생성 자동화</h1>
      <div className="flex justify-between space-x-4 w-full">
        <div className="border border-black rounded-md px-3 w-full">
          <Input
            label={"프로젝트 이름"}
            name={"프로젝트 이름"}
            type={"text"}
            placeholder={"프로젝트 이름을 입력해주세요."}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            classname={"w-full"}
          />
        </div>
        <Button
          content={"답변 생성하기"}
          onClick={handleGetDevelopmentSteps}
          classname={"border border-black rounded-md px-2 min-w-40"}
        ></Button>
      </div>
    </Container>
  );
}

export default App;
