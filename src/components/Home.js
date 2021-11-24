import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';
import ProductCard from "./Cards/ProductCard";

const Category = (props) => {
    const { staticContext, categoryName, handleClick, ...rest } = props
    return <Grid item xs={12} sm={3} {...rest} onClick={handleClick}>
        <div className="category-card"><Typography variant="h6">{categoryName}</Typography></div>
    </Grid>
}
const Home = (props) => {
    const { staticContext, handleAddToCart, ...rest } = props;
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState(null);
    useEffect(() => {
        setFetching(true)
        setLoading(true);
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(json => {
                // console.log(json)
                setCategories(json);
            })
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                // console.log(json)
                setFetching(false);
                setLoading(false);
                setProducts(json);

                // In this way also the categories can be done without hitting much server request

                // let cate = [];
                // json.forEach(ele => cate.push(ele.category))
                // console.log(cate);
                // let uniqueArray = [...new Set(cate)];
                // cate = [...new Set(cate)]
                // setCategories(cate);
            })
    }, []);

    const handleCategoryFetch = (e, category) => {
        setFetching(true);
        let url = `https://fakestoreapi.com/products/category/${category}`;
        if (category === 'all') {
            url = 'https://fakestoreapi.com/products';
        }
        fetch(url)
            .then(res => res.json())
            .then(json => {
                // console.log(json)
                setProducts(json)
                setCategoryName(category)
                setFetching(false);
            })
    }

    return (
        <Grid container spacing={3} {...rest}>
            {loading ? <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
                <Typography variant="h6">Loading...</Typography>
            </Grid> : <>
                <Grid key="ahsgdfhas" item xs={12} onClick={(e) => handleCategoryFetch(e, 'all')}>
                    <div className="category-card">
                        <Typography variant="h6">All</Typography>
                    </div>
                </Grid>
                {categories.map((category, index) => <Category categoryName={category}
                    key={`category-card-${index}`}
                    {...props}
                    handleClick={(e) => handleCategoryFetch(e, category)}
                />)}
                <Grid item xs={12}>
                    <Typography variant="h5">{categoryName === null || categoryName === '' ? ' All ' : categoryName} Products</Typography>
                </Grid>
                {fetching ? <Grid item xs={12} alignItems="center" justifyContent="center">
                    <CircularProgress />
                    <Typography variant="h6">Fetching...</Typography>
                </Grid> : products.map((ele, index) => <Grid item xs={12} sm={6} md={3}>
                    <ProductCard
                        {...rest}
                        key={`product-card-${ele.id}-${index}-${new Date().getTime()}`}
                        title={ele.title}
                        description={ele.description}
                        category={ele.category}
                        id={ele.id}
                        imagesrc={ele.image}
                        price={ele.price}
                        rating={ele.rating}
                        addToCart={() => handleAddToCart(ele)}
                    />
                </Grid>)}
            </>}
        </Grid>
    )
}

export default Home