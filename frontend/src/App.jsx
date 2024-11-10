import Button from "./components/Button";
import { Container } from "./components/Container";
import Modal from "./components/Modal";
import Select from "./components/Select";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [targetArea, setTargetArea] = useState("가슴");
  const [experienceLevel, setExperienceLevel] = useState("초보자");
  const [duration, setDuration] = useState("30분");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [intervalSpeed, setIntervalSpeed] = useState(10);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval); // 100%에 도달하면 타이머 종료
            return 100;
          }
          return prev + 0.1;
        });
      }, intervalSpeed);

      return () => clearInterval(interval);
    }
  }, [loading, intervalSpeed]);

  useEffect(() => {
    if (progress >= 70 && loading) {
      setIntervalSpeed(30);
    }
  }, [progress, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    try {
      const response = await axios.post(
        "http://localhost:9000/api/get-development-steps",
        {
          targetArea,
          experienceLevel,
          duration,
        }
      );
      console.log("Notion page created: ", response.data);
      setIsModalOpen(true);
      setProgress(0);
      setIntervalSpeed(10);
    } catch (error) {
      console.error("Error creating workout plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="w-full min-w-80">
        <h1 className="text-3xl mb-4"> 노션 운동 계획 생성 자동화 💪</h1>
        <p className=" text-gray-600 mb-1">
          Ollama AI가 최적의 운동 계획을 제공합니다!
        </p>
        <p className=" text-gray-600 mb-1">
          단 몇 초 안에 개인의 목표와 선호도를 고려한 맞춤형 운동 루틴을
          생성하고, 생성된 계획은 노션에 자동으로 저장됩니다.
        </p>
        <p className=" text-gray-600 mb-4">
          초보자부터 전문가까지, 누구나 쉽게 따라할 수 있는 계획을 통해 건강하고
          균형 잡힌 몸을 만들어 보세요 :)
        </p>
        <hr className="mb-4" />
        <form className="w-full mb-4">
          <Select
            label="타겟 부위"
            options={["가슴", "등", "다리", "팔", "어깨", "복근", "전신"]}
            value={targetArea}
            onChange={setTargetArea}
          />
          <Select
            label="경험 수준"
            options={["초보자", "중급자", "숙련자"]}
            value={experienceLevel}
            onChange={setExperienceLevel}
          />
          <Select
            label="운동 시간"
            options={["30분", "45분", "1시간", "1시간 15분"]}
            value={duration}
            onChange={setDuration}
          />
        </form>
        <Button
          onClick={handleSubmit}
          type={"submit"}
          disabled={loading}
          style={{
            position: "relative",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          classname={
            "rounded-md px-2 min-w-40 w-full hover:bg-gray-100 h-14 bg-gray-200"
          }
        >
          <div
            className={`absolute inset-0 bg-pink-400  rounded-md `}
            style={{
              width: `${progress}%`,
              transition: "width 0.03s linear",
            }}
          ></div>
          <span className="relative z-10">
            {loading ? `운동 계획 생성 중...` : "운동 계획 생성"}
          </span>
        </Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"운동 계획 생성 완료!"}
          message={
            "운동 계획이 성공적으로 생성되었습니다. 노션에서 확인하세요."
          }
        ></Modal>
      </div>
    </Container>
  );
}

export default App;
