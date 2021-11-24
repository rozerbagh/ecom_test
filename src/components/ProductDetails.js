import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProductDetails = (props) => {
    const [loading, setLoading] = useState(true)
    const [details, setDetails] = useState({})
    const { id } = useParams();
    useEffect(() => {
        let url = `https://fakestoreapi.com/products/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setDetails(json)
                // setCategoryName(category)
                setLoading(false);
            })
    }, [])
    return loading ? "Loading..." : <Grid container spacing={3}>
        <Grid item xs={3}>
            <img src={details.image} width="150px" />
        </Grid>
        <Grid item xs={9}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">{details.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">{details.description}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">{details.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">Rs {details.price}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => props.addToCart(details)}>Add to cart</Button>
                </Grid>
            </Grid>
        </Grid>

    </Grid>
}

export default ProductDetails