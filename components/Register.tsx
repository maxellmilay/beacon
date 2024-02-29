"use client";

import { useState } from "react";
import Input from "@/components/generics/Input";
import { useUserContext } from '@/context/UserContext';
import { postInitialLinks, postUserInfo, refreshUserData, updateUserNodes } from '@/db/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Spinner from "@/components/generics/Spinner";
import { LinkInterface, NodeInterface } from '@/interface/graphInterface';

function Details() {
  const router = useRouter();
  const {user, setUser} = useUserContext();
  const [interest, setInterest] = useState(['']);
  const [history, setHistory] = useState(['']);
  const [strength, setStrength] = useState(['']);
  const [weakness, setWeakness] = useState(['']);
  const [education, setEducation] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
      setIsLoading(true);
      postUserInfo(user, {interest, history, strength, weakness, education});
      const {data} = await axios.post('http://127.0.0.1:8000/api/generate-top-careers/', {interest, history, strength, weakness, education});
      updateUserNodes(user, setUser, data.response);
      let links: LinkInterface[] = []
      data.response.forEach((item: NodeInterface) => {
        links.push({source: "Node 1", target: item.id})
      })
      postInitialLinks(user, links);
      refreshUserData(user, setUser)
      router.push('/home');
  };

  return (
    <div className="w-[24rem] mt-4 flex flex-col items-center mx-auto item bg-[white] rounded-lg py-8">
      {isLoading && <Spinner />}
      <div className="text-2xl font-bold">Setup your Profile</div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
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