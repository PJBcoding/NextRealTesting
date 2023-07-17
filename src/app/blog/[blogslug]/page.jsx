'use client'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'
import FloatingBtn from '@/components/FloatingBtn'
import ScrollToTop from "react-scroll-to-top";
import loader from '../../../../public/loadimg2.gif'
import Image from 'next/image'
const BlogDetail=({params})=>{

   const [data_value,setData] =useState([])
   const [progress, setProgress] = useState(0)

   useEffect(() => {
    setProgress(progress + 10)
    setTimeout(() => fetchdata(), 1000)
   
  }, [])
   const fetchdata=async()=>{

    setProgress(progress + 30)
    const response = await fetch(`http://localhost:3000/api/blogdetails/${params.blogslug}?dt=${new Date().getTime()}`, { next: { revalidate: 1 } })
    setProgress(progress + 50)
    const data = await response.json()
    setProgress(progress + 70)
    console.log(data)
    const data_set= await data.api_data
    setData(data_set)
    setProgress(progress +100)
    console.log("New render..")

}

return(<>
    <LoadingBar
      color='#2db8ab'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      shadow={true}
       height={1.7}
    />
    <div style={{display:'flex',flexDirection:'column'}}>
<h1>This is blog details :{params.blogslug}</h1>
{data_value.blog_img?
<img style={{width:170}}src={data_value.blog_img} alt="img" />:<Image width={100}src={loader}></Image>

}

<div><p><strong>Title </strong>:&emsp;{data_value.title?data_value.title:'Loading...'}</p></div>
<div style={{display:'flex',alignItems:'center'}}><strong>Date </strong>:&emsp;{data_value.blog_date?data_value.blog_date:<Image style={{transform:'scale(1.7)'}} height={40} width={70} src={loader.src}></Image>}</div>
<div style={{display:'flex',alignItems:'center'}}><strong> Description</strong>:&emsp;{data_value.description_details?data_value.description_details:<Image style={{transform:'scale(1.7)'}} height={40} width={70} src={loader.src}></Image> }</div>

<div><strong><Link href="/">GO BACK</Link></strong></div>
</div>
{ <FloatingBtn />}
</>

    )

}

export default BlogDetail;