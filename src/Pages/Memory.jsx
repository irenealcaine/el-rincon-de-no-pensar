import { useState } from "react";
import Header from "../Components/Header";
import Card from '../Components/Card'

const Memory = () =>{
    const [items, setItems] = useState([
        { id: 1, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png', stat: "" },
        { id: 1, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png', stat: "" },
        { id: 2, img: 'https://i.pinimg.com/originals/aa/00/57/aa0057e6b512af2195427c6a785085f5.png', stat: "" },
        { id: 2, img: 'https://i.pinimg.com/originals/aa/00/57/aa0057e6b512af2195427c6a785085f5.png', stat: "" },
        { id: 3, img: 'https://img.freepik.com/iconos-gratis/marcador-posicion_318-922354.jpg', stat: "" },
        { id: 3, img: 'https://img.freepik.com/iconos-gratis/marcador-posicion_318-922354.jpg', stat: "" },
        { id: 4, img: 'https://static.vecteezy.com/system/resources/previews/001/188/470/non_2x/fire-icon-png.png', stat: "" },
        { id: 4, img: 'https://static.vecteezy.com/system/resources/previews/001/188/470/non_2x/fire-icon-png.png', stat: "" },
        { id: 5, img: 'https://logodownload.org/wp-content/uploads/2014/04/coca-cola-logo-1-1.png', stat: "" },
        { id: 5, img: 'https://logodownload.org/wp-content/uploads/2014/04/coca-cola-logo-1-1.png', stat: "" },
    ].sort(() => Math.random() - 0.5))

    const [prev, setPrev] = useState(-1)

    function check(current){
        if(items[current].id === items[prev].id){
            items[current].stat = "correct"
            items[prev].stat = "correct"
            setItems([...items])
            setPrev(-1)
        }else{
            items[current].stat = "wrong"
            items[prev].stat = "wrong"
            setItems([...items])
            setTimeout(() => {
                items[current].stat = ""
                items[prev].stat = ""
                setItems([...items])
                setPrev(-1)
            }, 1000)
        }
    }

    function handleClick(id){
        if(prev === -1){
            items[id].stat = "active"
            setItems([...items])
            setPrev(id)
        }else{
            check(id)
        }
    }



  return (
    <div className="bg-blue-100 min-h-screen">
      <Header title={"Memoria"} />
       <div className="flex flex-wrap gap-4 justify-center p-8">
            { items.map((item, index) => (
                <Card key={index} item={item} id={index} handleClick={handleClick} />
            )) }
        </div>
    </div>
  );
}

export default Memory;
