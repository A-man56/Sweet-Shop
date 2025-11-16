import { useState } from "react";
import { uploadImageToCloudinary } from "../services/upload";
import "./Forms.css";

function AddSweetForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Chocolate",
    price: "",
    unit: "piece",
    quantity: "",
    description: "",
    image: "",
  });

  const [filePreview, setFilePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file));
      setFormData({ ...formData, imageFile: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = formData.image;

    try {
      // Upload if file selected
      if (formData.imageFile) {
        setUploading(true);
        imageUrl = await uploadImageToCloudinary(formData.imageFile);
        setUploading(false);
      }

      await onAdd({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        image: imageUrl,
      });

      // Reset form
      setFormData({
        name: "",
        category: "Chocolate",
        price: "",
        unit: "piece",
        quantity: "",
        description: "",
        image: "",
      });

      setFilePreview(null);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    !formData.name ||
    !formData.price ||
    !formData.quantity ||
    loading ||
    uploading;

  return (
    <form className="sweet-form" onSubmit={handleSubmit}>
      <h3>Add New Sweet</h3>

      <input
        type="text"
        name="name"
        placeholder="Sweet Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="Chocolate">Chocolate</option>
        <option value="Candy">Candy</option>
        <option value="Gummies">Gummies</option>
        <option value="Lollipops">Lollipops</option>
        <option value="Cookies">Cookies</option>
        <option value="Pastries">Pastries</option>
        <option value="Cakes">Cakes</option>
        <option value="Cupcakes">Cupcakes</option>
        <option value="Ice Cream">Ice Cream</option>
        <option value="Snacks">Snacks</option>
        <option value="Traditional Sweets">Traditional Sweets</option>
      </select>

      <input
        type="number"
        name="price"
        placeholder="Price (₹)"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <select name="unit" value={formData.unit} onChange={handleChange}>
        <option value="piece">Per Piece</option>
        <option value="kg">Per Kg</option>
        <option value="g">Per Gram</option>
        <option value="dozen">Per Dozen</option>
        <option value="box">Per Box</option>
        <option value="packet">Per Packet</option>
      </select>

      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
      />

      {/* IMAGE UPLOAD */}
      <label className="file-label">Upload Image (JPG/PNG)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {filePreview && (
        <img src={filePreview} alt="preview" className="image-preview" />
      )}

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit" disabled={isDisabled}>
        {uploading
          ? "Uploading Image..."
          : loading
          ? "Adding..."
          : "Add Sweet"}
      </button>
    </form>
  );
}

export default AddSweetForm;
