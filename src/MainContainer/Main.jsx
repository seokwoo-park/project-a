import React from "react";
import Post from "./components/Post";
import "./css/Main.css";

function Main() {
  const res = [
    {
      idx: 1,
      user_id: "text",
      content:
        "풀스택으로 개발 하고 싶은 당신 지금바로 카카오톡 오픈채팅에 프로젝트 아이디를 검색해주세요. 친절한 상담과 무료 강의가 여러분을 기다리고 있습니다.",
      imge: "/images/sfsdjkslf",
      date: "2021-01-14",
      tags: ["JS", "CSS", "REACT", "NODE"],
      title: "나는 풀스택 개발자 입니다.",
    },
    {
      idx: 2,
      user_id: "text",
      content: "dafdsasdfjkl",
      imge: "/images/sfsdjkslf",
      date: "2021-01-14",
      tags: ["JS", "CSS", "REACT", "NODE"],
      title: "나는 풀스택 개발자 입니다.",
    },
    {
      idx: 3,
      user_id: "text",
      content: "dafdsasdfjkl",
      imge: "/images/sfsdjkslf",
      date: "2021-01-14",
      tags: ["JS", "CSS", "REACT", "NODE"],
      title: "나는 풀스택 개발자 입니다.",
    },
    {
      idx: 4,
      user_id: "text",
      content: "dafdsasdfjkl",
      imge: "/images/sfsdjkslf",
      date: "2021-01-14",
      tags: ["JS", "CSS", "REACT", "NODE"],
      title: "나는 풀스택 개발자 입니다.",
    },
    {
      idx: 5,
      user_id: "text",
      content: "dafdsasdfjkl",
      imge: "/images/sfsdjkslf",
      date: "2021-01-14",
      tags: ["JS", "CSS", "REACT", "NODE"],
      title: "나는 풀스택 개발자 입니다.",
    },
    {
      idx: 6,
      user_id: "text",
      content: "dafdsasdfjkl",
      imge: "/images/sfsdjkslf",
      date: "2021-01-14",
      tags: ["JS", "CSS", "REACT", "NODE"],
      title: "나는 풀스택 개발자 입니다.",
    },
  ];
  return (
    <section className="content-section">
      {res.map((data) => {
        return (
          <Post
            key={data.idx}
            id={data.user_id}
            title={data.title}
            content={data.content}
            src={data.imge}
            date={data.date}
            tag={data.tags}
          />
        );
      })}
      {/* <Post /> */}
    </section>
  );
}

export default Main;
