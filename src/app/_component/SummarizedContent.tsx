import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { FiFileText } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";

export const SummarizedContent = () => {
  return (
    <Card className="mt-12 h-fit p-7 bg-white rounded-lg outline  outline-border-border-border flex flex-col  gap-5 ">
      <div className=" flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <LuSparkles className="w-8 h-8 " />

          <div className="justify-start text-black text-2xl font-semibold  leading-8">
            Article Quiz Generator
          </div>
        </div>
        <div className="self-stretch justify-start text-zinc-500 text-base font-normal leading-5">
          Paste your article below to generate a summarize and quiz question.
          Your articles will saved in the sidebar for future reference.
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="inline-flex justify-start items-center gap-1">
          <FiFileText className="w-4 h-4" />
          <div className="justify-start text-text-text-muted-foreground text-sm font-semibold leading-5">
            Summarized content
          </div>
        </div>
        <div className="flex flex-col">
          <div className="justify-start text-black text-2xl font-semibold font-['Inter'] leading-8">
            Genghis khan
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <div className="self-stretch justify-start text-black text-sm font-normal font-['Inter'] leading-5">
              Genghis Khan, born Temüjin around 1162, was the founder of the
              Mongol Empire. After his father's death, Temüjin's family was left
              in poverty, and he later killed his half-brother to secure his
              position. He built alliances with leaders like Jamukha and
              Toghrul, and despite being defeated in battle and briefly under
              the Jin dynasty, he rose to power by defeating rivals. By 1206,
              after overcoming the Naiman tribe and executing Jamukha, Temüjin
              became the undisputed ruler of the Mongol steppe, eventually
              leading a series of successful military campaigns that expanded
              his empire across China and Central Asia.
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="inline-flex justify-start items-center gap-1">
          <FiFileText className="w-4 h-4" />
          <div className="justify-start text-text-text-muted-foreground text-sm font-semibold  leading-5">
            Article Content
          </div>
        </div>
        <div>
          <div className="self-stretch justify-start text-text-text-primary text-sm font-normal font-['Inter'] leading-5 line-clamp-3">
            Genghis Khan[a] (born Temüjin; c. 1162 – August 1227), also known as
            Chinggis Khan,[b] was the founder and first khan of the Mongol
            Empire. After spending most of his life uniting the Mongol tribes,
            he launched a series of military campaigns, conquering large parts
            of China and Central Asia.
            <br />
            <br />
            Born between 1155 and 1167 and given the name Temüjin, he was the
            eldest child of Yesugei, a Mongol chieftain of the Borjigin clan,
            and his wife Hö'elün. When Temüjin was eight, his father died and
            his family was abandoned by its tribe. Reduced to near-poverty,
            Temüjin killed his older half-brother to secure his familial
            position. His charismatic personality helped to attract his first
            followers and to form alliances with two prominent steppe leaders
            named Jamukha and Toghrul; they worked together to retrieve
            Temüjin's newlywed wife Börte, who had been kidnapped by raiders. As
            his reputation grew, his relationship with Jamukha deteriorated into
            open warfare. Temüjin was badly defeated in c. 1187, and may have
            spent the following years as a subject of the Jin dynasty; upon
            reemerging in 1196, he swiftly began gaining power. Toghrul came to
            view Temüjin as a threat and launched a surprise attack on him in
            1203. Temüjin retreated, then regrouped and overpowered Toghrul;
            after defeating the Naiman tribe and executing Jamukha, he was left
            as the sole ruler on the Mongolian steppe.
          </div>
        </div>
      </div>

      <Button variant="outline">Generate summary</Button>
    </Card>
  );
};
