import React from "react";

const SummarizedContent = () => {
  return (
    <div className="self-stretch p-7 bg-white rounded-lg outline  outline-border-border-border inline-flex flex-col justify-center items-start gap-5 overflow-hidden">
      <div className="self-stretch inline-flex justify-start items-center gap-2">
        <div className="w-8 h-8 relative overflow-hidden">
          <div className="w-6 h-6  absolute outline  outline-border-border-foreground"></div>
        </div>
        <div className="justify-start text-black text-2xl font-semibold font-['Inter'] leading-8">
          Article Quiz Generator
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <div className="w-4 h-4 relative overflow-hidden">
            <div className="w-3.5 h-3 left-[1.33px]  absolute outline outline-offset-[-0.50px] outline-border-border-foreground"></div>
          </div>
          <div className="justify-start text-neutral-500 text-sm font-semibold font-['Inter'] leading-5">
            Summarized content
          </div>
        </div>
        <div className="justify-start text-black text-2xl font-semibold font-['Inter'] leading-8">
          Genghis khan
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          <div className="self-stretch justify-start text-black text-sm font-normal font-['Inter'] leading-5">
            Genghis Khan, born Temüjin around 1162, was the founder of the
            Mongol Empire. After his father's death, Temüjin's family was left
            in poverty, and he later killed his half-brother to secure his
            position. He built alliances with leaders like Jamukha and Toghrul,
            and despite being defeated in battle and briefly under the Jin
            dynasty, he rose to power by defeating rivals. By 1206, after
            overcoming the Naiman tribe and executing Jamukha, Temüjin became
            the undisputed ruler of the Mongol steppe, eventually leading a
            series of successful military campaigns that expanded his empire
            across China and Central Asia.
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-end items-end gap-2">
        <div className="self-stretch inline-flex justify-start items-center gap-1">
          <div className="w-3.5 h-3.5 relative"></div>
          <div className="justify-start text-text-text-muted-foreground text-sm font-semibold font-['Inter'] leading-5">
            Article Content
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
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
        <div className="px-4 py-1 bg-background-bg-background rounded-md inline-flex justify-center items-center gap-2">
          <div className="justify-start text-text-text-foreground text-sm font-medium font-['Inter'] leading-5">
            See more
          </div>
        </div>
      </div>
      <div className="h-10 px-6 py-2 bg-zinc-900 rounded-md inline-flex justify-center items-center gap-2">
        <div className="justify-start text-text-text-primary-foreground text-sm font-medium font-['Inter'] leading-5">
          Take a quiz
        </div>
      </div>
    </div>
  );
};

export default SummarizedContent;
