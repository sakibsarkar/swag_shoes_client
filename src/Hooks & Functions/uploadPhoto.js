import axios from "axios";

export const uploadPhoto = async (photo) => {
    const form = new FormData()
    form.append("image", photo)
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}
    `, form)

    return data

}