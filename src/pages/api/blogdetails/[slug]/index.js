export default async function poduct(req, res) {
    const query = req.query;
    const { slug } = query;
    const response = await fetch(`http://127.0.0.1:8000/blog/${slug}`, { next: { revalidate: 1 } })
    const data = await response.json()
    res.status(200).json({ "api_data": data })



    // use productId to retrieve the product from your database
    // then send this data back to the client
}