
export default async function handler(req, res) {
    const query = req.query
    const page = query.page
    console.log(page)
    //console.log(query, req.method, req.body)
    // const response = await fetch(`http://127.0.0.1:8000?dt=${new Date().getTime()}`, { next: { revalidate: 1 } })
    const response = await fetch(`http://127.0.0.1:8000?page=${page}`, { next: { revalidate: 1 } })
    const blog_data = await response.json()
    res.status(200).json({ "api_data": blog_data })

}

/* import { useEffect } from "react"

export default async function handler(request, res) {
{new Date().getTime()}
    const featured_blog = [

        { "id": "frbl1", "heading": "This is the first blog ", "desc": "This is the description of the 1st first blog " },
        { "id": "frblg2", "heading": "This is the second blog", "desc": "This is the description of the 2 second blog" },
        { "id": "frblg3", "heading": "This is the third blog", "desc": "This is the description of the 3 third blog" },
        { "id": "frblg4", "heading": "This is the fourth blog", "desc": "This is the description of the 4 fourth blog" },
        { "id": "frblg5", "heading": "This is the fifth blog", "desc": "This is the description of the 5 fifth blog" },
        { "id": "frblg6", "heading": "This is the sixth blog", "desc": "This is the description of the 6 sixth blog" },
        { "id": "frblg7", "heading": "This is the seventh blog", "desc": "This is the description of the 7 seventh blog" },
        { "id": "frblg8", "heading": "This is the eight blog", "desc": "This is the description of the 8 eight blog" },
        { "id": "frblg97", "heading": "This is the ninth blog", "desc": "This is the description of the 9 night blog" }


    ]


    console.log("111111111111111111")
    //return new Response('Hello, Next.js!')
    res.status(200).json({ "data": featured_blog })
    //res.status(200).json({ "message": "Hi Hello" })
    console.log("22222222222222")
} */