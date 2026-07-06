import React from 'react';
import { Star } from 'lucide-react';

export const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  onlyInStock,
  setOnlyInStock,
  onReset
}) => {
  const categories = ["Running", "Training", "Trail Running", "Lifestyle", "Professional", "Walking"];
  const colors = [
    { name: "Blue", code: "#0B57FF" },
    { name: "Black", code: "#111111" },
    { name: "White", code: "#FFFFFF" },
    { name: "Red", code: "#FF3B30" },
    { name: "Green", code: "#00C853" },
    { name: "Orange", code: "#FF9500" },
    { name: "Grey", code: "#8E8E93" }
  ];
  const sizes = [6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="glass-panel p-4" style={{
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Filters</h5>
        <button 
          onClick={onReset}
          className="btn btn-link btn-sm text-primary text-decoration-none fw-semibold p-0"
        >
          Reset All
        </button>
      </div>

      {/* Category Section */}
      <div className="mb-4">
        <h6 className="fw-bold text-uppercase small tracking-wider mb-3">Category</h6>
        <div className="d-flex flex-column gap-2">
          {categories.map((cat) => (
            <label key={cat} className="d-flex align-items-center cursor-pointer small">
              <input
                type="radio"
                name="categoryFilter"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                className="flux-check-input me-2"
              />
              <span className={selectedCategory === cat ? "fw-bold text-primary" : "text-secondary"}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-3 opacity-10" />

      {/* Price Range Slider */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold text-uppercase small tracking-wider mb-0">Price Max</h6>
          <span className="fw-bold text-primary font-monospace">${priceRange}</span>
        </div>
        <input
          type="range"
          min="90"
          max="200"
          step="5"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-100 accent-primary"
          style={{
            height: '4px',
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: '10px',
            outline: 'none',
            cursor: 'pointer'
          }}
        />
        <div className="d-flex justify-content-between text-muted small mt-1 font-monospace">
          <span>$90</span>
          <span>$200</span>
        </div>
      </div>

      <hr className="my-3 opacity-10" />

      {/* Sizes Section */}
      <div className="mb-4">
        <h6 className="fw-bold text-uppercase small tracking-wider mb-3">Size (US)</h6>
        <div className="d-flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? null : size)}
              className="btn btn-sm d-flex align-items-center justify-content-center fw-semibold transition"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                border: selectedSize === size ? '2px solid var(--flux-primary)' : '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: selectedSize === size ? 'var(--flux-primary)' : 'transparent',
                color: selectedSize === size ? '#ffffff' : 'var(--flux-secondary)'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <hr className="my-3 opacity-10" />

      {/* Colors Section */}
      <div className="mb-4">
        <h6 className="fw-bold text-uppercase small tracking-wider mb-3">Color</h6>
        <div className="d-flex flex-wrap gap-2">
          {colors.map((color) => {
            const isSelected = selectedColor === color.name;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(isSelected ? null : color.name)}
                className="btn p-0 border-0 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: color.code,
                  border: isSelected ? '2px solid var(--flux-primary)' : '1px solid rgba(0, 0, 0, 0.1)',
                  outline: isSelected ? '2px solid #fff' : 'none',
                  outlineOffset: '-4px',
                  boxShadow: isSelected ? '0 0 8px var(--flux-primary)' : 'none'
                }}
                title={color.name}
              />
            );
          })}
        </div>
      </div>

      <hr className="my-3 opacity-10" />

      {/* Ratings Section */}
      <div className="mb-4">
        <h6 className="fw-bold text-uppercase small tracking-wider mb-3">Min Rating</h6>
        <div className="d-flex flex-column gap-2">
          {[5, 4.8, 4.6, 4.5].map((rating) => (
            <label key={rating} className="d-flex align-items-center cursor-pointer small">
              <input
                type="radio"
                name="ratingFilter"
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(rating)}
                className="flux-check-input me-2"
              />
              <span className="d-flex align-items-center gap-1">
                <span className={selectedRating === rating ? "fw-bold text-primary" : "text-secondary"}>{rating}+</span>
                <Star size={12} fill="var(--flux-warning)" color="var(--flux-warning)" />
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-3 opacity-10" />

      {/* Availability Section */}
      <div>
        <h6 className="fw-bold text-uppercase small tracking-wider mb-3">Availability</h6>
        <label className="d-flex align-items-center cursor-pointer small">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="flux-check-input me-2"
          />
          <span className={onlyInStock ? "fw-bold text-primary" : "text-secondary"}>In Stock Only</span>
        </label>
      </div>
    </div>
  );
};
