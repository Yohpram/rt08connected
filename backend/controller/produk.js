const ProductModel = require('../models/produk');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    },
});

const upload = multer({ storage });

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await ProductModel.getProductById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'success', data: product });
    } catch (error) {
        console.error('Error getting product by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getProducts = (req, res) => {
    ProductModel.getProducts((err, data) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(200).json({ data });
    });
};

const addProduct = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const product = {
            nama: req.body.nama,
            
            harga: req.body.harga,
            keterangan: req.body.keterangan,
            image: req.file ? req.file.path : null,
        };

        ProductModel.addProduct(product, (err, data) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(201).json({ data });
        });
    });
};

module.exports = {
    getProducts,
    getProductById,
    addProduct
};
