import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const Cart = (props) => {
    const { staticContext, cartItems, removeFromCart, ...rest } = props;
    return cartItems.length > 0 ? cartItems.map((details, index) => <Grid key={details.id} container spacing={3}>
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
                    <Button variant="contained" onClick={() => removeFromCart(details)}>Remove</Button>
                </Grid>
            </Grid>
        </Grid>

    </Grid>) : <Grid container spacing={3}>
        <Grid item xs={12}>
            <Typography variant="h6">Cart is empty</Typography>
        </Grid>

    </Grid>
}

export default Cart