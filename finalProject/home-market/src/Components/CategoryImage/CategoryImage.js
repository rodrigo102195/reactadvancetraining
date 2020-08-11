import React, { useEffect } from "react";
import "./CategoryImage.scss";

const CategoryImage = ({ subCategories, title, onClickCategory, onClickSubcategory, id }) => {
  const subcategoryList = subCategories ? subCategories : [];
  const imageSrc = require(`../../assets/categories/cat_${id}.jpg`);

  useEffect(() => {
    document.getElementById(`cat_${id}`).style.backgroundImage = `url('${imageSrc}')`
  }, []);

  return (
    <div className="CategoryImage" id={"cat_"+id}>
      <span className="invisibleOnHover">{title}</span>
      {subcategoryList.map((subCategory) => (
        <span key={subCategory.id} className="visibleOnHover" onClick={() => onClickSubcategory(subCategory.id)}>
          {subCategory.name}
        </span>
      ))}
      <span className="visibleOnHover CategoryImage__todosText" onClick={() => onClickCategory(id)}>Todos</span>
    </div>
  );
};

export default CategoryImage;
