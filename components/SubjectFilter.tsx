"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";

  const [subject, setSubject] = useState(query || "all");

  useEffect(() => {
    setSubject(query || "all");
  }, [query]);

  const handleValueChange = (value: string) => {
    setSubject(value);

    const newUrl =
      value === "all"
        ? removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
          })
        : formUrlQuery({
            params: searchParams.toString(),
            key: "subject",
            value,
          });

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={handleValueChange} value={subject}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
