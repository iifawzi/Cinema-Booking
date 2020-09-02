const userTokenPayLoad = (phone_number,user_id,role)=>{
    return {
        phone_number,
        user_id,
        role,
    }
}

const adminTokenPayLoad = (username,admin_id,role)=>{
    return {
        username,
        admin_id,
        role,
    }
}

const cinemaTokenPayLoad = (username,cinema_id,account_id,name_ar,name_en,role)=>{
    return {
        username,
        cinema_id,
        account_id,
        name_ar,
        name_en,
        role,
    }
}


module.exports = {
    userTokenPayLoad,
    adminTokenPayLoad,
    cinemaTokenPayLoad
}