import { useState } from "react";
import { Flex } from "rebass";

export default function AttrBar({children, onChange}) {
  let [val, setVal] = useState(50);
  return (
    <Flex fontSize='20px' mt='20px'>
      <div>{children}</div>
      <Flex onClick={()=>{setVal(val + 10); onChange(children, val)}} fontWeight={800} px='8px'>+</Flex>
      <progress value={val / 10} max="10"></progress>
      <Flex onClick={()=>{setVal(val - 10); onChange(children, val)}} fontWeight={800} px='8px'>{'-'}</Flex>
      <div>{val}</div>
    </Flex>
  )
}