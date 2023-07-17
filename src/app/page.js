"use client"
import Image from 'next/image'
import styles from './page.module.css'
import BlogItem from '@/components/BlogItem'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadingBar from 'react-top-loading-bar'
import FloatingBtn from '@/components/FloatingBtn'
import ScrollToTop from "react-scroll-to-top";
import loader from '../../public/loader2.gif'
const Home = () => {
  const [progress, setProgress] = useState(0)// For Top Loading Bar 
  const [postData, setPostData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  //const [btn, setButton] = useState(1) //for page Number wise pagination
  // const [count, setCount] = useState(0) //for page number wise pagination
  const PAGE_LIMIT = 6
  //const response = await fetch(`http://localhost:3000/api/blog?dt=${new Date().getTime()}`, { next: { revalidate: 1 } })

  /* useEffect(() => {
    fetchdata()
  }, [btn]) */ // btn for prev next page number pagination and page for InfiniteScroll

  useEffect(() => {
    setProgress(progress + 10)
    setTimeout(() => fetchdata(), 1000)

  }, [page])

  const fetchdata = async () => {
    setProgress(progress + 40)
    const response = await fetch(`http://localhost:3000/api/blog?page=${page}`, { next: { revalidate: 1 } })
    setProgress(progress + 70)
    const data = await response.json()
    setProgress(progress + 80)
    const blog_results = await data.api_data.results
    const counts = await data.api_data.count
    // console.log(blog_results)
    // setPostData(blog_results) //For PageNumber wise pagination eg: Next  , Previous .

    const res_data = [...postData].concat(blog_results) // For infinite scroll
    setProgress(progress + 90)
    setPostData(res_data)
    setProgress(progress + 100)
    if (postData.length + PAGE_LIMIT >= counts) {
      setHasMore(false)
    }
    // setCount(count)

  }

  /* const btnhandlerNxt = () => {

    if (PAGE_LIMIT * page < count) {
      console.log("PGLmt1", PAGE_LIMIT * page)
      setPage(prevpage => prevpage + 1)
      setButton(prevbtn => prevbtn + 1)

    }
    set
  }
  const btnhandlerPrv = () => {

    if (page - 1 > 0) {

      setPage(prevpage => prevpage - 1)
      setButton(prevbtn => prevbtn - 1)

    }


  } */

  return (<>
    <LoadingBar
      color='#f11946'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
    <InfiniteScroll
      dataLength={postData.length}
      next={() => setPage(page + 1)}
      hasMore={hasMore}
      /*  height={700} */ //height attribute should be given when PAGELIMIT value is less than window height 
      loader={<h1 style={{ textAlign: 'center', color: 'blue' }}>Loading..</h1>}

    /* loader={<div><iframe src="https://giphy.com/embed/WiIuC6fAOoXD2" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/awesome-circle-loading-WiIuC6fAOoXD2">via GIPHY</a></p></div>} */
    >
      {/* {!postData.length && <h1 style={{ textAlign: 'center' }}>Loading..</h1>} */}
      {!postData.length && <div style={{ textAlign: 'center', paddingTop: '20%' }}><Image src={loader}></Image></div>}
      <div className={styles.flexcontainer}>
        {postData.length > 0 && postData.map(blog => (

          <div className={styles.flexItem} key={blog.id}>
            <BlogItem blog={blog} />
          </div>
        ))
        }
      </div>

    </InfiniteScroll>

    {postData.length > 0 && <div><a href="/">View  Real Time latest</a></div>}
    {/*    <button onClick={btnhandlerPrv}>Prev  Page</button>
      <button onClick={btnhandlerNxt}>Next Page</button> */}
    {/* <div style={{ marginTop: "70vh" }} >
      <ScrollToTop smooth />
    </div> */}

    {<FloatingBtn />}
  </>
  )
}

export default Home;