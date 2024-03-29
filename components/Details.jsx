"use client";
import { React, useEffect, useState } from "react";
import Input from "@/components/generics/Input.jsx";

function Details() {
  const [interest, setInterest] = useState([]);
  const [history, setHistory] = useState([]);
  const [strength, setStrength] = useState([]);
  const [weakness, setWeakness] = useState([]);
  const [education, setEducation] = useState([]);
  const [allPost, setAllPost] = useState({
    interest: [],
    history: [],
    strength: [],
    weakness: [],
    education: [],
  });

  const settingPosts = () => {
    setAllPost({
      interest: interest,
      history: history,
      strength: strength,
      weakness: weakness,
      education: education,
    });
  };

  const submit = () => {
    console.log("hi");
    settingPosts();
  };

  useEffect(() => {
    console.log(allPost);
  }, [allPost]);

  return (
    <div className="w-[24rem] mt-10 flex flex-col items-center mx-auto item bg-[white] rounded-lg py-8">
      <div className="text-2xl font-bold">Setup your Profile</div>
      {console.log(interest, history)}
      <div className="inputs mt-5 gap-1 flex flex-col">
        <Input title="Interest" post={interest} setPost={setInterest} />
        <Input title="History" post={history} setPost={setHistory} />
        <Input title="Strengths" post={strength} setPost={setStrength} />
        <Input title="Weakness" post={weakness} setPost={setWeakness} />
        <Input title="Education" post={education} setPost={setEducation} />
      </div>
      <button
        className="bg-[#0c1323] mt-4 rounded-md text-white px-4 py-1"
        onClick={submit}
      >
        Submit{" "}
      </button>
    </div>
  );
}

export default Details;
