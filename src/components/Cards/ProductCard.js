import * as React from 'react';
import { Link } from 'react-router-dom';
import { RatingView } from 'react-simple-star-rating'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';

// category: "men's clothing"
// description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
// id: 1
// image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
// price: 109.95
// rating: { rate: 3.9, count: 120 }
// title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
export default function ProductCard(props) {
    const {
        staticContext,
        itemDetails,
        addToCart,
        title,
        description,
        category,
        id,
        imagesrc,
        price,
        rating,
        ...rest } = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }} {...rest} variant="outlined">
            <CardMedia
                component="img"
                height="200"
                image={imagesrc}
                alt={title}
            />
            <CardContent>
                <div className="card-category-label">
                    <Avatar sx={{ bgcolor: green[500] }} variant="square">
                        C
                    </Avatar>
                    <Typography variant="body1">{category}</Typography>
                </div>

                <Typography variant="h6">{title}</Typography>
                <Typography variant="h6">{price}</Typography>
                {/* <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography> */}
                <RatingView ratingValue={rating.rate} />
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="outlined" size="small" onClick={() => addToCart(itemDetails)}>Add to Cart</Button>
                <Link to={`/product_details/${id}`}>
                    <Button size="small">Get Details</Button>
                </Link>
            </CardActions>
        </Card>
    );
}
