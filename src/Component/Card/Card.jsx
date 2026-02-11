import "./Card.css"


export const Card=()=>{


    return(
        <div className="card">
            <img src={image} alt=""/>
            <div className="">
                <p>{name}</p>
                <p>{price}</p>
            </div>
        </div>
    )
}