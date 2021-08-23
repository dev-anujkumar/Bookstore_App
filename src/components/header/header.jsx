import React, {useEffect, useState} from 'react';
import '../header/header.scss';
import bookStoreLogo from '../../assests/images/education.svg';
import cartLogo from '../../assests/images/supermarket.svg';
import searchLogo from '../../assests/images/ic_zoom_out_24px.svg';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from "react-router-dom"
import BookStoreService from "../../service/BookStoreService";

export default function Header(props) {


    const useForceUpdate = () => {
        const [count, setCount] = useState(0)
        const increment = () => setCount(prevCount => prevCount + 1)
        return [increment, count]
    }
    const [forceUpdate] = useForceUpdate()
    const onClickHandler = e => {
        forceUpdate()
    }
    useEffect(()=>{
        if(props.refresh){
            onClickHandler()
            props.stopRefresh()
        }

    })

    const cartSize=()=>{
        const cart=JSON.parse(localStorage.getItem("cart"))
        if(cart) {
            return cart.length
        }
    }

    let history=useHistory()
    function navigate(path) {
        history.push(`${path}`)
    }
    const [name,setName]=useState('')

    // function username() {
    //     new BookStoreService().getUser().then(responseDTO => {
    //         let responseData = responseDTO;
    //         console.log("Data received :\n" + responseData.data.name);
    //         setName(responseData.data.name)
    //         // this.setState({ userData: responseData.data });
    //     }).catch(errror => {
    //         console.log("Error while fetching user\nError : " + JSON.stringify(errror));
    //     })
    // }

    return (
        <div className='sidebar'>
           <header class='header-content'>
                <div class = 'logo-bookstore' onClick={()=>navigate("/homepage")} style={{cursor:'pointer'}}>
                    <img src={bookStoreLogo} alt ='bookStorelogo'/>
                    <span>Bookstore</span>
                </div>
                <div className='anchor'>
                    <img className='search-logo' src={searchLogo} alt ='searchlogo'/>
                    <input type='search' placeholder='Search...' className='search-bar'/>
                </div>
                <div className='cart-logo'onClick={()=>navigate("/page3")}>
                    <span>Cart</span>
                    <img src={cartLogo} alt='cartLogo' />
                    {
                        cartSize()>0 &&  <span className="cart-count">{cartSize()}</span>
                    }
                </div>
                <div className="username" onClick={
                    (e)=>{
                        e.preventDefault()
                        localStorage.removeItem('token')
                        navigate('/loginpage')
                    }
                }><Avatar src="/broken-image.jpg" /><span>{props.username}</span></div>
           </header>
        </div>
    )
}