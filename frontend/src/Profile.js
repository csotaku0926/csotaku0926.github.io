import React from "react";
import avator from "./img/avator.jpg"
import "./profile.css"

const Profile = () => {
    
    return (

        <div className="profile">
            
            <div>
                <img 
                    src={avator} 
                    alt="my selfie" 
                    width={'200px'} 
                />
                <p>國立台灣大學 電機資安所</p>
                <p>劉沛凡</p>
            </div>
            <div>
                <h2>Welcome!</h2>
                <p>我是台大電機資安碩一生</p>
                <p>這是我的期中專案</p>
                <p>左邊是我的頭貼</p>
            </div>
            
        </div>
    )
}

export default Profile;