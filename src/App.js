import React,{useState}  from "react"

import Icon from "./components/Icon"
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Card, CardBody, Container,Col, Row, Button} from "reactstrap"
import  "./App.css"
const itemArray=new Array(9).fill("empty")

const App=()=>{

    const [isCross,setIsCross]=useState(false);
    const [winmsg,setWinmsg]=useState("");
    const reloadGame=()=>{
        setIsCross(false);
        setWinmsg("")
        itemArray.fill("empty",0,9);
    }
    const checkIsWinner=()=>{
        if(itemArray[0]=== itemArray[1] &&
            itemArray[0]===itemArray[2]  && 
            itemArray[0]!=="empty"
            ){
                setWinmsg(`${itemArray[0]==="circle"?document.getElementsByClassName("name1")[0].value:document.getElementsByClassName("name2")[0].value} is the winner!!`)
            }
            else if(itemArray[3]=== itemArray[4] &&
                itemArray[4]===itemArray[5]  && 
                itemArray[3]!=="empty")
                {
                    setWinmsg(`${itemArray[3]==="circle"?document.getElementsByClassName("name1")[0].value:document.getElementsByClassName("name2")[0].value} is the winner!!`)
                }
            else if(itemArray[6]=== itemArray[7] &&
                    itemArray[7]===itemArray[8]  && 
                    itemArray[6]!=="empty")
                    {
                        setWinmsg(`${itemArray[6]==="circle"?document.getElementsByClassName("name1")[0].value:document.getElementsByClassName("name2")[0].value} is the winner!!`)
                    }
            else if(itemArray[0]=== itemArray[3] &&
                    itemArray[3]===itemArray[6]  && 
                    itemArray[0]!=="empty")
                    {
                        setWinmsg(`${itemArray[0]==="circle"?document.getElementsByClassName("name1")[0].value:document.getElementsByClassName("name2")[0].value} is the winner!!`)
                    }
            else if(itemArray[1]=== itemArray[4] &&
                    itemArray[4]===itemArray[7]  && 
                    itemArray[1]!=="empty")
                    {
                        setWinmsg(`${itemArray[1]==="circle"?document.getElementsByClassName("name1")[0].value:document.getElementsByClassName("name2")[0].value} is the winner!!`)
                    }
            else if(itemArray[2]=== itemArray[5] && itemArray[5]===itemArray[8]  && itemArray[2]!=="empty")
                    {
                        setWinmsg(`${itemArray[2]==="circle"?document.getElementsByClassName("name1")[0].value:document.getElementsByClassName("name2")[0].value} is the winner!!`)
                    }
                    else if(itemArray[0]=== itemArray[4] && itemArray[4]===itemArray[8]  && itemArray[0]!=="empty")
                    {
                        setWinmsg(`${itemArray[0]==="circle"?document.getElementsByClassName("name1")[0].value:document.getElementsByClassName("name2")[0].value} is the winner!!`)
                    }
                    else if(itemArray[2]=== itemArray[4] && itemArray[4]===itemArray[6]  && itemArray[2]!=="empty")
                    {
                        setWinmsg(`${itemArray[2]==="circle"?document.getElementsByClassName("name1")[0].value:document.getElementsByClassName("name2")[0].value} is the winner!!`)
                    }
    }
    const allNine=()=>{
        for(var i=0;i<9;i++)
        {
            if(itemArray[i]==="empty")
            {
                return false;
            }
        }
        return true;
    }
    const changeItem=itemnumber=>{
            if(!isCross){
                document.getElementById("p2").style.backgroundColor="gold";
                document.getElementById("p1").style.backgroundColor="black";
                document.getElementsByClassName("name2")[0].style.border="4px solid gold";
                document.getElementsByClassName("name1")[0].style.border="none"
            }
            else{
                document.getElementById("p1").style.backgroundColor="gold" ;
                document.getElementById("p2").style.backgroundColor="black";
                document.getElementsByClassName("name1")[0].style.border="4px solid gold";
                document.getElementsByClassName("name2")[0].style.border="none"
            }
            if(isCross && !winmsg)
            document.getElementById("block"+String(itemnumber)).style.backgroundColor="skyBlue";
            else if(!isCross && !winmsg)
            document.getElementById("block"+String(itemnumber)).style.backgroundColor="purple";
            
            if(winmsg){
                return toast(winmsg,{type:"success"})
            }

            if(itemArray[itemnumber]==="empty"){
                    itemArray[itemnumber]=isCross?"cross":"circle";
                    setIsCross(!isCross)
            }
            else{
                return toast("already filled",{type:"error"})
            }
            checkIsWinner();
            if(allNine()){
                reloadGame();
            }
    }

    return(

       <Container className="p-5">
            <h2 class="heading" style={{color:"white",fontSize:"4rem",textAlign:"center"}}>TIC<span style={{color:"gold"}}>-</span>TAC<span style={{color:"gold"}}>-</span>TOE</h2>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",margin:"2rem 0"}}>
                <div id="p1" style={{height:"2rem",width:"2rem",marginRight:"1rem",backgroundColor:"gold",borderRadius:"50%",border:"1px solid gold"}}></div>
                <input type="text" className="name1" placeholder="Player 1(CIRCLE)" style={{height:"2rem",outline:"none",border:"4px solid gold"}}></input> 
                <span style={{fontSize:"2rem",color:"gold",margin:"0 1rem"}}>Vs</span>
                <input type="text" className="name2" placeholder="Player 2(CROSS)" style={{height:"2rem",outline:"none"}}></input>
                <div id="p2"style={{height:"2rem",width:"2rem",marginLeft:"1rem",backgroundColor:"black",borderRadius:"50%",border:"1px solid gold"}}></div>
           </div>
           
           <ToastContainer position="bottom-center" />
           <Row>
               <Col md={6} className="offset-md-3"> {/*total 12 cols our col occupies 6 cols from 3rd col so it appears at center */}
               
               {
                   
               winmsg?(
               <div style={{marginTop:"-1rem",marginBottom:"3rem"}}>
                    
                   <h3 style={{color:"green",textAlign:"center"}}>{winmsg}</h3>
                    
               </div>):
               (<h1 className="text-center text-warning" style={{color:"green"}}></h1>)
                }
                   <div className="grid">
                       {itemArray.map((item,index)=>(
                           <Card id={"block"+String(index)} style={{backgroundColor:"gold"}} onClick={()=>{changeItem(index)}}>
                               <CardBody className="box">
                                   <Icon name={item}>
                                   </Icon>
                               </CardBody>
                           </Card>
                       ))}
                   </div>
               </Col>
           </Row>
            <h5 style={{textAlign:"center",marginTop:"1rem"}}>@Designed by NagAshishSV</h5>
       </Container>
    )
}

export default App