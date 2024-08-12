import { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  CloseButton,
  Box,
  Button,
  Text,
  Textarea,
  VStack,
  HStack,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { getReviewsByProductId, addReviewByProductId, putReview, deleteReview } from "../modules/fetch/index";
import {jwtDecode} from 'jwt-decode';

const ReviewsComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [alertData, setAlertData] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReview, setEditedReview] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const productId = "36";

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setCurrentUser(jwtDecode(token));
    }
  }, []);

  const handleCloseAlert = () => {
    setAlertData(null);
  };

  const fetchReviews = async () => {
    try {
      const fetchedReviews = await getReviewsByProductId(productId);
      const displayedReviews = fetchedReviews.slice(-5);
      setReviews(displayedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleSubmitReview = async () => {
    const token = window.localStorage.getItem('token');

    try {
      if (token) {
        const decodedToken = decodeToken(token);

        if (decodedToken) {
          const username = decodedToken.username;

          const addedReview = await addReviewByProductId(productId, newReview, token);
          setReviews([...reviews.slice(-5), { ...addedReview.review, username }]);
          setNewReview('');
          setAlertData({ type: 'success', message: 'comment added successfully!' });
        } else {
          console.error('Invalid token');
          setAlertData({
            type: 'error',
            message: 'Invalid token. Please log in again.',
          });
        }
      } else {
        console.error('No token available');
        setAlertData({
          type: 'error',
          message: 'Authentication token not found. Please log in.',
        });
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setAlertData({
        type: 'error',
        message: 'Failed to add comment. Please try again.',
      });
    }
  };

  const handleEditReview = async (reviewId, updatedReview) => {
    try {
      await putReview(productId, reviewId, updatedReview);
      const updatedReviews = reviews.map((review) =>
        review.id === reviewId ? { ...review, review: updatedReview } : review
      );
      setReviews(updatedReviews);
      setAlertData({
        type: "success",
        message: "Review updated successfully!",
      });
      setEditingReviewId(null);
      setNewReview("");
    } catch (error) {
      console.error("Error updating review:", error);
      setAlertData({
        type: "error",
        message: "Failed to update review. Please try again.",
      });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(productId, reviewId);
      const updatedReviews = reviews.filter((review) => review.id !== reviewId);
      setReviews(updatedReviews);
      setAlertData({
        type: "success",
        message: "Review deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      setAlertData({
        type: "error",
        message: "Failed to delete review. Please try again.",
      });
    }
  };

  return (
    <Box width="100%" padding={4} borderRadius="xl" style={{ overflowY: 'auto', maxHeight: '100%' }}>
      <VStack spacing={4} alignItems="stretch">
        <Heading as="h2" size="md" mb={4}>
          Saran & Layanan Warga
        </Heading>
        {alertData && (
          <Alert status={alertData.type} mb={4}>
            <AlertIcon />
            {alertData.message}
            <CloseButton onClick={handleCloseAlert} ml="auto" />
          </Alert>
        )}
        {reviews.map((reviewObj) => (
          <Box
            key={reviewObj.id}
            width="100%"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            p={4}
            position="relative"
          >
            <Text as="p" textAlign="left">
              <strong>{reviewObj.username}</strong>: {String(reviewObj.review)}
              <br />
              <small>Created at: {new Date(reviewObj.created_at).toLocaleString()}</small>
            </Text>
            {currentUser && currentUser.username === reviewObj.username && (
              <>
                {editingReviewId === reviewObj.id && (
                  <>
                    <Textarea
                      value={editedReview}
                      onChange={(e) => setEditedReview(e.target.value)}
                      placeholder="Edit your review..."
                      mt={2}
                    />
                    <HStack mt={2}>
                      <Button
                        color="black"
                        border="1px solid gray"
                        size="xs"
                        onClick={() => handleEditReview(reviewObj.id, editedReview)}
                      >
                        Save
                      </Button>
                      <Button
                        color="black"
                        border="1px solid gray"
                        size="xs"
                        onClick={() => {
                          setEditingReviewId(null);
                          setNewReview('');
                        }}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  </>
                )}
                {editingReviewId !== reviewObj.id && (
                  <HStack position="absolute" top="4px" right="4px">
                    <Button
                      color="black"
                      border="1px solid gray"
                      size="xs"
                      onClick={() => {
                        setEditingReviewId(reviewObj.id);
                        setEditedReview(reviewObj.review);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="black"
                      border="1px solid gray"
                      size="xs"
                      onClick={() => handleDeleteReview(reviewObj.id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                )}
              </>
            )}
            <Divider my="2px" />
          </Box>
        ))}
        <Box width="100%">
          <Textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review..."
          />
        </Box>
        <HStack>
          <Button
            color="black"
            border="1px solid gray"
            onClick={handleSubmitReview}
          >
            Submit 
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ReviewsComponent;
