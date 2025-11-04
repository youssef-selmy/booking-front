import React from "react";
import Card from "../../components/Card";
import done from "../../assets/done.svg";

const Complete = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <Card className="flex flex-col items-center gap-10 min-w-[600px]">
        <h1 className="text-2xl font-medium">Application submitted</h1>
        <img src={done} alt="" className="w-[250px]" />
        <div className="flex flex-col items-center text-lg">
          <p>The registration application is being reviewed.</p>
          <p>You will be contacted when the review is completed.</p>
        </div>
      </Card>
    </main>
  );
};

export default Complete;
