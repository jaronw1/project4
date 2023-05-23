import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div>
      <Image className='w-[200px] m-auto block' src="/cloud_load.gif" alt="Loading" 
      width='100'
      height='100'/>
    </div>
  );
};

export default Loading;