import { instance } from "../axios/index";

async function registerUser(username, email, password, nik, alamat, no_telp) {
  try {
    const response = await instance.post("/register", {
      username,
      email,
      password,
      nik,
      alamat,
      no_telp
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function loginUser(email, password) {
  try {
    const response = await instance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllProduct() {
  try {
    const response = await instance.get("/produk");
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getProductById(id) {
  try {
    const response = await instance.get(`/produk/${id}`);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function createOrder(formData, token) {
  try {
    const response = await instance.post("/order", formData, {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getUserbyid(id) {
  try {
    const response = await instance.get(`/user/${id}`);
    console.log('Response data:', response.data); 
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function getOrdersByUserId(user_id, token) {
  try {
    const response = await instance.get(`/order/user/${user_id}`, {
      headers: {
        'x-auth-token': token,
      },
    });
    console.log(response.data); 
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function getReviewsByProductId(productId) {
  try {
    const response = await instance.get(`/produk/${productId}/reviews`);
    console.log('Response data:', response.data);

    const reviewsWithCreatedAt = response.data.map((review) => ({
      ...review,
      created_at: review.created_at,
    }));

    return reviewsWithCreatedAt;
  } catch (error) {
    console.error('Error fetching reviews:', error.response);
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function addReviewByProductId(productId, review, token) {
  try {
    const response = await instance.post(`/produk/${productId}/reviews`, { review },
      {
        headers: {
          'x-auth-token': token,
        },
      },
      console.log(token)
    );
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}
  
async function fetchReviews(productId) {
  try {
    const response = await instance.get(`/produk/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
}
  
async function putReview(productId, reviewId, updatedReview) {
  try {
    const response = await instance.put(`/produk/${productId}/reviews/${reviewId}`, {
      review: updatedReview,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
}
  
async function deleteReview(productId, reviewId) {
  try {
    const response = await instance.delete(`/produk/${productId}/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
}

// Tambahkan fungsi untuk Surket
async function createSurket(nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan,  token) {
  try {
    const response = await instance.post("/surket", {
     nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan, 
    }, { headers: {
      'x-auth-token': token,
    }});
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getSurketsByUserId(user_id, token) {
  try {
    const response = await instance.get(`/surket/user/${user_id}`, {
      headers: {
        'x-auth-token': token,
      },
    });
    console.log('Response from API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching surkets:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

async function getpesanByUserId(user_id, token) {
  try {
    const response = await instance.get(`/pesan/user/${user_id}`, {
      headers: {
        'x-auth-token': token,
      },
    });
    console.log('Response from API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching surkets:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}

async function getAllOrders(token) {
  try {
    const response = await instance.get('/orders', {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}



async function createpesan(user_id, pesan, file) {
  try {
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('pesan', pesan);
    if (file) {
      formData.append('file', file);
    }

    const response = await instance.post("/pesan", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllSurket(token) {
  try {
    const response = await instance.get('/surket', {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

async function getAllUser(token) {
  try {
    const response = await instance.get('/user', {
      headers: {
        'x-auth-token': token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}


function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export {
  getAllProduct,
  getProductById,
  loginUser,
  getUserbyid,
  getOrdersByUserId,
  registerUser,
  createOrder,
  getReviewsByProductId,
  addReviewByProductId,
  fetchReviews,
  putReview,
  deleteReview,
  createSurket, // Export fungsi Surket
  getSurketsByUserId,
  createpesan,
  getpesanByUserId, // Export fungsi Surket
  isAuthenticated,// Export fungsi untuk memeriksa autentikasi
   getAllOrders,
   getAllSurket,
   getAllUser
};
