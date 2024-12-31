import { Input } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'


const Editablecell = ({getValue,row,column,table}) => {
  const initialvalue=getValue();
  const [value,setvalue] = useState(initialvalue);

  const onBlur = () =>{
    table.options.meta.updateData(row.index, column.id , value)
  }
  useEffect(()=>{
    setvalue(initialvalue)
  },[initialvalue])
  return (
    <Input value={value} onChange={e=> setvalue(e.target.value)} variant="filled" size="sm" w="85%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" onBlur={onBlur} ></Input>
  )
}

export default Editablecell
