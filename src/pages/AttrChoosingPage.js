import { Flex, Heading } from 'rebass';
import AttrBar from '../components/AttrBar';
import './Page.css';


export default function AttrChoosingPage() {
  let attr = {
    "力量": 50,
    "体质": 50,
    "体型": 50,
    "敏捷": 50,
    "外貌": 50,
    "智力": 50,
    "意志": 50,
    "教育": 50
  }
  let onChange = (key, val) => {
    attr[key] = val;
  }
  return (
    <Flex className="text" flexDirection='column'>
      <Heading fontSize='38px' p='18px'>
        选择你的属性
      </Heading>
      <Flex alignSelf="center" mt='128px'>
        <Flex flexDirection='column' mr='75px'>
          <AttrBar onChange={onChange}>力量</AttrBar>
          <AttrBar onChange={onChange}>体质</AttrBar>
          <AttrBar onChange={onChange}>体型</AttrBar>
          <AttrBar onChange={onChange}>敏捷</AttrBar>
        </Flex>
        <Flex flexDirection='column'>
          <AttrBar onChange={onChange}>外貌</AttrBar>
          <AttrBar onChange={onChange}>智力</AttrBar>
          <AttrBar onChange={onChange}>意志</AttrBar>
          <AttrBar onChange={onChange}>教育</AttrBar>
        </Flex>
      </Flex>
    </Flex>
  )
}