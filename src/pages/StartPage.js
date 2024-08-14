import './Page.css';
import logo from "../res/img-ui/logo.jpg"


export default function StartPage() {
  return (
    <div>
      <div style={{position: "absolute", left: '18px', bottom: '28px'}}>
        <p className="text">开始游戏</p>
        <p className="text">读取存档</p>
        <p className="text">设置</p>
      </div>

      <img style={{position: "absolute", right: '18px', bottom: '28px'}} src={logo}  alt='logo' />
    </div>

  )
}