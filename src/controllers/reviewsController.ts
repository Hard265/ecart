import { Response } from "express";
import { AuthenticatedRequest } from "../@types";
import { Product } from "../models/Product";
import { Review } from "../models/Review";

export const getReviews = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  // TODO: get reviews for a product
  const product = await Product.findByPk(id);
  if (product) {
    const reviews = (await product?.getReviews()).map((review) =>
      review.toJSON()
    );

    res.json(reviews);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const createReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    res.status(400).json({ message: "Rating and comment are required" });
  } else {
    const product = await Product.findByPk(id);
    if (product) {
      product.createReviews({
        rating: parseInt(rating),
        comment,
        userId: req.user.id,
      });
      res.status(201).json({ message: "Review created successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }
};

export const deleteReview = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { id, reviewId } = req.params;

  const product = await Product.findByPk(id);
  const review = await Review.findByPk(reviewId);
  if (review) {
    if (review.userId === req.user.id && review.productId === product?.id) {
      await review.destroy();
      res.status(200).json({ message: "Review deleted successfully" });
    }
  } else {
    res.status(404).json({ message: "Review not found" });
  }
};
