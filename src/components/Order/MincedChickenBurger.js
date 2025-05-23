import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  Grid,
} from "@mui/material";

const MincedChickenBurger = ({ open, onClose, product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [variation, setVariation] = useState("");
  const [isMealAdded, setIsMealAdded] = useState(false);
  const [comment, setComment] = useState("");
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open && descriptionElementRef.current) {
      descriptionElementRef.current.focus();
    }
  }, [open]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSubmit = () => {
    const basePrice = product.price;
    const mealPrice = isMealAdded ? 2.0 : 0;
    const totalprice = basePrice + mealPrice;

    onAddToCart({
      id: product.id,
      name: product.name,
      price: totalprice,
      quantity,
      variation,
      comment: comment.trim(),
      isMealAdded,
    });

    onClose();
  };

  const variations = [
    "Pepsi Max",
    "Diet Pepsi",
    "Tango Orange",
    "Tango Apple",
    "Mirinda",
    "Strawberry",
    "7UP",
    "Rubicon Mango",
    "Water Bottle",
    "Fruit Shoot",
    "1.5 Pepsi",
    "1.5 7UP",
    "1.5 Tango Orange",
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      aria-labelledby="item-dialog-title"
      aria-describedby="item-dialog-description">
      <DialogTitle id="item-dialog-title">Add Item</DialogTitle>
      <DialogContent dividers ref={descriptionElementRef} tabIndex={-1}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography gutterBottom>£ {product.price.toFixed(2)}</Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={isMealAdded}
              onChange={(e) => setIsMealAdded(e.target.checked)}
              color="primary"
            />
          }
          label="Make it a Meal (+£2.00)"
        />

        {isMealAdded && (
          <Box mt={2}>
            <Typography variant="subtitle1">Choose a drink:</Typography>
            <Grid container spacing={1}>
              {variations.map((item) => (
                <Grid item xs={6} key={item}>
                  <Button
                    fullWidth
                    variant={variation === item ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => setVariation(item)}>
                    {item}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Box mt={2}>
          <TextField
            fullWidth
            label="Extra comment"
            multiline
            rows={3}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>

        <Box mt={3} display="flex" alignItems="center" justifyContent="center">
          <Button variant="outlined" onClick={decreaseQty}>
            -
          </Button>
          <Box mx={2}>
            <Typography>{quantity}</Typography>
          </Box>
          <Button variant="outlined" onClick={increaseQty}>
            +
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MincedChickenBurger;
