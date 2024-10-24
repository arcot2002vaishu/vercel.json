let express = require('express');
let cors = require('cors'); // Import cors

let app = express();
app.use(cors());

let port = 3000;

// Corrected products array
let products = [
  { 
    id: 1,
    name: "Xiaomi iPhone 12",
    brand: "Xiaomi",
    price: 60000,
    ram: 6,
    rom: 256,
    rating: 4.5,
    os: "Android",
    camera: 108
  },
  { 
    id: 2,
    name: "Oppo Mi 10",
    brand: "Xiaomi",
    price: 30000,
    ram: 6,
    rom: 512,
    rating: 4,
    os: "iOS",
    camera: 64
  },
  { 
    id: 3,
    name: "Samsung Mi 10",
    brand: "Oppo",
    price: 20000,
    ram: 4,
    rom: 256,
    rating: 4,
    os: "Android",
    camera: 24
  },
  { 
    id: 4,
    name: "Apple Find X2",
    brand: "Samsung",
    price: 60000,
    ram: 8,
    rom: 512,
    rating: 4.5,
    os: "iOS",
    camera: 48
  },
  {
    id: 5,
    name: "Oppo Mi 11",
    brand: "Xiaomi",
    price: 30000,
    ram: 12,
    rom: 128,
    rating: 4,
    os: "iOS",
    camera: 24,
  },
  {
    id: 6,
    name: "OnePlus Find X3",
    brand: "Apple",
    price: 30000,
    ram: 12,
    rom: 64,
    rating: 4,
    os: "Android",
    camera: 64,
  },
  {
    id: 7,
    name: "Apple Pixel 5",
    brand: "Apple",
    price: 70000,
    ram: 4,
    rom: 512,
    rating: 4.5,
    os: "iOS",
    camera: 24,
  },
  {
    id: 8,
    name: "Google Mi 10",
    brand: "Oppo",
    price: 30000,
    ram: 8,
    rom: 64,
    rating: 5,
    os: "iOS",
    camera: 108,
  },
  {
    id: 9,
    name: "Oppo Mi 11",
    brand: "Samsung",
    price: 30000,
    ram: 4,
    rom: 64,
    rating: 4,
    os: "Android",
    camera: 24,
  },
  {
    id: 10,
    name: "Xiaomi Mi 10",
    brand: "Oppo",
    price: 60000,
    ram: 16,
    rom: 512,
    rating: 4.5,
    os: "Android",
    camera: 12,
  },
];


app.get("/products/sort/popularity", (req, res) => {
  let sortedProducts = products.sort((a, b) => a.price - b.price);
  res.json({ products: sortedProducts });
});

app.get('/products/sort/price-high-to-low', (req, res) => {
  let sortedProducts = products.sort((a, b) => b.price - a.price);
  res.json({ products: sortedProducts });
});

app.get('/products/sort/price-low-to-high', (req, res) => {
  let sortedProducts = products.sort((a, b) => a.price - b.price);
  res.json({ products: sortedProducts });
});

function filterByRam(ram) {
  return products.filter(product => product.ram === parseInt(ram));
}

app.get('/products/filter/ram', (req, res) => {
  const { ram } = req.query; 

  if (!ram) {
    return res.status(400).json({ error: "RAM parameter is required" });
  }

  const filteredProducts = filterByRam(ram);
  
  res.json({ products: filteredProducts });
});


function filterByRom(rom) {
  return products.filter(product => product.rom === parseInt(rom));
}

app.get('/products/filter/rom', (req, res) => {
  const { rom } = req.query; 

  if (!rom) {
    return res.status(400).json({ error: "ROM parameter is required" });
  }
  const filteredProducts = filterByRom(rom);
  res.json({ products: filteredProducts });
});

function filterByBrand(brand) {
  return products.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
}

app.get('/products/filter/brand', (req, res) => {
  const { brand } = req.query;

  if (!brand) {
    return res.status(400).json({ error: "Brand parameter is required" });
  }
  const filteredProducts = filterByBrand(brand);
  res.json({ products: filteredProducts });
});

function filterByOs(os) {
  return products.filter(product => product.os.toLowerCase() === os.toLowerCase());
}

app.get('/products/filter/os', (req, res) => {
  const { os } = req.query; 

  if (!os) {
    return res.status(400).json({ error: "OS parameter is required" });
  }
  const filteredProducts = filterByOs(os);
  res.json({ products: filteredProducts });
});

function filterByPrice(maxPrice) {
  return products.filter(product => product.price <= maxPrice);
}


app.get('/products/filter/price', (req, res) => {
  const { price } = req.query;

  if (!price) {
    return res.status(400).json({ error: "Price parameter is required" });
  }

  const maxPrice = parseFloat(price);
  if (isNaN(maxPrice)) {
    return res.status(400).json({ error: "Price must be a valid number" });
  }
  const filteredProducts = filterByPrice(maxPrice);
  res.json({ products: filteredProducts });
});

app.get('/products', (req, res) => {
  res.json({ products });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
