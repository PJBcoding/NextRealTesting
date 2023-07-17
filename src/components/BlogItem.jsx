import styles from './BlogItem.module.css'
import Link from 'next/link'

const BlogItem=(props)=>{
return(
<div className={styles.card}>
<div> <img className={styles.imgconfig} src={props.blog.blog_img} alt="BlogImage" /></div>
    <div >Title :{props.blog.title}</div>
    <div>Slug : {props.blog.slug}</div>
    <div>Published on :{props.blog.blog_date}</div>
    <Link className={styles.bloglink} href={`../blog/${props.blog.slug}`}>  <p class={styles['btn-showmore']}>Read Full </p></Link>
</div>
    
   
)

}
export default BlogItem